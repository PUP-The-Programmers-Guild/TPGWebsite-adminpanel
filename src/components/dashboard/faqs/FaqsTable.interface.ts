import { AsyncListData } from "@adobe/react-spectrum";

export interface IFAQsTableRowProps {
    id: string;
    title: string;
    description: string;
}

export interface IFaqsUpdateDialogProps {
    activeEdit: boolean;
    selectedRowInfo: IFAQsTableRowProps;
    setSelectedRows: (selectedRows: Set<string>) => void;
    faqsData: AsyncListData<IFAQsTableRowProps>
}
export interface IFaqsRemoveDialogProps {
    activeDelete: boolean;
    selectedRows: Set<string>;
    setSelectedRows: (selectedRows: Set<string>) => void;
    faqsData: AsyncListData<IFAQsTableRowProps>
}