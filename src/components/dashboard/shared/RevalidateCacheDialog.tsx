import { Divider, Content, ButtonGroup, DialogTrigger, Dialog, Heading, Button, Text } from "@adobe/react-spectrum";
import { ToastQueue } from "@react-spectrum/toast";
import { useState } from "react";
import DataRefresh from "@spectrum-icons/workflow/DataRefresh";

type TCacheDatatypes = "events" | "faqs" | "alumni" | "officers";

interface IEventsRevalidateCacheDialogProps {
    dataType: TCacheDatatypes;
    isCacheDialogOpen: boolean;
    setIsCacheDialogOpen: (isOpen: boolean) => void;
}

export default function RevalidateCacheDialog({ dataType, isCacheDialogOpen, setIsCacheDialogOpen } : IEventsRevalidateCacheDialogProps) {
    const [isPending, setIsPending] = useState<boolean>(false);

    let onPressInvalidate = (setIsCacheDialogOpen: (isOpen: boolean) => void) => {
        setIsPending(true);
        onConfirmInvalidateCache(dataType)
        .then((isSuccess: boolean) => {
            setIsPending(false);
            if (isSuccess) {
                setIsCacheDialogOpen(false);
            }
        });
    }

    let onConfirmInvalidateCache = async (dataType:string) : Promise<boolean> => {
        const revalidationUrl = `${process.env.NEXT_PUBLIC_BFF_API_URL}/revalidate`;
        const requestBody = {
            "data": dataType,
            "secret" : process.env.NEXT_PUBLIC_REVALIDATION_SECRET
        }
        let isSuccess = false;
        await fetch(revalidationUrl, {
            method: "POST",
            body: JSON.stringify(requestBody),
        }).then((resultRes) => {
            if (resultRes.ok) {
                ToastQueue.positive(`${dataType} cache successfully invalidated.`, {timeout: 4500})
                isSuccess = true;
            } else {
                if (resultRes.status === 401) throw new Error("Unauthorized Secret Token.");
                if (resultRes.status === 422) throw new Error("Missing Required Fields.");
                if (resultRes.status === 405) throw new Error("Wrong HTTP Method.");
                if (resultRes.status === 500) throw new Error("Internal Server Error.");
                throw new Error(`Unknown Error. ${resultRes.status}`);
            }
        }).catch((error) => {
            ToastQueue.negative(`Failed to invalidate "${dataType}" cache. ${error}. Please Try Again.`, {timeout: 4500})
            console.error
        })
        return isSuccess;
    }
    
    return (
        <DialogTrigger
            isOpen={isCacheDialogOpen}
            onOpenChange={(isOpen) => setIsCacheDialogOpen(isOpen)}
        >
            <Button variant="secondary">
                <DataRefresh size="S" />
                <Text>Update Frontend Cache</Text>
            </Button>
                <Dialog>
                    <Heading>{`Update "${dataType}" Data Cache?`}</Heading>
                    <Divider />
                    <Content>
                        <Text>
                            This will update the cached data stored on the Frontend within Vercel&apos;s CDN. Continue?
                        </Text>
                    </Content>
                    <ButtonGroup>
                        <Button 
                            variant="secondary" 
                            isPending={isPending} 
                            onPress={() => setIsCacheDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="accent" 
                            isPending={isPending} 
                            onPress={() => onPressInvalidate(setIsCacheDialogOpen)}
                        >
                            <Text>
                                Confirm
                            </Text>
                        </Button>
                    </ButtonGroup>
                </Dialog>
        </DialogTrigger>
    )
}