import { View, Text, Divider, Button, ButtonGroup, Flex, useAsyncList, DialogTrigger, Form, Dialog, Heading, Content, Header, TextField } from "@adobe/react-spectrum";
import { Cell, Column, Row, TableView, TableBody, TableHeader } from '@adobe/react-spectrum'
import Add from '@spectrum-icons/workflow/Add';
import Edit from '@spectrum-icons/workflow/Edit';
import Delete from '@spectrum-icons/workflow/Delete';
import Filter from "@spectrum-icons/workflow/Filter";
import GraphBarHorizontal from "@spectrum-icons/workflow/GraphBarHorizontal";
import Refresh from "@spectrum-icons/workflow/Refresh";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IFAQsTableRowProps {
    id: number;
    title: string;
    description: string;
}

export default function FaqsTable() {
    const FAQS_COLUMNS = [{key:"id", name: "FAQ ID"}, {key:"title", name: "FAQ Title"}, {key:"description", name: "FAQ Description"}];
    const router = useRouter();

    let faqsData = useAsyncList<IFAQsTableRowProps>({
        async load({signal}) {
            const url = process.env.NEXT_PUBLIC_BACKEND_API_URL
            let res = await fetch(`${url}/get_faqs`, {signal});
            let json = await res.json();
            return {items: json.faqs};
        }
    })
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [activeEdit, setActiveEdit] = useState<boolean>(false);
    const [activeDelete, setActiveDelete] = useState<boolean>(false);
    const [activeAdd, setActiveAdd] = useState<boolean>(true);

    const [selectedRowInfo, setSelectedRowInfo] = useState<IFAQsTableRowProps>();
    const [updatedRowInfo, setUpdatedRowInfo] = useState<IFAQsTableRowProps>();

    useEffect(() => {
        if (selectedRows.size === 1) {
            setActiveAdd(false)
            setActiveDelete(true)
            setActiveEdit(true)
            setSelectedRowInfo(faqsData.items.find((faq) => faq.id === Array.from(selectedRows)[0]) )
        } else if (selectedRows.size > 1) {
            setActiveEdit(false)
            setActiveDelete(true)
            setActiveEdit(false)
        } else {
            setActiveAdd(true)
            setActiveDelete(false)
            setActiveEdit(false)
        }
    }, [selectedRows, selectedRowInfo, faqsData])

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
                            <Button variant="accent" style="fill" isDisabled={!activeAdd} onPress={() => router.push("/dashboard/faqs/add")}>
                                <Add />
                                <Text>Add</Text>
                            </Button>

                            <DialogTrigger>
                                <Button variant="secondary" style="fill" isDisabled={!activeEdit} onPress={() => setUpdatedRowInfo(selectedRowInfo)}>
                                    <Edit />
                                    <Text>Edit</Text>
                                </Button>

                                {(close) => (
                                    <Dialog>
                                        <Heading>Edit FAQ</Heading>
                                        <Divider />
                                        <Content>
                                            <Form maxWidth="size-3600">
                                                <TextField label="FAQ ID" value={String(updatedRowInfo?.id)} isReadOnly isDisabled />
                                                <TextField label="Title" value={updatedRowInfo?.title} onChange={(value: string) => setUpdatedRowInfo((prevState) => ({...prevState, "title": value}))}/>
                                                <TextField label="Description" value={updatedRowInfo?.description} onChange={(value: string) => setUpdatedRowInfo((prevState) => ({...prevState, "description": value}))}/>
                                            </Form>
                                        </Content>
                                        <ButtonGroup>
                                            <Button variant="secondary" onPress={close}>Cancel</Button>
                                            <Button variant="accent" onPress={close}>Confirm</Button>
                                        </ButtonGroup>
                                    </Dialog>
                                )}
                            </DialogTrigger>

                            <DialogTrigger>
                                <Button variant="negative" style="fill" isDisabled={!activeDelete}>
                                    <Delete />
                                    <Text>Remove</Text>
                                </Button>

                                {(close) => (
                                    <Dialog>
                                        <Heading>Remove FAQ(s)?</Heading>
                                        <Divider />
                                        <Content>
                                            <Header>
                                                Are you sure you want to remove the selected FAQ(s)?
                                            </Header>
                                            <Flex flex="col" gap="size-100">
                                                {Array.from(selectedRows).map((id) => <Text key={id}><b>{id}</b></Text>)}
                                            </Flex>
                                        </Content>
                                        <ButtonGroup>
                                            <Button variant="secondary" onPress={close}>Cancel</Button>
                                            <Button variant="negative" onPress={close}>Confirm</Button>
                                        </ButtonGroup>
                                    </Dialog>
                                )}
                            </DialogTrigger>
                        </ButtonGroup>
                    </Flex>
                    <Button variant="secondary" onPress={() => faqsData.reload()}>
                        <Refresh />
                        <Text>Refresh</Text>
                    </Button>
                </Flex>
            </View>

            <View paddingX="size-100">
                <TableView
                    aria-label="Example table with static contents"
                    selectionMode="multiple"
                    selectedKeys={selectedRows}
                    onSelectionChange={setSelectedRows}
                    overflowMode="truncate"
                    minHeight={100}
                >
                    <TableHeader>
                        {FAQS_COLUMNS.map((column) => (
                            <Column key={column.key} allowsResizing defaultWidth={125}>{column.name}</Column>
                        ))}
                    </TableHeader>
                    <TableBody
                        items={faqsData.items}
                        loadingState={faqsData.loadingState}
                    >
                        {faqsData.items.map((faq) => (
                            <Row key={faq.id}>
                                <Cell>{faq.id}</Cell>
                                <Cell>{faq.title}</Cell>
                                <Cell>{faq.description}</Cell>
                            </Row>
                        ))}
                    </TableBody>
                </TableView>
            </View>

        </View>
    )
}