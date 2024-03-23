import {Button, ButtonGroup, Form, TextField} from "@adobe/react-spectrum";

interface ILoginFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginForm(props: ILoginFormProps) {
    return (
        <>
            <Form onSubmit={props.onSubmit} validationBehavior="native" width="size-10">
                <TextField name="email" label="E-mail Address" type="email" isRequired/>
                <TextField name="password" label= "Password" type="password" />
                <Button type="submit"variant="primary">Log-in</Button>
            </Form>
        </>
    )
}