import { DialogTrigger, Button, Dialog, Heading, Divider, Content, Form, Text, TextField, ButtonGroup, Checkbox, CheckboxGroup, DatePicker, TextArea } from "@adobe/react-spectrum";
import { ToastQueue } from "@react-spectrum/toast";
import Edit  from "@spectrum-icons/workflow/Edit";
import { useState } from "react";
import { IEventsDataProps, IEventsTableRowProps, IEventsUpdateDialogProps, IUploadImageData } from "./EventsTable.interface";
import { onEventRowUpdate } from "./EventUpdatedialogFunctions";
import { ImageDropField } from "./EventImageDropField";
import { parseDate, parseZonedDateTime } from "@internationalized/date";


export default function EventsUpdateDialog({ activeEdit, selectedRowInfo, eventsData, setSelectedRows} : IEventsUpdateDialogProps) {
    const EVENT_TYPES = ["FLAGSHIP", "WEBINAR", "EXTERNAL", "PODCAST", "TPG-EXCLUSIVE"];

    const [updatedRowInfo, setUpdatedRowInfo] = useState<IEventsDataProps>(                {
        id: "",
        title: "",
        start_date: "",
        end_date: "",
        description: "",
        event_type: "",
        facebook_url: "",
        date_created: "",
        date_updated: ""
    });
    
    const [imageData, setImageData] = useState<IUploadImageData>({
        url: null,
        base64String: null,
        imageType: null
    });

    const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);

    let onPressUpdate = (close: any) => {
        onEventRowUpdate(updatedRowInfo, imageData)
            .then((isSuccess: boolean) => {
                if (isSuccess) {
                    eventsData.reload();
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
                    setSelectedEventTypes(JSON.parse(selectedRowInfo.event_type) as string[])
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
                            <TextField 
                                label="FAQ ID" 
                                value={String(updatedRowInfo.id)} 
                                isReadOnly 
                                isDisabled
                            />
                            <ImageDropField thisImageState={imageData} thisImageStateSetter={setImageData}/>
                            <TextField 
                                name="title" 
                                label="Event Title" 
                                isRequired minLength={10} 
                                maxLength={35}
                                value={updatedRowInfo.title}
                            />
                            <DatePicker name="start_date" label="Start Date" isRequired /* value={parseDateTime(updatedRowInfo.start_date)} *//>
                            <DatePicker name="end_date" label="End Date" isRequired /* value={parseDateTime(updatedRowInfo.end_date)} *//>
                            <TextArea name="description" label="Event Description" isRequired minLength={10} value={updatedRowInfo.description}/>
                            <CheckboxGroup
                                label="Event Type"
                                isEmphasized
                                value={selectedEventTypes}
                                onChange={(newValues : string[]) => setSelectedEventTypes(newValues)}
                            >
                                {EVENT_TYPES.map((type) => <Checkbox value={type} key={type}>{type}</Checkbox>)}
                            </CheckboxGroup>
                            
                            <TextField name="facebook_url" label="Facebook URL" isRequired type="url" value={updatedRowInfo.facebook_url}/>
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