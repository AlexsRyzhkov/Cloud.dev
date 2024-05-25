import {createContext, FC, PropsWithChildren, useContext, useState} from "react";

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

    const [value, setValue] = useState({
        isLoading: false,
        folderData: [
            {
                "id": 3,
                "file": "/media/drives/user1/107c2747-284a-4153-97c2-ad1641714ae5_2.jpg",
                "parent": 1,
                "name": "Photo",
                "extension": ".jpg",
                "is_dir": false
            },
            {
                "id": 4,
                "file": null,
                "parent": 1,
                "name": "Photos",
                "extension": "",
                "is_dir": true
            },
            {
                "id": 5,
                "file": null,
                "parent": 1,
                "name": "Photos",
                "extension": ".docx",
                "is_dir": false
            },
            {
                "id": 6,
                "file": null,
                "parent": 1,
                "name": "Photos",
                "extension": ".vfdgb",
                "is_dir": false
            },
        ],
        version: 0
    })

    return (
        <DiskContext.Provider value={{value, setValue}}>
            {children}
        </DiskContext.Provider>
    )
}

export {DiskProvider, useDiskContext}