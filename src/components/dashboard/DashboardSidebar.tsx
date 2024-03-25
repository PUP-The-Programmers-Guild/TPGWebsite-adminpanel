import { Item, ListBox, View } from "@adobe/react-spectrum";
import { useRouter } from 'next/router'

const ROUTING_OPTIONS = [
    { label: 'Events', path: '/dashboard/events' },
    { label: 'Members', path: '/dashboard/members' },
    { label: 'Membership Application', path: '/dashboard/members/applications' },
    { label: 'FAQs', path: '/dashboard/faqs' },
]

export default function DashboardSidebar() {
    const router = useRouter()
    return (
        <View gridArea="sidebar" backgroundColor={"gray-50"} borderEndWidth="thin" borderTopWidth="thin" borderColor="dark">
            <ListBox
                aria-label="links"
                disabledKeys={[router.pathname]}
            >
                {ROUTING_OPTIONS.map((option) => (
                    <Item key={option.path} href={option.path}>{option.label}</Item>
                ))}
            </ListBox>
        </View>
    )
}