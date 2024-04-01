import { ToastQueue } from "@react-spectrum/toast";
import { IEventsDataProps, IUploadImageData} from "./EventsTable.interface";

export const onEventRowUpdate = async (updatedRowInfo: IEventsDataProps, updatedImage: IUploadImageData) : Promise<boolean> => {
    if (updatedImage.base64String && updatedImage.imageType) {
        updatedRowInfo["image_url"] = updatedImage.base64String as string;
        updatedRowInfo["image_type"] = updatedImage.imageType as string;
    }
    let formData = updatedRowInfo;
    let url = "/api/update_event";
    let isSuccess = false;
    console.log(formData);
/*     await fetch(url, {
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
    return isSuccess; */
};
