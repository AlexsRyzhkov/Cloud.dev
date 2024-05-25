import logoUrl from '@/assert/logo.png'
import {Link, useLocation, useNavigate} from "react-router-dom";
import classNames from "classnames";
import {useAuthContext} from "host/src/layout/AuthLayout";

const linksClassName = '' +
    'text-[16px] font-bold flex flex-row gap-2 items-center py-[15px] ' +
    'hover:bg-white hover:text-[#35B3B5] px-[20px]'

const activeLink = 'bg-white text-[#35B3B5]'


const SideBar = ()=>{
    const pathname = useLocation().pathname
    const user = JSON.parse(localStorage.getItem('user'))
    const navigator = useNavigate()

    return (
        <nav className={'bg-[#35B3B5] h-screen flex flex-col items-center py-[10px] gap-[60px]'}>
            <Link to={'/'} className={'bg-white px-[20px] py-[3px] rounded-lg'}>
                <img src={logoUrl} alt={'логотип'}/>
            </Link>
            <div className={'flex flex-col w-full text-white'}>
                <Link to={'/'} className={classNames(linksClassName, {[activeLink]: pathname === '/'})}>
                    <i className="pi pi-cloud"></i>
                    Мой диск
                </Link>
                {/*<Link to={'/shared'} className={classNames(linksClassName, {[activeLink]: pathname === '/shared'})}>*/}
                {/*    <i className="pi pi-users"></i>*/}
                {/*    Доступные*/}
                {/*</Link>*/}
                <Link to={'/statistic'} className={classNames(linksClassName, {[activeLink]: pathname === '/statistic'})}>
                    <i className="pi pi-chart-pie"></i>
                    Статистика
                </Link>
            </div>
            <div className={'flex flex-row w-full text-[#35B3B5] items-center gap-4 py-[15px] px-[20px] bg-white'}>
                <div className={`bg-[#DD0000] flex w-[40px] h-[40px] items-center justify-center rounded-full font-semibold text-[20px] text-white capitalize`}>
                    {user?.first_name[0]}
                </div>
                <div className={'flex grow justify-between items-center'}>
                    <p className={'capitalize font-semibold'}>{user?.first_name}</p>
                </div>
            </div>
        </nav>
    )
}

export {SideBar}