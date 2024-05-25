import {createContext, useContext, useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {$api} from "../http";

interface IUser{
    user_id: number,
    role: number,
    login: string,
    first_name: string,
    last_name: string,
    color: string
}

interface IAuthContext {
    user: IUser
}

const AuthContext = createContext({} as IAuthContext)

const useAuthContext = () => useContext(AuthContext)

const AuthLayout = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    useEffect(() => {
        (async ()=>{
            try{
                const response = await $api.get('api/auth/user/')
                setUser(response.data as IUser)
                localStorage.setItem('user', JSON.stringify(response.data))
            }catch (e){
                setUser(null)
                localStorage.clear()
            }finally {
                if (['/auth/login', '/auth/register'].includes(pathname) && user){
                    navigate('/')
                }

                if (!user && !['/auth/login', '/auth/register'].includes(pathname)){
                    navigate('/auth/login')
                }
            }
        })()
    }, [pathname]);

    return (
        <AuthContext.Provider value={{user}}>
            <Outlet/>
        </AuthContext.Provider>
    )
}

export {AuthLayout, useAuthContext}