import { Header, Flex, Button, Text, View } from "@adobe/react-spectrum";
import User from '@spectrum-icons/workflow/User';

export default function DashboardHeader() {
    return (
        <Flex gridArea="header"  marginX="size-150" alignItems={"center"} justifyContent="space-between">
            <Header>
                <Text>TPGWebsite Admin Panel</Text>
            </Header>
            <Button variant="secondary" aria-label="User Setting">
                <User aria-label="User"/>
            </Button>
        </Flex>
    )
}