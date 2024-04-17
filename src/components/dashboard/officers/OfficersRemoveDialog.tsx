import { ToastQueue } from "@react-spectrum/toast";
import { IOfficersRemoveDialogProps } from "./OfficersTable.interface";
import { Divider, Content, ButtonGroup, DialogTrigger, Button, Dialog, Heading, Header, ListBox, Text } from "@adobe/react-spectrum";
import Delete from "@spectrum-icons/workflow/Delete";
import { Item } from "react-stately";

export default function OfficersRemoveDialog({ activeDelete, selectedRows, setSelectedRows, officersData} : IOfficersRemoveDialogProps) {
    let onRowDelete = async (user_id: string) => {
        let formData = {
            "officer_id": user_id
        };
        let url = "/api/delete_officer";
        await fetch(url, {
            headers: { 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin':'*',
                ...(localStorage.getItem('token') ? { authorization: `${localStorage.getItem('token')}` } : {}) 
            },
            body: JSON.stringify(formData),
            method: "DELETE"
        }).then(res =>{
            if (res.ok) {
                ToastQueue.positive("Officer deleted successfully.", {timeout: 3500})
            } else {
                if (res.status === 500) throw new Error('Error 500, Internal Server Error')
                if (res.status === 403) throw new Error('Error 401, Unauthorized')
                throw new Error("See Console for Details.")
            }
        }).catch((error) => {
            ToastQueue.negative(`Failed to delete Officer. ${error}`, {timeout: 3500})
        })
    };

    let onPressDelete = (close: any) => {
        onRowDelete(Array.from(selectedRows)[0])
            .then(() => {
                officersData.reload(); 
                setSelectedRows(new Set());
                close();
            });
    }
    
    return (
        <DialogTrigger>
            <Button variant="negative" style="fill" isDisabled={!activeDelete}>
                <Delete />
                <Text>Remove</Text>
            </Button>

            {(close) => (
                <Dialog>
                    <Heading>Remove Officer?</Heading>
                    <Divider />
                    <Content>
                        <Header>
                            Are you sure you want to remove the selected Officer?
                        </Header>
                        <ListBox width="size-6000" aria-label="Events to be deleted">
                            {Array.from(selectedRows).map((id) => <Item key={id}>{id}</Item>)}
                        </ListBox>
                    </Content>
                    <ButtonGroup>
                        <Button variant="secondary" onPress={close}>Cancel</Button>
                        <Button variant="negative" onPress={() => onPressDelete(close)}>Confirm</Button>
                    </ButtonGroup>
                </Dialog>
            )}
        </DialogTrigger>
    )
}