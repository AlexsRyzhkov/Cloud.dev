import {createContext, FC, PropsWithChildren, useContext, useEffect, useState} from "react";

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


const AuthLayout:FC<PropsWithChildren> = ({children}) => {
    const [user, _] = useState(null)

    useEffect(() => {
        (async ()=>{

        })()
    }, []);

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthLayout, useAuthContext}