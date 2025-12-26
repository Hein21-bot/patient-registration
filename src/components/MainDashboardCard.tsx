import { LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React from 'react';

interface DashboardProps {
    icon: React.ReactElement<LucideIcon>;
    title: string;
    description: string;
    buttonText: string;
    fromColor: string;
    toColor: string;
    goTo: string;
}

export default function MainDashboardCard({ icon, title, description, buttonText, fromColor, toColor, goTo }: DashboardProps) {
    const router = useRouter();

    return (
        <div
            className="group flex h-full flex-col items-center justify-center pt-4 xl:pt-6"
            style={{
                "--from-color": fromColor,
                "--to-color": toColor,
            } as React.CSSProperties}
        >

            <div className="relative -mb-6 h-20 w-20">

                <div
                    className={`
                        absolute inset-0 rounded-2xl
                        bg-[linear-gradient(to_top_right,rgb(var(--from-color)),rgb(var(--to-color)))]
                        rotate-[15deg] translate-x-[15px] -translate-y-[10px]
                        transition-transform duration-300 ease-in-out
                        group-hover:rotate-0
                        group-hover:translate-x-0
                        group-hover:translate-y-0
                    `}
                />

                <div
                    className={`
                        absolute inset-0 flex items-center justify-center rounded-2xl
                        backdrop-blur-sm
                        shadow-lg shadow-primary_blue-200 
                        bg-[linear-gradient(to_top_right,rgb(var(--from-color)/0.6),rgb(var(--to-color)/0.6))]
                    `}
                >
                    {icon}
                </div>
            </div>

            <div
                className="
                    flex w-full sm-[358px] xl:w-[448px] flex-1 flex-col items-center justify-between gap-9
                    rounded-xl bg-white p-5 pt-12 text-center
                    shadow-lg shadow-primary_blue-200
    
                ">

                <div className="flex flex-col items-center gap-3 text-primary_blue">
                    <h4 className="text-2xl font-bold">{title}</h4>
                    <p className="text-gray-600">{description}</p>
                </div>

                <button className="
                    w-full max-w-64 rounded-full bg-[#1a59c2]
                    py-3 text-center text-white
                    transition hover:bg-[#164aa0]"
                    onClick={() => router.push(goTo)}
                >
                    {buttonText}
                </button>
            </div>
        </div>

    )
}