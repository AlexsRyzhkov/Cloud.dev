import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App/App";
// @ts-ignore
import storeRouter from 'store/Router';
// @ts-ignore
import authRouter from 'auth/Router';

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            ...storeRouter,
            ...authRouter,
        ]
    },
]);
