import { ToastQueue } from "@react-spectrum/toast";

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