import { Grid, View, Divider } from "@adobe/react-spectrum";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import EventDashboard from "./events/EventTable";
import DashboardFooter from "./DashboardFooter";

interface IDashboardLayoutProps {
    children: string | JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
}

export default function DashboardLayout({children} : IDashboardLayoutProps) {
    return (
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
    )
}