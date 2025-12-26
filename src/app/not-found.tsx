'use client';

import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="flex h-full items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                <div className="mb-[200px]">
                    <h1 className="text-3xl font-bold text-gray-600">404</h1>
                    <h2 className="text-lg font-semibold text-gray-500">This Page Not Found</h2>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-6 w-full text-center text-gray-600 hover:text-gray-800 transition"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}