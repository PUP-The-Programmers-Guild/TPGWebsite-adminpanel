import { Badge } from "@adobe/react-spectrum";

interface IEventBadgeProps {
    key: string;
    eventType: string;
}

interface IEventTypes {
    [key: string]: string;
}

export default function EventBadge({ key, eventType }: IEventBadgeProps) {
    const EVENT_TYPE_COLOR : IEventTypes = {
        "FLAGSHIP" : "#99D44E", 
        "WEBINAR" : "#93C5FD",
        "EXTERNAL" : "#FDE047",
        "PODCAST" : "#EC4899",
        "TPG-EXCLUSIVE" : "#F97316"
    };
    return (
        <Badge 
            key={key} 
            variant="info"
            marginEnd="size-150" 
            UNSAFE_style={{backgroundColor: EVENT_TYPE_COLOR[eventType], color: "#313638", fontWeight: "500"}}
        >
            {eventType}
        </Badge>
    );
}