import { ToastQueue } from "@react-spectrum/toast";
import { IEventsDataProps, IUploadImageData} from "./EventsTable.interface";
import type { TEventDataFields } from "./EventsTable.interface";

export const onEventRowUpdate = async (selectedRowInfo: IEventsDataProps, updatedRowInfo: IEventsDataProps, updatedImage: IUploadImageData, updatedEventTags: string[]) : Promise<boolean> => {
    const payload = { ...updatedRowInfo };
    // placeholder solution: need to modify update_event route to accept id instead of event_id
        payload["event_id"] = payload["id"];
        delete payload["id"];
    payload["event_type"] = JSON.stringify(updatedEventTags);
    for (const key in payload) {
        if (selectedRowInfo[key as TEventDataFields] === payload[key as TEventDataFields] && key !== "id") {
            delete payload[key as TEventDataFields];
        }
    }
    if (updatedImage.base64String === null && updatedImage.imageType === null) {
        delete payload["image_url"];
    } else {
        payload["image_url"] = updatedImage.base64String as string;
        payload["image_type"] = updatedImage.imageType as string;
    }
    let formData = payload;
    let url = "/api/update_event";
    let isSuccess = false;
    if (Object.keys(formData).length === 1 && Object.keys(formData)[0] === "id") {
        ToastQueue.neutral("No changes detected. Please make changes to update.", {timeout: 3500})
        return isSuccess;
    }
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
            ToastQueue.positive("Event updated successfully.", {timeout: 3500})
            isSuccess = true;
        } else {
            if (res.status === 500) throw new Error('Error 500, Internal Server Error')
            if (res.status === 403) throw new Error('Error 401, Unauthorized')
            throw new Error("See Console for Details.")
        }
    }).catch((error) => {
        ToastQueue.negative(`Failed to update Event. ${error}`, {timeout: 3500})
        isSuccess = false;
    });
    return isSuccess;
};
