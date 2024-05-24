import {createBrowserRouter} from "react-router-dom";

const routes = [
    {
        element: <h1>Store</h1>,
        children: [
            {
                path: "/",
                element: <div>my store</div>,
            },
            {
                path: "/shared",
                element: <div>shared</div>,
            },
            {
                path: "/statistic",
                element: <div>statistic</div>,
            },
            {
                path: "/bin",
                element: <div>bin</div>,
            },
        ]
    },
]

export const router = createBrowserRouter(routes);

export default routes;