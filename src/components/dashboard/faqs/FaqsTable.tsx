import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { View, Text,Button, ButtonGroup, Flex, useAsyncList, useCollator } from "@adobe/react-spectrum";
import { Cell, Column, Row, TableView, TableBody, TableHeader } from '@adobe/react-spectrum'
import Add from '@spectrum-icons/workflow/Add';
import Refresh from "@spectrum-icons/workflow/Refresh";
import { IFAQsTableRowProps } from "./FaqsTable.interface";
import RevalidateCacheDialog from "../shared/RevalidateCacheDialog";
import dynamic from "next/dynamic";

const FaqsUpdateDialog = dynamic(() => import("./FaqsUpdateDialog"));
const FaqsRemoveDialog = dynamic(() => import("./FaqsRemoveDialog"));


interface IFaqTableCRUDBtnActive {
    activeEdit: boolean;
    activeDelete: boolean;
    activeAdd: boolean;
}

export default function FaqsTable() {
    const FAQS_COLUMNS = [{key:"id", name: "FAQ ID"}, {key:"title", name: "FAQ Title"}, {key:"description", name: "FAQ Description"}];
    const router = useRouter();
    let collator = useCollator({ numeric: true });
    
    let faqsData = useAsyncList<IFAQsTableRowProps>({
        async load({signal}) {
            const url = process.env.NEXT_PUBLIC_BACKEND_API_URL
            let res = await fetch(`${url}/get_faqs`, {signal});
            let json = await res.json();
            return {items: json.faqs};
        },
        async sort({ items, sortDescriptor } : { items: IFAQsTableRowProps[], sortDescriptor: any}) {
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
    const [selectedRowInfo, setSelectedRowInfo] = useState<IFAQsTableRowProps>({
        id: "",
        title: "",
        description: ""
    });

    const crudButtonActive = useMemo<IFaqTableCRUDBtnActive>(() => {
        if (selectedRows.size === 1) {
            setSelectedRowInfo(
                faqsData.items.find((faq) => faq.id === Array.from(selectedRows)[0]) 
                || {id: "", title: "", description: ""}
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
    }, [faqsData.items, selectedRows])

    return (
        <View gridArea="content" overflow="hidden">
            <View borderYWidth="thin" borderColor="dark" padding="size-100">
                <Flex justifyContent="space-between">
                    <Flex gap="size-125">
                        <ButtonGroup>
                            <Button 
                                variant="accent" 
                                style="fill" 
                                isDisabled={!crudButtonActive.activeAdd} 
                                onPress={() => router.push("/dashboard/faqs/add")}
                            >
                                <Add />
                                <Text>Add</Text>
                            </Button>
                            <FaqsUpdateDialog 
                                activeEdit={crudButtonActive.activeEdit} 
                                selectedRowInfo={selectedRowInfo} 
                                setSelectedRows={setSelectedRows}
                                faqsData={faqsData} 
                            />
                            <FaqsRemoveDialog 
                                activeDelete={crudButtonActive.activeDelete} 
                                selectedRows={selectedRows} 
                                faqsData={faqsData} 
                                setSelectedRows={setSelectedRows} 
                            />
                        </ButtonGroup>
                    </Flex>
                    <Flex>
                    <RevalidateCacheDialog 
                        dataType="faqs"
                        isCacheDialogOpen={isCacheDialogOpen}
                        setIsCacheDialogOpen={setIsCacheDialogOpen}
                    />
                    <Button variant="secondary" onPress={() => faqsData.reload()}>
                        <Refresh />
                        <Text>Refresh</Text>
                    </Button>
                    </Flex>
                </Flex>
            </View>

            <View paddingX="size-100">
                <TableView
                    aria-label="FAQ Data Table"
                    selectionMode="multiple"
                    selectedKeys={selectedRows}
                    onSelectionChange={(selected) => {
                        if (selected === "all") {
                            setSelectedRows(new Set(faqsData.items.map((faq) => faq.id).map(String)))
                        } else {
                            setSelectedRows(new Set([...selected].map(String)))
                        }
                    }}
                    overflowMode="truncate"
                    minHeight={100}
                    onSortChange={faqsData.sort}
                    sortDescriptor={faqsData.sortDescriptor}
                >
                    <TableHeader columns={FAQS_COLUMNS}>
                        {FAQS_COLUMNS.map((column) => (
                            <Column key={column.key} allowsResizing allowsSorting defaultWidth={125}>{column.name}</Column>
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