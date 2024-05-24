import {Outlet} from "react-router-dom";
import './app.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";

function AppLayout(){

    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <Outlet/>
        </div>
    )
}

export {AppLayout}