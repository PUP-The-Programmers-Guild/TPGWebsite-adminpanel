import type {FileDropItem} from 'react-aria';
import { ToastQueue } from "@react-spectrum/toast";
import type { TImageSetter } from "./EventsTable.interface";

const imageToBase64 = (file: File) : Promise<String> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}

export const imageFilePreprocessing = async (thisDroppedImage: File, setImageData: TImageSetter) => {
    if (thisDroppedImage.type.match('image.*')) {
        const fileName = thisDroppedImage.name;
        await imageToBase64(thisDroppedImage)
        .then((base64) => {
            if (base64 !== null) {
                const regex = /^.+?(;base64),/
                const thisImageBase64 = base64.replace(regex, "");
                const thisImageFileType = thisDroppedImage.type.split("/")[1];
                if (thisImageFileType) {
                    setImageData({
                        url: base64,
                        base64String: thisImageBase64,
                        imageType: thisImageFileType
                    })
                } else {
                    throw new Error("Could not determine image type. Please Try Again.");
                }
            }})
        .catch((error) => {
            ToastQueue.negative(`Failed to upload image. ${error}`, {timeout: 3500})
        });
    } else {
        ToastQueue.negative("Invalid file type. Please upload a valid image file.", {timeout: 3500})
    }
}

export let onImageDrop = (e : any, stateSetter: TImageSetter) => {
    let files = e.items.filter((file : any) =>
        file.kind === 'file'
    ) as FileDropItem[];
    if (files.length > 0) {
        files[0].getFile().then((file) => imageFilePreprocessing(file, stateSetter));
    }
}

export let onImageSelect = async (e: FileList | null,  stateSetter: TImageSetter) => {
    if (e) {
        const image = Array.from(e)[0];
        imageFilePreprocessing(image, stateSetter);
    }
}

export const onEventAddFormSubmit = (e: React.FormEvent<HTMLFormElement>, routeSuccessCallback: () => void, imageUrl: String | null, imageType: String | null, selectedEventTypes: string[]) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget)
    if (imageUrl === null || imageType === null) {
        ToastQueue.negative("Please upload an image for the event.", {timeout: 3500})
    } else {
        formData.set("image", imageUrl as string);
        formData.set("image_type", imageType as string);
        formData.set("event_type", JSON.stringify(selectedEventTypes));
        let formDataJson = Object.fromEntries(formData.entries());
        let url = `/api/create_event`
        console.log(formDataJson)
        fetch(url, {
            headers: { 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin':'*', 
                ...(localStorage.getItem('token') ? { authorization: `${localStorage.getItem('token')}` } : {}) 
            },
            body: JSON.stringify(formDataJson),
            method: "POST" 
        }).then(res =>{
            if (res.ok) {
                ToastQueue.positive("Event added successfully.", {timeout: 3500})
                routeSuccessCallback();
            } else {
                if (res.status === 500) throw new Error(`500, ${res.statusText}`)
                if (res.status === 403) throw new Error(`403, ${res.statusText}`)
                throw new Error("uncatched error")
            }
        }).catch(error => {
            ToastQueue.negative(`Failed to add Event. ${error}`, {timeout: 3500})
        })
    }
}