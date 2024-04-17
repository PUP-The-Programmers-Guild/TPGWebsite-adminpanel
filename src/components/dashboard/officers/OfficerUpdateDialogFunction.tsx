import { ToastQueue } from "@react-spectrum/toast";
import { IOfficerDataProps } from "./OfficersTable.interface";
import type { TOfficerDataFields } from "./OfficersTable.interface";
import { IUploadImageData } from "../shared/FileUploadFunctions";

export const onOfficerRowUpdate = async (selectedRowInfo: IOfficerDataProps, updatedRowInfo: IOfficerDataProps, updatedImage: IUploadImageData) : Promise<boolean> => {
    const payload = { ...updatedRowInfo };
        payload["officer_id"] = payload["user_id"];
        delete payload["user_id"];
    for (const key in payload) {
        if (selectedRowInfo[key as TOfficerDataFields] === payload[key as TOfficerDataFields] && key !== "user_id") {
            delete payload[key as TOfficerDataFields];
        }
    }

    if (updatedImage.base64String === null && updatedImage.imageType === null) {
        delete payload["image_url"];
    } else {
        payload["image_url"] = updatedImage.base64String as string;
        payload["image_type"] = updatedImage.imageType as string;
    }

    let formData = payload;
    let url = "/api/update_officer";
    let isSuccess = false;

    if (Object.keys(formData).length === 1 && Object.keys(formData)[0] === "user_id") {
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
            ToastQueue.positive("Officer updated successfully.", {timeout: 3500})
            isSuccess = true;
        } else {
            if (res.status === 500) throw new Error('Error 500, Internal Server Error')
            if (res.status === 403) throw new Error('Error 401, Unauthorized')
            throw new Error("See Console for Details.")
        }
    }).catch((error) => {
        ToastQueue.negative(`Failed to update Officer. ${error}`, {timeout: 3500})
        isSuccess = false;
    });

    return isSuccess;
};
