import { Session } from '@/src/types';
import { Server as NetServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

export const config = {
    api: {
        bodyParser: false,
    },
};

const sessions: Record<string, Session> = {};

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {

    const httpServer = res.socket as any;
    if (httpServer.server?.io) {
        console.log('Socket already running');
        res.end();
        return;
    }

    console.log('Initializing Socket.io server...');

    const io = new SocketIOServer(httpServer.server, {
        path: '/api/socket',
        addTrailingSlash: false,
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    // define events
    io.on('connection', (socket) => {
        console.log('Connected:', socket.id);
        socket.emit('all-sessions', sessions);

        socket.on('create-session', (session) => {
            sessions[session.id] = { ...session, socketId: socket.id };
            io.emit('session-updated', sessions[session.id]);
        });

        socket.on('update-session', (data) => {
            sessions[data.id] = data;
            io.emit('session-updated', data);
        });

        socket.on('delete-session', (sessionId) => {
            delete sessions[sessionId];
            io.emit('session-deleted', sessionId);
        });

        socket.on('disconnect', () => {
            const sessionEntry = Object.entries(sessions).find(
                ([_, session]) => session.socketId === socket.id
            );

            if (sessionEntry) {
                const [sessionId, sessionData] = sessionEntry;

                // Only remove if the status is not submitted
                if (sessionData.status !== 'submitted') {
                    delete sessions[sessionId];
                    io.emit('session-deleted', sessionId);
                } else {
                    console.log(`Keeping submitted session: ${sessionId}`);
                }
            }
        });
    });

    // 4. Attach to server
    httpServer.server.io = io;
    res.end();
};

export default SocketHandler;