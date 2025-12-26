'use client';

import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { MOCK_STAFF_USERS, authenticateStaff } from '@/src/lib/mockData';
import { StaffUser } from '../types';
import { useRouter } from 'next/navigation';

export interface StaffLoginProps {
    onLogin: (user: Omit<StaffUser, 'password'>) => void;
}
export default function StaffLogin({ onLogin }: StaffLoginProps) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const user = authenticateStaff(email, password);

        if (user) {
            onLogin(user);
        } else {
            setError('Invalid email or password. Please try again.');
        }
        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary_blue mb-2">Staff Login</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="staff@hospital.com"
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="Enter your password"
                                    disabled={isLoading}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !email || !password}
                            className="w-full bg-[#1a59c2] transition hover:bg-[#164aa0] text-white py-3 px-6 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    {/* demo credential  */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-3">Demo Credentials:</p>
                        <div className="space-y-2 text-xs">
                            {MOCK_STAFF_USERS.map((user, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-600">Email: {user.email}</p>
                                    <p className="text-gray-600">Password: {user.password}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => router.push('/')}
                    className="mt-6 w-full text-center text-gray-600 hover:text-gray-800 transition"
                >
                    ← Back to Home
                </button>
            </div>
        </div>
    );
}