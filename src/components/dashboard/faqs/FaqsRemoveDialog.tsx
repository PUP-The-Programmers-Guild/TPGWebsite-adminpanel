import { Button, ButtonGroup, Content, Dialog, DialogTrigger, Divider, Flex, Header, Heading, Text } from "@adobe/react-spectrum";
import { ToastQueue } from "@react-spectrum/toast";
import Delete from "@spectrum-icons/workflow/Delete";
import { IFaqsRemoveDialogProps } from "./FaqsTable.interface";

export default function FaqsRemoveDialog({ activeDelete, selectedRows, setSelectedRows, faqsData } : IFaqsRemoveDialogProps) {
    
    let onRowDelete = async (ids: string[]) => {
        let formData = {
            ids: ids
        };
        let url = "/api/delete_faq";
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
                ToastQueue.positive("FAQ(s) deleted successfully.", {timeout: 3500})
            } else {
                if (res.status === 500) throw new Error('Error 500, Internal Server Error')
                if (res.status === 403) throw new Error('Error 401, Unauthorized')
                throw new Error("See Console for Details.")
            }
        }).catch((error) => {
            ToastQueue.negative(`Failed to delete FAQ(s). ${error}`, {timeout: 3500})
        })
    };

    // close: PressEvent?
    let onPressDelete = (close: any) => {
        onRowDelete(Array.from(selectedRows))
            .then(() => {
                faqsData.reload(); 
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
                        <Button variant="negative" onPress={() => onPressDelete(close)}>Confirm</Button>
                    </ButtonGroup>
                </Dialog>
            )}
        </DialogTrigger>
    )
}