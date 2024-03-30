import { Breadcrumbs, Button, ButtonGroup, Form, Heading, Item, TextArea, TextField, View } from "@adobe/react-spectrum";
import { ToastQueue } from "@react-spectrum/toast";

interface IFaqsAddForm {
    routeSuccessCallback: () => void;
}

export default function FaqsAddForm({ routeSuccessCallback }: IFaqsAddForm) {

    let onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        let url = `/api/create_faq`
        fetch(url, {
            headers: { 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin':'*', 
                ...(localStorage.getItem('token') ? { authorization: `${localStorage.getItem('token')}` } : {}) 
            },
            body: JSON.stringify(formData),
            method: "POST" 
        }).then(res =>{
            if (res.ok) {
                ToastQueue.positive("FAQ added successfully.", {timeout: 3500})
                routeSuccessCallback();
            } else {
                if (res.status === 500) throw new Error('500, Internal Server Error')
                if (res.status === 403) throw new Error('401, Unauthorized')
                throw new Error("uncatched error")
            }
        }).catch(error => {
            ToastQueue.negative(`Failed to add FAQ. ${error}`, {timeout: 3500})
        })
    }

    return (
        <View gridArea="content" overflow="hidden">
            <View borderYWidth="thin" borderColor="dark" padding="size-40" >
                <Breadcrumbs>
                    <Item>Dashboard</Item>
                    <Item href="/dashboard/faqs">FAQs</Item>
                    <Item href="/dashboard/faqs/add">Add Form</Item>
                </Breadcrumbs>
            </View>
            <Form onSubmit={onSubmit} validationBehavior="native" maxWidth={675} marginX="size-130">
                <TextField name="title" label="FAQ Title" isRequired minLength={10} maxLength={35}/>
                <TextArea name="description" label="FAQ Description" isRequired minLength={10}/>
                <ButtonGroup>
                    <Button type="submit" variant="primary" >Submit</Button>
                    <Button type="reset" variant="secondary" >Reset</Button>
                </ButtonGroup>
            </Form>
        </View>
    )
}