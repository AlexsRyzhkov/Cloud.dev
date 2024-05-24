import {createBrowserRouter} from "react-router-dom";
import {LoginPage} from "@/pages/login/LoginPage";
import {RegisterPage} from "@/pages/register/RegisterPage";
import {AppLayout} from "@/layout/AppLayout";

const routes = [
    {
        element: <AppLayout/>,
        children: [
            {
                path: "/auth/login",
                element: <LoginPage/>,
            },
            {
                path: "/auth/register",
                element: <RegisterPage/>,
            },
        ],
    },
]

export const router = createBrowserRouter(routes);

export default routes;