import { Dispatch, SetStateAction } from "react";
import { ToastQueue } from "@react-spectrum/toast";
import type {FileDropItem} from 'react-aria';

export type TImageSetter =  Dispatch<SetStateAction<IUploadImageData>> | 
                            ((state: IUploadImageData) => Dispatch<SetStateAction<IUploadImageData>>);

export interface IUploadImageData {
    url: String | null;
    base64String: String | null;
    imageType: String | null;
}

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