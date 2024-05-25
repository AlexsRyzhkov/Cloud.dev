import {Outlet} from "react-router-dom";
import {SideBar} from "@/components/sidebar/SideBar";
import './app.css'
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

const AppLayout = () => {

    return (
        <div className={'flex flex-row'}>
            <section className={'min-w-[250px] bg-[]'}>
                <SideBar/>
            </section>
            <section className={'grow w-full bg-[#F8FAFD] h-screen pt-[30px] px-[60px]'}>
                <Outlet/>
            </section>
        </div>

    )
}

export {AppLayout}