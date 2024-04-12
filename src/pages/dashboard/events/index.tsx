import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ProgressCircle } from "@adobe/react-spectrum";
import dynamic from "next/dynamic";

const EventsTable = dynamic(() => import('@/components/dashboard/events/EventsTable'), { ssr: false, loading: () => <ProgressCircle aria-label="Loading…" isIndeterminate /> });

export default function EventsDashboard() {
    return (
        <>
            <DashboardLayout>
                <EventsTable />
            </DashboardLayout>
        </>
    )
}