import { AsyncListData } from "@adobe/react-spectrum";

export type TOfficerDataFields = "office" | "index" | "user_id" | "role" | "image_url" | "name" | "position";
export type TOfficeType = "President" | "Internal Affairs" | "External Affairs" | "Records" | "Finance" | "Audit" | "Membership and Student Affairs" | "Documentation" | "Research Extension" | "Research and Assessment" | "Programmer" | "Media Production" | "Public Relations" | "Social Media" | "Logistics";

export interface IOfficerTableRowProps {
    office: string;
    index: number | null;
    user_id: string;
    role: string;
    image_url: string;
    name: string;
    position: string;
}

export interface IOffice {
    office: string;
    officers: IOfficerTableRowProps[];
}

export interface IOfficersDataResponse {
    message: string;
    officers: IOffice[];
}

export interface IOfficerDataProps {
    officer_id?: string;
    office?: string;
    index?: number | null;
    user_id?: string;
    role?: string;
    image_url?: string;
    image_type?: string;
    name?: string;
    position?: string;
}

export interface IOfficersUpdateDialogProps {
    activeEdit: boolean;
    selectedRowInfo: IOfficerTableRowProps;
    setSelectedRows: (selectedRows: Set<string>) => void;
    officersData: AsyncListData<IOfficerTableRowProps>
}

export interface IOfficersRemoveDialogProps {
    activeDelete: boolean;
    selectedRows: Set<string>;
    setSelectedRows: (selectedRows: Set<string>) => void;
    officersData: AsyncListData<IOfficerTableRowProps>
}
