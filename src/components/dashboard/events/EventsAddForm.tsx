
import { Breadcrumbs, Button, ButtonGroup, Checkbox, CheckboxGroup, DatePicker, 
        Form, Item, Picker, TextArea, TextField, View } from "@adobe/react-spectrum";
import { useState } from "react";
import React from "react";
import { onEventAddFormSubmit } from "./EventsAddFormFunctions";
import { IUploadImageData } from "./EventsTable.interface";
import { ImageDropField } from "./EventImageDropField";
import EventBadge from "./EventBadge";


interface IEventsAddForm {
    routeSuccessCallback: () => void;
}

export default function EventsAddForm({ routeSuccessCallback }: IEventsAddForm) {
    const EVENT_TYPES = ["FLAGSHIP", "WEBINAR", "EXTERNAL", "PODCAST", "TPG-EXCLUSIVE"];

    const [imageData, setImageData] = useState<IUploadImageData>({
        url: null,
        base64String: null,
        imageType: null
    });

    const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
    return (
        <View gridArea="content" overflow="auto">
            <View borderYWidth="thin" borderColor="dark" padding="size-40" >
                <Breadcrumbs>
                    <Item>Dashboard</Item>
                    <Item href="/dashboard/events">Events</Item>
                    <Item href="/dashboard/events/add">Add Form</Item>
                </Breadcrumbs>
            </View>
            <Form 
                onSubmit={(e) => onEventAddFormSubmit(e, routeSuccessCallback, imageData.base64String, imageData.imageType, selectedEventTypes)} 
                validationBehavior="native" 
                maxWidth={675} 
                marginX="size-130"
            >
                <ImageDropField thisImageState={imageData} thisImageStateSetter={setImageData}/>
                <TextField name="title" label="Event Title" isRequired minLength={10} maxLength={100}/>
                <DatePicker name="start_date" label="Start Date" isRequired />
                <DatePicker name="end_date" label="End Date" isRequired />
                <TextArea name="description" label="Event Description" isRequired minLength={10}/>
                <CheckboxGroup
                    label="Event Type"
                    isEmphasized
                    value={selectedEventTypes}
                    onChange={(newValues : string[]) => setSelectedEventTypes(newValues)}
                >
                    {
                        EVENT_TYPES.map((type) => 
                        <Checkbox value={type} key={type}>
                            <EventBadge key={type} eventType={type}/>
                        </Checkbox>
                        )
                    }
                </CheckboxGroup>
                
                <TextField name="facebook_url" label="Facebook URL" isRequired type="url"/>
                <ButtonGroup>
                    <Button type="submit" variant="primary" >Submit</Button>
                    <Button type="reset" variant="secondary" >Reset</Button>
                </ButtonGroup>
            </Form>
        </View>
    )
}