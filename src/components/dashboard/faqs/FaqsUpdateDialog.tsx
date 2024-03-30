import { DialogTrigger, Button, Dialog, Heading, Divider, Content, Form, TextField, ButtonGroup, Text} from "@adobe/react-spectrum"
import Edit from "@spectrum-icons/workflow/Edit"
import { IFAQsTableRowProps, IFaqsUpdateDialogProps } from "./FaqsTable.interface";
import { ToastQueue } from "@react-spectrum/toast";
import { useState } from "react";

export default function FaqsUpdateDialog({ activeEdit, selectedRowInfo, faqsData, setSelectedRows} : IFaqsUpdateDialogProps) {
    const [updatedRowInfo, setUpdatedRowInfo] = useState<IFAQsTableRowProps>({
        id: "",
        title: "",
        description: ""
    });
    
    let onRowUpdate = async (updatedRowInfo: IFAQsTableRowProps) : Promise<boolean> => {
        let formData = updatedRowInfo;
        let url = "/api/update_faq";
        let isSuccess = false;
        await fetch(url, {
            headers: { 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin':'*',
                ...(localStorage.getItem('token') ? { authorization: `${localStorage.getItem('token')}` } : {}) 
            },
            body: JSON.stringify(formData),
            method: "POST",
        }).then(res =>{
            if (res.ok) {
                ToastQueue.positive("FAQ updated successfully.", {timeout: 3500})
                isSuccess = true;
            } else {
                if (res.status === 500) throw new Error('Error 500, Internal Server Error')
                if (res.status === 403) throw new Error('Error 401, Unauthorized')
                throw new Error("See Console for Details.")
            }
        }).catch((error) => {
            ToastQueue.negative(`Failed to update FAQ. ${error}`, {timeout: 3500})
            isSuccess = false;
        });
        return isSuccess;
    };



    let onPressUpdate = (close: any) => {
        onRowUpdate(updatedRowInfo)
            .then((isSuccess: boolean) => {
                if (isSuccess) {
                    faqsData.reload();
                    setSelectedRows(new Set());
                    close();
                }
            });
    };
    return (
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
                            <TextField 
                                label="FAQ ID" 
                                value={String(updatedRowInfo?.id)} 
                                isReadOnly 
                                isDisabled
                            />
                            <TextField 
                                label="Title" 
                                value={updatedRowInfo?.title} 
                                onChange={(value: string) => setUpdatedRowInfo((prevState : IFAQsTableRowProps) => ({...prevState, "title": value}))}
                                isDisabled={selectedRowInfo.title === ""}
                            />
                            <TextField 
                                label="Description" 
                                value={updatedRowInfo?.description} 
                                isDisabled={selectedRowInfo.description === ""}
                                onChange={(value: string) => setUpdatedRowInfo((prevState) => ({...prevState, "description": value}))}
                            />
                        </Form>
                    </Content>
                    <ButtonGroup>
                        <Button variant="secondary" onPress={close}>Cancel</Button>
                        <Button 
                            variant="accent" 
                            onPress={() => onPressUpdate(close)}
                        >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </Dialog>
            )}
        </DialogTrigger>
    )
}