import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FaqsAddForm from "@/components/dashboard/faqs/FaqsAddForm";
import { useRouter } from "next/router";

export default function AddFaqs() {
    const router = useRouter();
    return (
        <DashboardLayout>
            <FaqsAddForm routeSuccessCallback={() => router.push('/dashboard/faqs')}/>
        </DashboardLayout>
    )
}