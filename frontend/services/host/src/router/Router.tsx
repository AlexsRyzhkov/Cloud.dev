import {createBrowserRouter} from "react-router-dom";
// @ts-ignore
import storeRouter from 'store/Router';
// @ts-ignore
import authRouter from 'auth/Router';
import {AuthLayout} from "@/layout/AuthLayout";

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            ...storeRouter,
            ...authRouter,
        ]
    },
]);
