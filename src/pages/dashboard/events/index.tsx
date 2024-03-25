import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EventsTable from "@/components/dashboard/events/EventTable";

export default function EventsDashboard() {
    return (
        <>
        <DashboardLayout>
            <EventsTable />
        </DashboardLayout>
        </>
    )
}