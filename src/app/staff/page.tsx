'use client';

import { useState, useEffect } from 'react';
import { useSocket } from '@/src/hooks/useSocket';
import StaffLogin from '@/src/components/StaffLogin';
import type { Session, StaffUser } from '@/src/types';
import { AlertCircle, CheckCircle, Clock, LogOut } from 'lucide-react';
import StatusIndicators from '@/src/components/StatusIndicators';
import PatientList from '@/src/components/PatientList';
import PatientDetail from '@/src/components/PatientDetail';

export default function StaffPage() {
    const { sessions, deleteSession } = useSocket();
    const [staffUser, setStaffUser] = useState<Omit<StaffUser, 'password'> | null>(null);
    const [selectedPatient, setSelectedPatient] = useState<Session | null>(null);

    useEffect(() => {
        const savedStaffUser = localStorage.getItem('staffUser');
        if (savedStaffUser) {
            try {
                setStaffUser(JSON.parse(savedStaffUser));
            } catch (error) {
                localStorage.removeItem('staffUser');
            }
        }
    }, []);

    useEffect(() => {
        handleSelectPatient(selectedPatient?.id ?? '');
    }, [sessions])

    const handleLogin = (user: Omit<StaffUser, 'password'>) => {
        setStaffUser(user);
        localStorage.setItem('staffUser', JSON.stringify(user));
    };

    const handleLogout = () => {
        setStaffUser(null);
        localStorage.removeItem('staffUser');
    };

    const handleSelectPatient = (id: string) => {
        const sessionList = Object.values(sessions);
        setSelectedPatient(sessionList.find(f => f.id == id) ?? null);
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'filling': return <Clock className="w-4 h-4" />;
            case 'inactive': return <AlertCircle className="w-4 h-4" />;
            case 'submitted': return <CheckCircle className="w-4 h-4" />;
            default: return null;
        }
    };
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'filling': return 'bg-blue-100 text-blue-700 border-blue-300';
            case 'inactive': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'submitted': return 'bg-green-100 text-green-700 border-green-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    if (!staffUser) {
        return <StaffLogin onLogin={handleLogin} />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 ">
            <div className="flex justity-between items-center w-full">
                <div className="w-full">
                    <h4 className="text-2xl font-bold text-primary_blue">Staff Dashboard</h4>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>

            <StatusIndicators patientList={Object.values(sessions)} />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <PatientList
                    patientList={Object.values(sessions)}
                    deleteSession={deleteSession}
                    handleSelectPatient={handleSelectPatient}
                    selectedPatientId={selectedPatient?.id}
                    getStatusIcon={getStatusIcon}
                    getStatusColor={getStatusColor}
                />
                <PatientDetail
                    session={selectedPatient}
                    getStatusIcon={getStatusIcon}
                    getStatusColor={getStatusColor}
                />
            </div>
        </div>
    );
}