import type { StaffUser } from '@/src/types';

export const MOCK_STAFF_USERS: StaffUser[] = [
    {
        email: 'admin@hospital.com',
        password: 'admin123',
    }
];

export function authenticateStaff(
    email: string,
    password: string
): Omit<StaffUser, 'password'> | null {
    const user = MOCK_STAFF_USERS.find(
        u => u.email === email && u.password === password
    );

    if (!user) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}