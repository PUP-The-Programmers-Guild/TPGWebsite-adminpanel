import { Grid, View } from "@adobe/react-spectrum";

interface IDashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout() {
    return (
        <Grid
            areas={[
                'header   header',
                'sidebar content',
                'footer   footer'
            ]}
            columns={['1fr', '3fr']}
            rows={['size-675', 'auto', 'size-675']}
            height="calc(100vh)"
        >
            <View backgroundColor="celery-600" gridArea="header" />
            <View backgroundColor="blue-600" gridArea="sidebar" />
            <View backgroundColor="purple-600" gridArea="content" />
            <View backgroundColor="magenta-600" gridArea="footer" />
        </Grid>
    )
}