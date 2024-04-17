import { Breadcrumbs, Item, View, Form, Button, ButtonGroup, ComboBox, TextField } from "@adobe/react-spectrum";
import { useState } from "react";
import { onOfficerAddFormSubmit } from "./OfficerAddFormFunctions";
import { OFFICE_TYPES } from "./Officers.constants";
import { OfficersImageDropField } from "./OfficersImageDropField";
import { IUploadImageData } from "../shared/FileUploadFunctions";

interface IOfficersAddForm {
    routeSuccessCallback: () => void;
}

export default function EventsAddForm({ routeSuccessCallback }: IOfficersAddForm) {
    const [imageData, setImageData] = useState<IUploadImageData>({
        url: null,
        base64String: null,
        imageType: null
    });

    return (
        <View gridArea="content" overflow="auto">
            <View borderYWidth="thin" borderColor="dark" padding="size-40" >
                <Breadcrumbs>
                    <Item>Dashboard</Item>
                    <Item href="/dashboard/officers">Officers</Item>
                    <Item href="/dashboard/officers/add">Add Form</Item>
                </Breadcrumbs>
            </View>
            <Form
                onSubmit={(e) => onOfficerAddFormSubmit(
                                    e, 
                                    routeSuccessCallback, 
                                    imageData.base64String, 
                                    imageData.imageType
                                )} 
                validationBehavior="native" 
                maxWidth={675} 
                marginX="size-130"
            >
                <OfficersImageDropField 
                    thisImageState={imageData} 
                    thisImageStateSetter={setImageData}
                />
                <TextField 
                    name="name" 
                    label="Officer Name" 
                    isRequired 
                    minLength={10}
                    maxLength={40}
                />
                <ComboBox 
                    name="office" 
                    label="Office Designation" 
                    isRequired 
                    formValue="text"
                >
                    {OFFICE_TYPES.map((office) => <Item key={office}>{office}</Item>)}
                </ComboBox>
                <TextField 
                    name="position" 
                    label="Officer Position" 
                    isRequired 
                    minLength={5}
                    maxLength={40}
                />
                <ButtonGroup>
                    <Button type="submit" variant="primary" >Submit</Button>
                    <Button type="reset" variant="secondary" >Reset</Button>
                </ButtonGroup>
            </Form>
        </View>
    )
}