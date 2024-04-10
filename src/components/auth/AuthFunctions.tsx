import { ToastQueue } from "@react-spectrum/toast";
import { NextRouter } from "next/router";

export async function checkAuth(router: NextRouter) {
    await fetch('/api/', {
        headers: { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin':'*', 
            ...(localStorage.getItem('token') ? { authorization: `${localStorage.getItem('token')}` } : {}) 
        },
        method: "GET"
    }).then((response) => {
        if (response.status === 403) {
            throw new Error("You are not authorized to view this page. Please login.")
        } else if (response.status === 500) {
            throw new Error("Server error on checking authorization. Please try again later.")
        }
    }).catch((error) => {
        ToastQueue.negative(`Error Accessing this page. ${error}`, {timeout: 4500});
        router.push('/');
    });
}