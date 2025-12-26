'use client';

import { useSocket } from '@/src/hooks/useSocket';
import PatientForm from '@/src/components/PatientForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PatientPage() {
    const { updateSession, createSession, isConnected, deletedSession } = useSocket();
    const [sessionId, setSessionId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // only proceed if the socket is ready
        if (!isConnected) return;
        const newId = createSession();
        setSessionId(newId);
        sessionStorage.setItem("sessionId", newId);
    }, [isConnected, createSession]);

    useEffect(() => {
        const currentId = sessionStorage.getItem("sessionId");

        //  redirect if the deleted ID matches our ACTIVE session when staff delete session
        if (currentId && deletedSession === currentId) {
            sessionStorage.removeItem("sessionId");
            router.push('/');
        }
    }, [deletedSession, router])

    if (!sessionId) return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">Loading...</div>
    );

    return <PatientForm sessionId={sessionId} onUpdate={updateSession} />;
}