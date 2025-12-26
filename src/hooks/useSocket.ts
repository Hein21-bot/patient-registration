import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { PatientData, Session } from '../types';

export function useSocket() {
    const [isConnected, setIsConnected] = useState(false);
    const [sessions, setSessions] = useState<Record<string, Session>>({});
    const [deletedSession, setDeletedSession] = useState<string | null>(null);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const initSocket = async () => {
            await fetch('/api/socket');

            if (socketRef.current) return;

            const socket = io({
                path: '/api/socket',
                transports: ['websocket', 'polling'],
            });

            socket.on('connect', () => {
                console.log('Socket connected');
                setIsConnected(true);
                socket?.emit('get-all-sessions');
            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected', socket.id);
                setIsConnected(false);
            });

            socket.on('session-updated', (session: Session) => {
                setSessions(prev => ({
                    ...prev,
                    [session.id]: session
                }));
            });

            socket.on('all-sessions', (allSessions: Record<string, Session>) => {
                setSessions(allSessions);
            });

            socket.on('session-deleted', (sessionId: string) => {
                setSessions(prev => {
                    const copy = { ...prev };
                    delete copy[sessionId];
                    return copy;
                });
            });

            socket.on('session-deleted', (sessionId: string) => {
                setDeletedSession(sessionId);
            });

            socketRef.current = socket;
        };

        initSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, []);

    const createSession = useCallback((): string => {
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const newSession: Session = {
            id: sessionId,
            data: {
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                gender: '',
                phone: '',
                email: '',
                address: '',
                preferredLanguage: '',
                nationality: '',
                middleName: '',
                emergencyContactName: '',
                emergencyContactRelationship: '',
                religion: '',
            },
            socketId: socketRef.current?.id,
            status: 'filling',
            lastUpdate: Date.now(),
            createdAt: Date.now()
        };

        socketRef.current?.emit('create-session', newSession);
        return sessionId;
    }, []);

    const updateSession = useCallback((sessionId: string, formData: Partial<PatientData>, status?: 'filling' | 'inactive' | 'submitted') => {
        const session = sessions[sessionId];
        if (!session) return;
        const merged = { ...session.data, ...formData };

        const updatedSession: Session = {
            ...session,
            data: merged,
            status: status ?? session.status,
            lastUpdate: Date.now()
        };

        socketRef.current?.emit('update-session', updatedSession);
    }, [sessions]);

    const deleteSession = useCallback((sessionId: string) => {
        socketRef.current?.emit('delete-session', sessionId);
    }, []);

    return {
        sessions,
        isConnected,
        createSession,
        updateSession,
        deleteSession,
        deletedSession,
    };
}