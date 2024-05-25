import {createContext, FC, PropsWithChildren, useContext, useEffect, useState} from "react";
import {$api} from "@/http";
import {useParams} from "react-router-dom";
import { AxiosResponse } from "axios";

interface IFolder {
    id: number,
    file?: string,
    parent: number,
    name: string,
    extension: string,
    is_dir: boolean
}

interface IDiskContext {
    value: {
        isLoading: boolean
        folderData: IFolder[],
        version: number
    },
    setValue: (v: {
        isLoading: boolean
        folderData: [],
        version: 0
    }) => void
}

const DiskContext = createContext({} as IDiskContext)

const useDiskContext = () => useContext(DiskContext)

const DiskProvider: FC<PropsWithChildren> = ({children}) => {
    const {id} = useParams()

    const [value, setValue] = useState({
        isLoading: false,
        folderData: [],
        version: 0
    })

    useEffect(() => {
        (async () => {
            let response: AxiosResponse<any, any> = null
            if (id === ''){
                setValue(prev => ({...prev, isLoading: true}))

                response = await $api.get('api/storage/drive/')

                response = await $api.get(`api/storage/dir/${response.data.id}`)

                setValue(prev => ({
                    ...prev, folderData: response?.data.children
                }))
            }

            try{
                response = await $api.get(`api/storage/dir/${id}`)

                setValue(prev => ({
                    ...prev, folderData: response?.data.children
                }))
            }catch (e){
                console.log(e)
            }finally {
                setValue(prev => ({...prev, isLoading: true}))
            }

        })()
    }, [value.version]);

    return (
        <DiskContext.Provider value={{value, setValue}}>
            {children}
        </DiskContext.Provider>
    )
}

export {DiskProvider, useDiskContext}