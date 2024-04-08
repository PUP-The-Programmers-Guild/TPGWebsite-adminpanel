import { DialogTrigger, Button, Dialog, Heading, Divider, Content, Form, Text, TextField, ButtonGroup, Checkbox, CheckboxGroup, DatePicker, TextArea } from "@adobe/react-spectrum";
import Edit  from "@spectrum-icons/workflow/Edit";
import { useState } from "react";
import { IEventsDataProps, IEventsUpdateDialogProps, IUploadImageData } from "./EventsTable.interface";
import { onEventRowUpdate } from "./EventUpdatedialogFunctions";
import { ImageDropField } from "./EventImageDropField";
import { CalendarDate, parseDate, parseZonedDateTime } from "@internationalized/date";
import EventBadge from "./EventBadge";


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

    const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([""]);

    let onPressUpdate = (close: any) => {
        onEventRowUpdate(selectedRowInfo, updatedRowInfo, imageData, selectedEventTypes)
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
                                maxLength={100}
                                value={updatedRowInfo.title}
                                onChange={(value: string) => setUpdatedRowInfo((prevState) => ({...prevState, "title": value}))}
                            />
                            <DatePicker 
                                name="start_date" 
                                label="Start Date" 
                                isRequired 
                                value={updatedRowInfo.start_date ? parseDate(updatedRowInfo.start_date) : null}
                                onChange={(value: CalendarDate) => setUpdatedRowInfo((prevState) => ({...prevState, "start_date": value.toString()}))}
                            />
                            <DatePicker 
                                name="end_date" 
                                label="End Date" 
                                isRequired 
                                value={updatedRowInfo.end_date ? parseDate(updatedRowInfo.end_date) : null}
                                onChange={(value: CalendarDate) => setUpdatedRowInfo((prevState) => ({...prevState, "end_date": value.toString()}))}
                            />
                            <TextArea 
                                name="description" 
                                label="Event Description" 
                                isRequired 
                                minLength={10} 
                                value={updatedRowInfo.description}
                                onChange={(value: string) => setUpdatedRowInfo((prevState) => ({...prevState, "description": value}))}
                            />
                            <CheckboxGroup
                                label="Event Type"
                                isEmphasized
                                value={selectedEventTypes}
                                onChange={setSelectedEventTypes}
                            >
                                {
                                    EVENT_TYPES.map((type) => 
                                        <Checkbox value={type} key={type}>
                                            <EventBadge key={type} eventType={type}/>
                                        </Checkbox>
                                    )
                                }
                            </CheckboxGroup>
                            
                            <TextField 
                                name="facebook_url"
                                label="Facebook URL" 
                                isRequired type="url" 
                                value={updatedRowInfo.facebook_url}
                                onChange={(value: string) => setUpdatedRowInfo((prevState) => ({...prevState, "facebook_url": value}))}
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