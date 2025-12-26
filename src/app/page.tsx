'use client';

import { Clipboard, Users } from 'lucide-react';
import MainDashboardCard from '../components/MainDashboardCard';


export default function Home() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mb-20">
                <MainDashboardCard
                    icon={<Users className="w-12 h-12 text-white" />}
                    title="Patient Registration Form"
                    description="Enter your information securely for medical review."
                    buttonText="Register Now"
                    fromColor="8 186 163"
                    toColor="161 247 236"
                    goTo="/patient"
                />
                <MainDashboardCard
                    icon={<Clipboard className="w-12 h-12 text-white" />}
                    title="Staff Dashboard"
                    description="Monitor patient information in real time."
                    buttonText="Sign In & Monitor"
                    fromColor="26 89 194"
                    toColor="173 218 248"
                    goTo="/staff"
                />
            </div>
        </div>
    );
}