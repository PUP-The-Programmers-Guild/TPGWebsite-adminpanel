import { Button, ButtonGroup, Cell, Column, Flex, Row, TableBody, TableHeader, TableView, View, useAsyncList, useCollator, Text, Item, Tabs, TabList, Divider, Key } from "@adobe/react-spectrum";
import { useRouter } from "next/router";
import { IOffice, IOfficerTableRowProps } from "./OfficersTable.interface";
import Refresh from "@spectrum-icons/workflow/Refresh";
import Add from "@spectrum-icons/workflow/Add";
import { useState, useMemo, useEffect } from "react";
import RevalidateCacheDialog from "../shared/RevalidateCacheDialog";
import { OFFICE_TYPES } from "./Officers.constants";
import OfficersUpdateDialog from "./OfficersUpdateDialog";
import OfficersRemoveDialog from "./OfficersRemoveDialog";

interface IOfficersTableCRUDBtnActive {
    activeEdit: boolean;
    activeDelete: boolean;
    activeAdd: boolean;
}

export default function OfficersTable() {

    let collator = useCollator({ numeric: true });
    const router = useRouter()

    const OFFICER_COLUMNS = [
        {key: "role", name: "Role"},
        {key: "index", name: "Index"},
        {key: "user_id", name: "User ID"},
        {key: "name", name: "Name"},
        {key: "office", name: "Office"},
        {key: "position", name: "Position"}, 
        {key: "image_url", name:"Image URL"}, 
    ]

    const [selectedOffice, setSelectedOffice] = useState<string>("President");

    let officersData = useAsyncList<IOfficerTableRowProps>({
        async load({signal}) {
            const url = "/api/get_officers"
            let res = await fetch(url, {signal});
            let json = await res.json();
            return {items: json.officers.filter((thisOffice: IOffice) => thisOffice.office === selectedOffice)[0].officers};
        },
        async sort({ items, sortDescriptor } : { items: IOfficerTableRowProps[], sortDescriptor: any}) {
            return {
                items: items.sort((a : any, b : any) => {
                    let first = a[sortDescriptor.column];
                    let second = b[sortDescriptor.column];
                    let cmp = collator.compare(first, second);
                    if (sortDescriptor.direction === 'descending') {
                        cmp *= -1;
                    }
                    return cmp;
                })
            };
        }
    })
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [isCacheDialogOpen, setIsCacheDialogOpen] = useState<boolean>(false);
    const [selectedRowInfo, setSelectedRowInfo] = useState<IOfficerTableRowProps>({
        office: "",
        index: null,
        user_id: "",
        role: "",
        image_url: "",
        name: "",
        position: "",
    });
    
    const crudButtonActive = useMemo<IOfficersTableCRUDBtnActive >(() => {
        if (selectedRows.size === 1) {
            setSelectedRowInfo(
                officersData.items.find((faq) => faq.user_id === Array.from(selectedRows)[0]) 
                || 
                {
                    office: "",
                    index: null,
                    user_id: "",
                    role: "",
                    image_url: "",
                    name: "",
                    position: "",
                }
            )
            return {
                activeAdd: false,
                activeDelete: true,
                activeEdit: true
            }
        } else {
            return {
                activeAdd: true,
                activeDelete: false,
                activeEdit: false
            } 
        }
    }, [officersData.items, selectedRows])

    useEffect(() => {
        officersData.reload();
        setSelectedRows(new Set())
    }, [selectedOffice])
    
    return (
        <View gridArea="content" overflow="hidden">
            <View borderYWidth="thin" borderColor="dark" padding="size-100">
                <Flex justifyContent="space-between">
                    <Flex columnGap="size-175">
                        <Flex>
                            <Tabs aria-label="Offices" items={OFFICE_TYPES} selectedKey={selectedOffice} onSelectionChange={(key: Key) => setSelectedOffice(key as string)} density="compact">   
                                <TabList maxWidth="300px">
                                    {OFFICE_TYPES.map((route) => <Item key={route}>{route}</Item>)}
                                </TabList>
                            </Tabs>
                        </Flex>
                        <Divider size="M" orientation="vertical" />
                        <ButtonGroup>
                            <Button 
                                variant="accent" 
                                style="fill" 
                                isDisabled={!crudButtonActive.activeAdd} 
                                onPress={() => router.push("/dashboard/officers/add")}
                                alignSelf="center"
                                justifySelf="center"
                            >
                                <Add />
                                <Text>Add</Text>
                            </Button>
                            <OfficersUpdateDialog 
                                activeEdit={crudButtonActive.activeEdit} 
                                selectedRowInfo={selectedRowInfo}
                                officersData={officersData}
                                setSelectedRows={setSelectedRows}
                            />
                            <OfficersRemoveDialog
                                activeDelete={crudButtonActive.activeDelete}
                                selectedRows={selectedRows}
                                setSelectedRows={setSelectedRows}
                                officersData={officersData}
                            />
                        </ButtonGroup>
                    </Flex>
                    <Flex alignContent="center" alignItems="center" columnGap="size-175">
                        <RevalidateCacheDialog 
                            dataType="officers"
                            isCacheDialogOpen={isCacheDialogOpen}
                            setIsCacheDialogOpen={setIsCacheDialogOpen}
                        />
                        <Button variant="secondary" onPress={() => officersData.reload()}>
                            <Refresh />
                            <Text>Refresh Table</Text>
                        </Button>
                    </Flex>
                </Flex>
            </View>
            <View paddingX="size-100">
                <TableView
                    aria-label="Officer Data Table"
                    selectionMode="single"
                    overflowMode="truncate"
                    minHeight={officersData.items.length <= 2 ? 0 : 100} 
                    selectedKeys={selectedRows}
                    onSelectionChange={(selected) => {
                        if (selected === "all") {
                            setSelectedRows(new Set(officersData.items.map((officer) => officer.user_id).map(String)))
                        } else {
                            setSelectedRows(new Set([...selected].map(String)))
                        }
                    }}
                    onSortChange={officersData.sort}
                    sortDescriptor={officersData.sortDescriptor}
                >
                    <TableHeader columns={OFFICER_COLUMNS}>
                        {OFFICER_COLUMNS.map((column, idx) => (
                            <Column key={column.key} allowsResizing defaultWidth={idx === OFFICER_COLUMNS.length - 1 ? 250 : 150} allowsSorting={column.key !== "officer_type"}>{column.name} </Column>
                        ))}
                    </TableHeader>
                    <TableBody
                        items={officersData.items}
                        loadingState={officersData.loadingState}
                    >
                        {officersData.items.map((officer) => (
                            <Row key={officer.user_id}>
                                <Cell>{officer.role}</Cell>
                                <Cell>{officer.index}</Cell>
                                <Cell>{officer.user_id}</Cell>
                                <Cell>{officer.office}</Cell>
                                <Cell>{officer.name}</Cell>
                                <Cell>{officer.position}</Cell>
                                <Cell>{officer.image_url}</Cell>
                            </Row>
                        ))}
                    </TableBody>
                </TableView>
            </View>
        </View>
    )
}