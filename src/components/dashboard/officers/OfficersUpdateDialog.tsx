import { useState } from "react";
import { IOfficerDataProps, IOfficersUpdateDialogProps } from "./OfficersTable.interface";
import { IUploadImageData } from "../shared/FileUploadFunctions";
import { onOfficerRowUpdate } from "./OfficerUpdateDialogFunction";
import { Button, ButtonGroup, ComboBox, Content, Dialog, DialogTrigger, Divider, Form, Heading, Item, Text, TextArea, TextField } from "@adobe/react-spectrum";
import Edit from "@spectrum-icons/workflow/Edit";
import { ImageDropField } from "../events/EventImageDropField";
import { OFFICE_TYPES } from "./Officers.constants";

export default function OfficersUpdateDialog({ activeEdit, selectedRowInfo, officersData, setSelectedRows } : IOfficersUpdateDialogProps) {
    const [updatedRowInfo, setUpdatedRowInfo] = useState<IOfficerDataProps>({
        office: "",
        index: null,
        user_id: "",
        role: "",
        image_url: "",
        name: "",
        position: ""
    });

    const [imageData, setImageData] = useState<IUploadImageData>({
        url: null,
        base64String: null,
        imageType: null
    });

    let onPressUpdate = (close: any) => {
        onOfficerRowUpdate(selectedRowInfo, updatedRowInfo, imageData)
            .then((isSuccess: boolean) => {
                if (isSuccess) {
                    officersData.reload();
                    setSelectedRows(new Set());
                    close();
                }
            });
    };

    return (
        <DialogTrigger>
            <Button variant="secondary" style="fill" isDisabled={!activeEdit} 
                onPress={() => {
                    setUpdatedRowInfo(selectedRowInfo)
                    setImageData({url: selectedRowInfo.image_url, base64String: null, imageType: null});
                }}>
                <Edit />
                <Text>Edit</Text>
            </Button>

            {(close) => (
                <Dialog>
                    <Heading>Edit Event</Heading>
                    <Divider />
                    <Content>
                        <Form maxWidth="size-6000">
                            <ImageDropField thisImageState={imageData} thisImageStateSetter={setImageData}/>
                            <TextField 
                                name="name" 
                                label="Officer Name" 
                                isRequired minLength={10} 
                                maxLength={100}
                                value={updatedRowInfo.name}
                                onChange={(value: string) => setUpdatedRowInfo((prevState) => ({...prevState, "name": value}))}
                            />
                            <ComboBox 
                                name="office" 
                                label="Office Designation" 
                                isRequired 
                                formValue="text"
                                inputValue={updatedRowInfo.office}
                                onInputChange={(value: string) => setUpdatedRowInfo((prevState) => ({...prevState, "office": value}))}
                            >
                                {OFFICE_TYPES.map((office) => <Item key={office}>{office}</Item>)}
                            </ComboBox>
                            <TextArea 
                                name="position" 
                                label="Officer Position" 
                                isRequired 
                                minLength={10} 
                                value={updatedRowInfo.position}
                                onChange={(value: string) => setUpdatedRowInfo((prevState) => ({...prevState, "position": value}))}
                            />
                            <TextField 
                                label="Role" 
                                value={String(updatedRowInfo.role)} 
                                isReadOnly 
                                isDisabled
                            />
                            <TextField 
                                label="Index" 
                                value={String(updatedRowInfo.index)} 
                                isReadOnly 
                                isDisabled
                            />
                            <TextField 
                                label="User ID" 
                                value={String(updatedRowInfo.user_id)} 
                                isReadOnly 
                                isDisabled
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