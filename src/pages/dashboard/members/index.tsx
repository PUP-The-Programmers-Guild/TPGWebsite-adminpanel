import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MembersTable from "@/components/dashboard/members/MembersTable";

export default function MembersDashboard() {
    return (
        <DashboardLayout>
            <MembersTable />
        </DashboardLayout>
    )
}