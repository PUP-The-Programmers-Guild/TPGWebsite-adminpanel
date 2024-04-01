import { View, IllustratedMessage, Content, Flex, Heading, Button, Image, Text, LabeledValue} from "@adobe/react-spectrum";
import Upload from "@spectrum-icons/illustrations/Upload";
import { FileTrigger } from "react-aria-components";
import { onImageDrop, onImageSelect } from "./EventsAddFormFunctions";
import { IUploadImageData } from "./EventsTable.interface";
import { DropZone } from "@react-spectrum/dropzone";

export function ImageDropField({ thisImageState, thisImageStateSetter } : { thisImageState: IUploadImageData, thisImageStateSetter: React.Dispatch<React.SetStateAction<IUploadImageData>>}) {
    return (
        <View flex="col">
                <LabeledValue label="Event Image" value=""/>
                <DropZone
                    isFilled={!!thisImageState.url}
                    onDrop={(e) => onImageDrop(e, thisImageStateSetter)}
                    maxWidth="size-6000"
                    getDropOperation={(types) =>
                        (types.has('image/png') || types.has('image/jpeg') || types.has('image/webp'))
                            ? 'copy'
                            : 'cancel'}
                >
                    {
                        thisImageState.url 
                        ? 
                            <Image src={thisImageState.url as string} alt={`uploadedImage`}/> 
                        :
                            <IllustratedMessage>
                                <Upload />
                                <Heading>Drag and drop an image file</Heading>
                                <Content>
                                    Or <br /> <br/>
                                    <FileTrigger
                                        onSelect={(e) => onImageSelect(e, thisImageStateSetter)}
                                        acceptedFileTypes={["image/png", "image/jpeg", "image/webp"]}
                                    >
                                        <Button variant="secondary">Select files manually</Button>
                                    </FileTrigger>
                                    <br/> <br/> Preferred Image Size: 262px (width),  434px (height)
                                </Content>
                            </IllustratedMessage>
                    }
                </DropZone>
                { thisImageState.url ?
                    <Flex flex="row" alignContent={"center"} gap="size-75" marginTop="size-125">
                        <FileTrigger
                            onSelect={(e) => onImageSelect(e, thisImageStateSetter)}
                        >
                            <Button variant="secondary">Select another file</Button>
                        </FileTrigger>
                    </Flex>
                    : <></>
                }
        </View>
    )
}