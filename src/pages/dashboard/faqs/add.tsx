import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { ProgressCircle } from "@adobe/react-spectrum";

const FaqsAddForm = dynamic(() => import('@/components/dashboard/faqs/FaqsAddForm'), { ssr: false, loading: () => <ProgressCircle aria-label="Loading…" isIndeterminate /> });

export default function AddFaqs() {
    const router = useRouter();
    return (
        <DashboardLayout>
            <FaqsAddForm routeSuccessCallback={() => router.push('/dashboard/faqs')}/>
        </DashboardLayout>
    )
}