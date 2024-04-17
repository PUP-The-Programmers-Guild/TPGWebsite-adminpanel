import { ToastQueue } from "@react-spectrum/toast";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { checkAuth } from "./AuthFunctions";

export default function AuthProtectedWrapper({children} : {children: ReactNode}) {
    const authRouter = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('token')) {
                checkAuth(authRouter);
            } else {
                ToastQueue.negative("You are not authorized to view this page. Please login.", {timeout: 4500});
                authRouter.push('/');
            }
        } 
    }, [authRouter])

    return (
        <>
            {children}
        </>
    )
}