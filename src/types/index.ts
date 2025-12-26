export interface PatientData {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    phone: string;
    email: string;
    nationality: string;
    religion?: string;
    address: string;
    preferredLanguage: string;
    emergencyContactName?: string;
    emergencyContactRelationship?: string;
}

export type SessionStatus = 'filling' | 'submitted' | 'inactive';

export interface Session {
    id: string;
    status: SessionStatus;
    data: PatientData;
    createdAt: number;
    lastUpdate: number;
    socketId: string | undefined;
}


export interface StaffUser {
    email: string;
    password: string;
}