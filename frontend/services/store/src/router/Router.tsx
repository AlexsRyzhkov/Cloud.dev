import {createBrowserRouter} from "react-router-dom";
import {AppLayout} from "@/layout/AppLayout";
import {StatisticPage} from "@/pages/statistic/StatisticPage";
import {SharedPage} from "@/pages/shared/SharedPage";
import {MyStorePage} from "@/pages/my-store/MyStorePage";

const routes = [
    {
        element: <AppLayout/>,
        children: [
            {
                path: "/",
                element: <MyStorePage/>,
            },
            {
                path: "/:id",
                element: <MyStorePage/>,
            },
            {
                path: "/shared",
                element: <SharedPage/>,
            },
            {
                path: "/statistic",
                element: <StatisticPage/>,
            },
        ]
    },
]

export const router = createBrowserRouter(routes);

export default routes;