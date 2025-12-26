import { AlertCircle, CheckCircle, Clock, Database, LucideIcon } from "lucide-react";
import { Session } from "../types";

interface StatusIndicatorsProps {
    patientList: Session[];
}

export default function StatusIndicators({ patientList }: StatusIndicatorsProps) {
    const fillingCount = patientList.filter(s => s.status === 'filling').length;
    const inactiveCount = patientList.filter(s => s.status === 'inactive').length;
    const submittedCount = patientList.filter(s => s.status === 'submitted').length;
    const totalCount = patientList.length;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 my-8">
            <StatusCard
                status="Submitted"
                count={submittedCount}
                icon={<CheckCircle className="w-12 h-12 text-[#08baa3] opacity-20" />}
                color="8 186 163"
            />
            <StatusCard
                status="Currently Filling"
                count={fillingCount}
                icon={<Clock className="w-12 h-12 text-[#407bde] opacity-20" />}
                color="64 123 222"
            />
            <StatusCard
                status="Inactive Forms"
                count={inactiveCount}
                icon={<AlertCircle className="w-12 h-12 text-[#f5c000] opacity-20" />}
                color="245 192 0"
            />
            <StatusCard
                status="Total"
                count={totalCount}
                icon={<Database className="w-12 h-12 text-[#8b63e0] opacity-20" />}
                color="139 99 224"
            />
        </div>
    )
}


interface StatusCardProps {
    status: string;
    count: number;
    icon: React.ReactElement<LucideIcon>;
    color: string;
}

const StatusCard = ({ status, count, icon, color }: StatusCardProps) => {
    return (
        <div
            className={`bg-white p-3 md:p-6 rounded-xl shadow-md border-l-4 border-[rgb(var(--color))]`}
            style={{
                "--color": color,
            } as React.CSSProperties}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">{status}</p>
                    <p className={`text-3xl font-bold text-[rgb(var(--color))]`}>{count}</p>
                </div>
                {icon}
            </div>
        </div>
    )
}