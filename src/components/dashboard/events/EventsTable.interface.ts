import { AsyncListData } from "@adobe/react-spectrum";
import { Dispatch, SetStateAction } from 'react';

export interface IEventsTableRowProps {
    id: string;
    title: string;
    start_date: string;
    end_date: string;
    description: string;
    event_type: string;
    image_url: string;
    facebook_url: string;
    date_created: string;
    date_updated: string;
}

export interface IEventsDataProps {
    id: string;
    title: string;
    start_date: string;
    end_date: string;
    description: string;
    event_type: string;
    image_url?: string;
    image_type?: string;
    facebook_url: string;
    date_created: string;
    date_updated: string;
}

export interface IEventsUpdateDialogProps {
    activeEdit: boolean;
    selectedRowInfo: IEventsTableRowProps;
    setSelectedRows: (selectedRows: Set<string>) => void;
    eventsData: AsyncListData<IEventsTableRowProps>
}

export interface IEventsRemoveDialogProps {
    activeDelete: boolean;
    selectedRows: Set<string>;
    setSelectedRows: (selectedRows: Set<string>) => void;
    eventsData: AsyncListData<IEventsTableRowProps>
}

export interface IUploadImageData {
    url: String | null;
    base64String: String | null;
    imageType: String | null;
}

export type TImageSetter =  Dispatch<SetStateAction<IUploadImageData>> | 
                            ((state: IUploadImageData) => Dispatch<SetStateAction<IUploadImageData>>);
