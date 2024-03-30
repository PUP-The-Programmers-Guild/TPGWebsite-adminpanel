import {Button, ButtonGroup, Form, TextField} from "@adobe/react-spectrum";
import { ToastQueue } from "@react-spectrum/toast";
import { useRouter } from "next/router";

interface ILoginFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginForm(props: ILoginFormProps) {
    const router = useRouter()
    let onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        let url = `/api/login`
        fetch(url, {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
            body: JSON.stringify(formData),
            method: "POST" 
        }).then(res =>{
            if (res.ok) {
                localStorage.setItem('token', res.headers.get('Authorization')?.replace("Bearer ", "") || '');
                ToastQueue.positive("Logged in successfully.", {timeout: 2500})
                router.push('/dashboard/events')
            } else {
                if (res.status === 404) throw new Error('Error 404, Not Found')
                if (res.status === 500) throw new Error('Error 500, Internal Server Error')
                throw new Error("See Console for Details")
            }
        }).catch(error => {
            ToastQueue.negative(`Failed to log in. ${error}`, {timeout: 2500})
            //console.error(error)
            //console.log(url)
            //console.log(formData)
        })
    };
    return (
        <>
            <Form onSubmit={onSubmit} validationBehavior="native" width="size-10">
                <TextField name="username" label= "Username" type="text" isRequired/>
                <TextField name="password" label= "Password" type="password" />
                <Button type="submit"variant="primary">Log-in</Button>
            </Form>
        </>
    )
}