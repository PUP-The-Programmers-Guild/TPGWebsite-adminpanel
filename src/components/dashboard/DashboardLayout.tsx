import { Grid } from "@adobe/react-spectrum";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import AuthProtectedWrapper from "../auth/AuthProtectedWrapper";

interface IDashboardLayoutProps {
    children: string | JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
}

export default function DashboardLayout({children} : IDashboardLayoutProps) {
    return (
        <AuthProtectedWrapper>
            <Grid
                areas={[
                    'header   header',
                    'sidebar content',
                    'footer   footer'
                ]}
                columns={['1fr', '6fr']}
                rows={['size-675', 'auto', 'size-325']}
                height="calc(100vh)"
            >
                <DashboardHeader />
                <DashboardSidebar />
                {children}
                <DashboardFooter />
            </Grid>
        </AuthProtectedWrapper>
    )
}