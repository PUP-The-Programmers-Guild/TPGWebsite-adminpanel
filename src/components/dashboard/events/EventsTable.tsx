import { View, Text, Divider, Button, ButtonGroup, Flex, useAsyncList } from "@adobe/react-spectrum";
import { Cell, Column, Row, TableView, TableBody, TableHeader } from '@adobe/react-spectrum'
import Add from '@spectrum-icons/workflow/Add';
import Filter from "@spectrum-icons/workflow/Filter";
import GraphBarHorizontal from "@spectrum-icons/workflow/GraphBarHorizontal";
import Refresh from "@spectrum-icons/workflow/Refresh";
import { IEventsTableRowProps } from "./EventsTable.interface";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import EventsUpdateDialog from "./EventsUpdateDialog";
import EventsRemoveDialog from "./EventsRemoveDialog";
import EventBadge from "./EventBadge";
import RevalidateCacheDialog from "../shared/RevalidateCacheDialog";


interface IEventsTableCRUDBtnActive {
    activeEdit: boolean;
    activeDelete: boolean;
    activeAdd: boolean;
}

export default function EventsTable() {
    const router = useRouter();
    const EVENT_COLUMNS = [
        {key: "id", name: "Event ID"}, 
        {key: "title", name: "Event Title"}, 
        {key: "start_date", name: "Start Date"},
        {key: "end_date", name: "End Date"},
        {key: "description", name: "Description"}, 
        {key: "event_type", name:"Event Type"}, 
        {key: "image_url", name:"Image URL"}, 
        {key: "facebook_url", name: "Facebook URL"}, 
        {key: "date_created", name: "Date Created"},
        {key: "date_updated", name: "Date Updated"}
    ]
    let eventsData = useAsyncList<IEventsTableRowProps>({
        async load({signal}) {
            const url = "/api/get_events"
            let res = await fetch(url, {signal});
            let json = await res.json();
            return {items: json.events};
        }
    })
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [isCacheDialogOpen, setIsCacheDialogOpen] = useState<boolean>(false);
    const [selectedRowInfo, setSelectedRowInfo] = useState<IEventsTableRowProps>({
        id: "",
        title: "",
        start_date: "",
        end_date: "",
        description: "",
        event_type: "",
        image_url: "",
        facebook_url: "",
        date_created: "",
        date_updated: ""
    });

    const crudButtonActive = useMemo<IEventsTableCRUDBtnActive>(() => {
        if (selectedRows.size === 1) {
            setSelectedRowInfo(
                eventsData.items.find((faq) => faq.id === Array.from(selectedRows)[0]) 
                || 
                {
                    id: "",
                    title: "",
                    start_date: "",
                    end_date: "",
                    description: "",
                    event_type: "",
                    image_url: "",
                    facebook_url: "",
                    date_created: "",
                    date_updated: ""
                }
            )
            return {
                activeAdd: false,
                activeDelete: true,
                activeEdit: true
            }
        } else if (selectedRows.size > 1) {
            return {
                activeAdd: false,
                activeDelete: true,
                activeEdit: false
            }
        } else {
            return {
                activeAdd: true,
                activeDelete: false,
                activeEdit: false
            } 
        }
    }, [eventsData.items, selectedRows])
    
    return (
        <View gridArea="content" overflow="hidden">
            <View borderYWidth="thin" borderColor="dark" padding="size-100">
                <Flex justifyContent="space-between">
                    <Flex gap="size-125">
                        <ButtonGroup>
                            <Button variant="secondary" style="fill" isDisabled={true}>
                                <Filter size="XXS"/>
                                <Text>Filter</Text>
                            </Button>
                            <Button variant="secondary" style="fill" isDisabled={true}>
                                <GraphBarHorizontal />
                                <Text>Sort</Text>
                            </Button>
                        </ButtonGroup>
                        <Divider size="S" orientation="vertical" />
                        <ButtonGroup>

                            <Button 
                                variant="accent" 
                                style="fill" 
                                isDisabled={!crudButtonActive.activeAdd} 
                                onPress={() => router.push("/dashboard/events/add")}
                            >
                                <Add />
                                <Text>Add</Text>
                            </Button>
                            <EventsUpdateDialog 
                                activeEdit={crudButtonActive.activeEdit} 
                                selectedRowInfo={selectedRowInfo} 
                                setSelectedRows={setSelectedRows}
                                eventsData={eventsData} 
                            />
                            <EventsRemoveDialog 
                                activeDelete={crudButtonActive.activeDelete} 
                                selectedRows={selectedRows} 
                                eventsData={eventsData} 
                                setSelectedRows={setSelectedRows} 
                            />
                            
                        </ButtonGroup>
                    </Flex>
                    <Flex gap={"size-150"}>
                        <RevalidateCacheDialog 
                            dataType="events"
                            isCacheDialogOpen={isCacheDialogOpen}
                            setIsCacheDialogOpen={setIsCacheDialogOpen}
                        />
                        <Button variant="secondary" onPress={() => eventsData.reload()}>
                            <Refresh />
                            <Text>Refresh Table</Text>
                        </Button>
                    </Flex>
                </Flex>
            </View>
            <View paddingX="size-100">
                <TableView
                    aria-label="Example table with static contents"
                    selectionMode="multiple"
                    overflowMode="truncate"
                    minHeight={100}
                    selectedKeys={selectedRows}
                    onSelectionChange={(selected) => setSelectedRows(new Set([...selected].map(String)))}
                >
                    <TableHeader>
                        {EVENT_COLUMNS.map((column) => (
                            <Column key={column.key} allowsResizing defaultWidth={125}>{column.name}</Column>
                        ))}
                    </TableHeader>
                    <TableBody
                        items={eventsData.items}
                        loadingState={eventsData.loadingState}
                    >
                        {eventsData.items.map((event) => (
                            <Row key={event.id}>
                                <Cell>{event.id}</Cell>
                                <Cell>{event.title}</Cell>
                                <Cell>{event.start_date}</Cell>
                                <Cell>{event.end_date}</Cell>
                                <Cell>{event.description}</Cell>
                                <Cell>
                                    {JSON.parse(event.event_type).map(
                                        (eventType: string) => 
                                            <EventBadge key={`${event.title}-${eventType}`} eventType={eventType.toUpperCase()}/>
                                        )
                                    }
                                </Cell>
                                <Cell>{event.image_url}</Cell>
                                <Cell>{event.facebook_url}</Cell>
                                <Cell>{event.date_created}</Cell>
                                <Cell>{event.date_updated}</Cell>
                            </Row>
                        ))}
                    </TableBody>
                </TableView>
            </View>
        </View>
    )
}