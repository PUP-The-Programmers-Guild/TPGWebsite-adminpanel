import { View, Header, Text, Divider, Button, ButtonGroup, Flex } from "@adobe/react-spectrum";
import { Cell, Column, Row, TableView, TableBody, TableHeader } from '@adobe/react-spectrum'
import Add from '@spectrum-icons/workflow/Add';
import Edit from '@spectrum-icons/workflow/Edit';
import Delete from '@spectrum-icons/workflow/Delete';
import Filter from "@spectrum-icons/workflow/Filter";
import GraphBarHorizontal from "@spectrum-icons/workflow/GraphBarHorizontal";
import Refresh from "@spectrum-icons/workflow/Refresh";

export default function EventsTable() {
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

    return (
        <View gridArea="content" overflow="hidden">
            <View borderYWidth="thin" borderColor="dark" padding="size-100">
                <Flex justifyContent="space-between">
                    <Flex gap="size-125">
                        <ButtonGroup>
                            <Button variant="secondary" style="fill">
                                <Filter size="XXS"/>
                                <Text>Filter</Text>
                            </Button>
                            <Button variant="secondary" style="fill">
                                <GraphBarHorizontal />
                                <Text>Sort</Text>
                            </Button>
                        </ButtonGroup>
                        <Divider size="S" orientation="vertical" />
                        <ButtonGroup>
                            <Button variant="accent" style="fill">
                                <Add />
                                <Text>Add</Text>
                            </Button>
                            <Button variant="secondary" style="fill">
                                <Edit />
                                <Text>Edit</Text>
                            </Button>
                            <Button variant="negative" style="fill">
                                <Delete />
                                <Text>Remove</Text>
                            </Button>
                        </ButtonGroup>
                    </Flex>
                    <Button variant="secondary">
                        <Refresh />
                        <Text>Refresh</Text>
                    </Button>
                </Flex>
            </View>
            <View paddingX="size-100">
                <TableView
                    aria-label="Example table with static contents"
                    selectionMode="multiple"
                    overflowMode="truncate"
                >
                    <TableHeader>
                        {EVENT_COLUMNS.map((column) => (
                            <Column key={column.key} allowsResizing defaultWidth={125}>{column.name}</Column>
                        ))}
                    </TableHeader>
                    <TableBody >
                        <Row>
                            <Cell>Games</Cell>
                            <Cell>File folder</Cell>
                            <Cell>6/7/2020</Cell>
                            <Cell>Games</Cell>
                            <Cell>File folder</Cell>
                            <Cell>6/7/2020</Cell>
                            <Cell>Games</Cell>
                            <Cell>File folder</Cell>
                            <Cell>6/7/2020</Cell>
                            <Cell>Games</Cell>
                        </Row>
                    </TableBody>
                </TableView>
            </View>
        </View>
    )
}