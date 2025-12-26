import { LucideIcon } from "lucide-react";
import { Session } from "../types"

interface PatientDetailProps {
    session: Session | null;
    getStatusIcon: (status: string) => React.ReactElement<LucideIcon> | null;
    getStatusColor: (status: string) => string;
}

export default function PatientDetail({ session, getStatusIcon, getStatusColor }: PatientDetailProps) {

    return (
        <div className="border bg-white flex items-center justify-center rounded-xl min-h-[100px] md:min-h-[55vh]">
            {
                !session ?
                    <p className="text-sm text-gray-500">Select a patient to view details</p>
                    :
                    <div className=" w-full h-full p-6">
                        <div className="flex w-full justify-between items-center mb-6">
                            <h4 className="text-xl font-bold text-gray-700">Patient Details</h4>
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center space-x-1 ${getStatusColor(session.status)}`}>
                                {getStatusIcon(session.status)}
                                <span className="capitalize">{session.status}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid md:grid-cols-3 gap-4">
                                <PatientInfo value={session.data.firstName || '-'} label="First Name" />
                                <PatientInfo value={session.data.middleName || '-'} label="Middle Name" />
                                <PatientInfo value={session.data.lastName || '-'} label="Last Name" />
                            </div>

                            <PatientInfo value={session.data.dateOfBirth || '-'} label="Date of Birth" />

                            <PatientInfo value={session.data.gender || '-'} label="Gender" />

                            <PatientInfo value={session.data.phone || '-'} label="Phone Number" />

                            <PatientInfo value={session.data.email || '-'} label="Email" />

                            <PatientInfo value={session.data.nationality || '-'} label="Nationality" />

                            <PatientInfo value={session.data.religion || '-'} label="Religion" />

                            <PatientInfo value={session.data.address || '-'} label="Address" />

                            <PatientInfo value={session.data.preferredLanguage || '-'} label="Preferred Language" />

                            <PatientInfo value={session.data.emergencyContactName || '-'} label="Emergency Contact Name" />

                            <PatientInfo value={session.data.emergencyContactRelationship || '-'} label="Emergency Contact Relationship" />
                        </div>
                    </div>
            }

        </div >
    )
}

interface PatientInfoProps {
    value: string;
    label: string
}
const PatientInfo = ({ value, label }: PatientInfoProps) => {
    return (
        <div>
            <label className="text-sm font-medium text-gray-600">{label}</label>
            <p className="text-gray-800">{value}</p>
        </div>
    )
}