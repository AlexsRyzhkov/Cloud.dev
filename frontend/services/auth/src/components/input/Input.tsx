import React, {FC, PropsWithChildren} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";

interface IInputPassword {
    name: string,
    label: string,
    isSecure?: boolean
}

const Input: FC<IInputPassword> = ({
    name,
    label,
    isSecure=false
}) => {
    const {control} = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: "Не может быть пустым",
            }}
            render={({field, fieldState}) => {
                return (
                    <div className="flex flex-col gap-2">
                        <p>{label}</p>
                        {isSecure ? (
                            <Password {...field} feedback={false} inputClassName='w-full'/>
                        ): (
                            <InputText {...field}/>
                        )}
                        {fieldState.error && (
                            <p className='text-red-600'>{fieldState?.error?.message}</p>
                        )}
                    </div>
                )
            }}
        />
    )
}

export {Input}
