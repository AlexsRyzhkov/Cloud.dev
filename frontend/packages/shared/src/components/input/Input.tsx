import React, {FC, PropsWithChildren} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {InputText} from "primereact/inputtext";

interface IInputPassword {
    name: string,
    label: string,
}

const Input: FC<IInputPassword> = ({name,label}) => {
    const {control} = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => {
                return (
                    <div className="flex flex-col gap-2">
                        <p>{label}</p>
                        <InputText {...field}/>
                    </div>
                )
            }}
        />
    )
}

export {Input}