import { Breadcrumbs, Button, ButtonGroup, Form, Item, Text, TextArea, TextField, View } from "@adobe/react-spectrum";
import { ToastQueue } from "@react-spectrum/toast";

export default function FaqsAddForm() {

    let onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        let url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/create_faq`
        fetch(url, {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
            body: JSON.stringify(formData),
            method: "POST" 
        }).then(res =>{
            if (res.ok) {
                ToastQueue.positive("FAQ added successfully.", {timeout: 2500})
            } else {
                console.log("not ok")
                if (res.status === 404) throw new Error('404, Not Found')
                if (res.status === 500) throw new Error('500, Internal Server Error')
                throw new Error("uncatched error")
            }
        }).catch(error => {
            ToastQueue.negative(`Failed to add FAQ. See console for details`, {timeout: 2500})
            console.error(error)
            console.log(url)
            console.log(formData)
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
                <TextField name="title" label="FAQ Title" isRequired minLength={10}/>
                <TextArea name="description" label="FAQ Description" isRequired minLength={10}/>
                <ButtonGroup>
                    <Button type="submit" variant="primary" >Submit</Button>
                    <Button type="reset" variant="secondary" >Reset</Button>
                </ButtonGroup>
            </Form>
        </View>
    )
}