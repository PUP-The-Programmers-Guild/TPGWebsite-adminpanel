import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OfficersAddForm from "@/components/dashboard/officers/OfficersAddForm";
import { useRouter } from "next/router";

export default function AddOfficer() {
    const router = useRouter();
    return (
        <DashboardLayout>
            <OfficersAddForm routeSuccessCallback={() => router.push('/dashboard/officers')}/>
        </DashboardLayout>
    )
}