import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { ProgressCircle } from "@adobe/react-spectrum";

const EventsAddForm = dynamic(() => import('@/components/dashboard/events/EventsAddForm'), { ssr: false, loading: () => <ProgressCircle aria-label="Loading…" isIndeterminate /> });

export default function AddEvents() {
    const router = useRouter();
    return (
        <DashboardLayout>
            <EventsAddForm routeSuccessCallback={() => router.push('/dashboard/events')}/>
        </DashboardLayout>
    )
}