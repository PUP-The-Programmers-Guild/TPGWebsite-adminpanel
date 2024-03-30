import { Header, Flex, Text, ActionButton, Item, Menu, MenuTrigger } from "@adobe/react-spectrum";
import User from '@spectrum-icons/workflow/User';
import { useRouter } from "next/router";

export default function DashboardHeader() {
    const router = useRouter();

    let handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }
    return (
        <Flex gridArea="header" marginX="size-150" alignItems={"center"} justifyContent="space-between">
            <Header>
                <Text>TPGWebsite Admin Panel</Text>
            </Header>
            <MenuTrigger>
                <ActionButton aria-label="User Account Menu">
                    <User aria-label="User"/>
                </ActionButton>
                <Menu onAction={() => handleLogout()}>
                    <Item key="Logout">Logout</Item>
                </Menu>
            </MenuTrigger>
        </Flex>
    )
}