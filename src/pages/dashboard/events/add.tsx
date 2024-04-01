import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EventsAddForm from "@/components/dashboard/events/EventsAddForm";
import { useRouter } from "next/router";

export default function AddEvents() {
    const router = useRouter();
    return (
        <DashboardLayout>
            <EventsAddForm routeSuccessCallback={() => router.push('/dashboard/events')}/>
        </DashboardLayout>
    )
}