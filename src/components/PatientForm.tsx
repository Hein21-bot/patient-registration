'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import type { PatientData } from '@/src/types';
import { useRouter } from 'next/navigation';

interface PatientFormProps {
    sessionId: string;
    onUpdate: (id: string, data: Partial<PatientData>, status?: 'filling' | 'inactive' | 'submitted') => void;
}

export default function PatientForm({ sessionId, onUpdate }: PatientFormProps) {
    const [formData, setFormData] = useState<PatientData>({
        firstName: '',
        lastName: '',
        middleName: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        phone: '',
        address: '',
        preferredLanguage: '',
        nationality: '',
        emergencyContactName: '',
        emergencyContactRelationship: '',
        religion: ''
    });
    const [status, setStatus] = useState<'filling' | 'inactive' | 'submitted'>('filling');
    const [lastActivity, setLastActivity] = useState(Date.now());
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter();

    // Track inactivity
    useEffect(() => {
        if (status === 'submitted') return;

        const inactivityTimer = setTimeout(() => {
            setStatus('inactive');
            onUpdate(sessionId, formData, 'inactive');
        }, 30000); // 30 seconds

        return () => clearTimeout(inactivityTimer);
    }, [lastActivity, sessionId, formData, onUpdate, status]);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string) => {
        return /^\+?[\d\s-]{10,}$/.test(phone);
    };

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updated = { ...formData, [name]: value };
        setFormData(updated);

        setLastActivity(Date.now());

        onUpdate(sessionId, { [name]: value }, 'filling');

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }, [sessionId, formData, onUpdate, errors]);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender.trim()) newErrors.gender = 'Gender is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Invalid phone format';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.preferredLanguage.trim()) newErrors.preferredLanguage = 'Preferred language is required';
        if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setStatus('submitted');
        onUpdate(sessionId, formData, 'submitted');
    };

    if (status == 'submitted') {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="bg-white rounded-2xl shadow-lg shadow-primary_blue-200 p-5 max-w-md w-full text-center mb-20">
                    <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Registration Submitted!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Your information has been successfully submitted.
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full max-w-64 rounded-full bg-[#1a59c2]
            py-3 text-center text-white
            transition hover:bg-[#164aa0]"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl hadow-primary_blue-200 overflow-hidden">
                <div className="bg-blue-100 p-6 flex justify-between items-center">
                    <h4 className="text-xl md:text-2xl font-bold text-primary_blue">Patient Registration Form</h4>
                    <div className="text-gray-600 flex items-center cursor-pointer hover:text-gray-900" onClick={() => router.push('/')}>
                        ← <span className="hidden md:inline">Back</span>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormInput
                            label="First Name *"
                            value={formData.firstName}
                            type="text"
                            name="firstName"
                            placeholder="John"
                            onChange={handleChange}
                            isError={errors.firstName}
                        />
                        <FormInput
                            label="Middle Name"
                            value={formData.middleName || ''}
                            type="text"
                            name="middleName"
                            placeholder="Michael"
                            onChange={handleChange}
                            isError={''}
                        />
                        <FormInput
                            label="Last Name *"
                            value={formData.lastName}
                            type="text"
                            name="lastName"
                            placeholder="Doe"
                            onChange={handleChange}
                            isError={errors.lastName}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Date of Birth *"
                            value={formData.dateOfBirth}
                            type="date"
                            name="dateOfBirth"
                            placeholder=""
                            onChange={handleChange}
                            isError={errors.dateOfBirth}
                        />
                        <FormInput
                            label="Gender *"
                            value={formData.gender}
                            type="select"
                            name="gender"
                            placeholder=""
                            onChange={handleChange}
                            isError={errors.gender}
                            options={["Male", "Female", "Other", "Prefer not to say"]}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Phone Number *"
                            value={formData.phone}
                            type="tel"
                            name="phone"
                            placeholder="+66 234 567 8900"
                            onChange={handleChange}
                            isError={errors.phone}
                        />
                        <FormInput
                            label="Email *"
                            value={formData.email}
                            type="email"
                            name="email"
                            placeholder="john.doe@example.com"
                            onChange={handleChange}
                            isError={errors.email}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Nationality *"
                            value={formData.nationality}
                            type="text"
                            name="nationality"
                            placeholder="Thai"
                            onChange={handleChange}
                            isError={errors.nationality}
                        />
                        <FormInput
                            label="Religion"
                            value={formData.religion || ''}
                            type="text"
                            name="religion"
                            placeholder="e.g., Christianity, Buddhism, Islam"
                            onChange={handleChange}
                            isError={''}
                        />
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Address *"
                            value={formData.address}
                            type="textarea"
                            name="address"
                            placeholder="123 Main Street, City, State, ZIP"
                            onChange={handleChange}
                            isError={errors.address}
                        />
                        <FormInput
                            label="Preferred Language *"
                            value={formData.preferredLanguage}
                            type="select"
                            name="preferredLanguage"
                            placeholder=""
                            onChange={handleChange}
                            isError={errors.preferredLanguage}
                            options={["English", "Thai", "Mandarin", "French", "German", "Japanese", "Other"]}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Emergency Contact Name"
                            value={formData.emergencyContactName || ''}
                            type="text"
                            name="emergencyContactName"
                            placeholder="Emily"
                            onChange={handleChange}
                            isError={''}
                        />
                        <FormInput
                            label="Emergency Contact Relationship"
                            value={formData.emergencyContactRelationship || ''}
                            type="select"
                            name="emergencyContactRelationship"
                            placeholder=""
                            onChange={handleChange}
                            isError={errors.emergencyContactRelationship}
                            options={["Spouse", "Parent", "Child", "Sibling", "Friend", "Other"]}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-[#1a59c2] py-3 text-center text-white transition hover:bg-[#164aa0] px-6 rounded-lg"
                    >
                        Submit Registration
                    </button>
                </div>
            </div>
        </div>
    );
}
interface TextInputProps {
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    isError: string;
    type: string;
    name: string;
    placeholder: string;
    options?: string[];
}

const FormInput = ({ label, value, onChange, isError, type, name, placeholder, options }: TextInputProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            {
                type == 'select' ?
                    <select
                        name={name}
                        value={value}
                        onChange={onChange}
                        className={`w-full px-4 py-[0.86rem] border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${isError ? 'border-red-500' : 'border-gray-300'
                            }`}
                    >
                        <option value="">Select</option>
                        {
                            options?.map((v, k) => <option key={k} value={v}>{v}</option>)
                        }
                    </select>
                    : type == 'textarea' ?
                        <textarea
                            name={name}
                            value={value}
                            onChange={onChange}
                            rows={3}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${isError ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder={placeholder}
                        ></textarea>
                        :
                        <input
                            type={type}
                            name={name}
                            value={value}
                            onChange={onChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${isError ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder={placeholder}
                        />
            }
            {isError && (
                <p className="mt-1 text-sm text-red-600">{isError}</p>
            )}
        </div>
    )
}