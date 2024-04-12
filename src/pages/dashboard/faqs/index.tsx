import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ProgressCircle } from "@adobe/react-spectrum";
import dynamic from "next/dynamic";

const FaqsTable = dynamic(() => import('@/components/dashboard/faqs/FaqsTable'), { ssr: false, loading: () => <ProgressCircle aria-label="Loading…" isIndeterminate />  });

export default function FaqsDashboard() {
    return (
        <DashboardLayout>
            <FaqsTable />
        </DashboardLayout>
    )
}