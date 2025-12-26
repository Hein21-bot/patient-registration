import { AlertCircle, CheckCircle, Clock, LucideIcon, Trash2 } from "lucide-react";
import { Session } from "../types";

interface PatientListProps {
    patientList: Session[];
    deleteSession: (id: string) => void;
    handleSelectPatient: (id: string) => void;
    selectedPatientId: string | undefined;
    getStatusIcon: (status: string) => React.ReactElement<LucideIcon> | null;
    getStatusColor: (status: string) => string;
}

export default function PatientList({ patientList, deleteSession, handleSelectPatient, selectedPatientId, getStatusColor, getStatusIcon }: PatientListProps) {

    return (
        <div className="">
            <div className="bg-white rounded-xl shadow-primary_blue-200">
                <div className="bg-blue-100 p-6 flex justify-between items-center rounded-tl-xl rounded-tr-xl">
                    <h4 className="text-xl font-bold text-primary_blue">Patient List</h4>
                </div>
                <div className="">
                    {patientList.length == 0 ? (
                        <div className="md:min-h-[48vh] text-gray-500 flex items-center justify-center">
                            <p className="text-sm text-gray-500 mb-20">No Patients registered yet</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200 max-h-[300px] md:max-h-[720px] overflow-auto">
                            {
                                patientList.map(patient => (
                                    <div key={patient.id} className={`px-6 py-4 hover:bg-gray-50 transition cursor-pointer ${selectedPatientId == patient.id ? 'bg-gray-100' : ''}`} onClick={(e) => handleSelectPatient(patient.id)}>
                                        <div className="flex justify-between ">
                                            <div className="flex flex-wrap items-center ">
                                                <div className="w-full">
                                                    <span>{patient.data.firstName}&nbsp;</span>
                                                    <span className="hidden md:inline">{patient.data.middleName}&nbsp;</span>
                                                    <span className="hidden md:inline">{patient.data.lastName}</span>
                                                </div>
                                                <div className="mt-2 text-sm text-gray-500">
                                                    {patient.data.phone}
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-1 md:space-x-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center space-x-1 ${getStatusColor(patient.status)}`}>
                                                    {getStatusIcon(patient.status)}
                                                    <span className="capitalize">{patient.status}</span>
                                                </span>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); deleteSession(patient.id) }}
                                                    disabled={patient.status == 'filling'}
                                                    className={`${patient.status == 'filling' ? 'cursor-not-allowed' : ''} text-red-600 hover:bg-red-50 rounded-lg transition`}
                                                    title="Delete session"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}