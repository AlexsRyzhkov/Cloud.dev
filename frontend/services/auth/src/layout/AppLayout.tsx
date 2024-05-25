import {Outlet} from "react-router-dom";
import './app.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import {createContext, useContext, useRef} from "react";
import {Toast} from "primereact/toast";

const ToastContext = createContext(null)

const useToastContext = () => useContext(ToastContext)

function AppLayout(){
    const toast = useRef(null);

    return (
        <ToastContext.Provider value={{toast}}>
            <div className="flex h-screen w-screen justify-center items-center">
                <Toast ref={toast}/>
                <Outlet/>
            </div>
        </ToastContext.Provider>
    )
}

export {AppLayout,useToastContext}