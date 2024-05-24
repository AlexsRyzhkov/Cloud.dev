import {createRoot} from "react-dom/client";
import { RouterProvider} from "react-router-dom";
import {router} from "@/router/Router";
import {PrimeReactProvider} from "primereact/api";

const root = document.getElementById('root')

if(!root) {
    throw new Error('root not found')
}

const container = createRoot(root)

container.render(
    <PrimeReactProvider>
        <RouterProvider router={router} />
    </PrimeReactProvider>
)