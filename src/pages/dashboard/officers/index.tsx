import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OfficersTable from "@/components/dashboard/officers/OfficersTable";
import { View } from "@adobe/react-spectrum";
import router, { useRouter } from "next/router";
import { ListBox } from "react-aria-components";
import { Item } from "react-stately";

export default function OfficersDashboard() {
    const router = useRouter();
    return (
        <DashboardLayout>
            <OfficersTable />
        </DashboardLayout>
    )
}