import React, {FC, PropsWithChildren} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";

interface IInputPassword {
    name: string,
    label: string,
    isSecure?: boolean,
    emailValidation?: boolean
    error?: string
}

const Input: FC<IInputPassword> = ({
    name,
    label,
    isSecure = false,
    emailValidation = false,
    error = ''
}) => {
    const {control} = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: "Не может быть пустым",
                pattern: {
                    value: emailValidation ? /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i : undefined,
                    message: 'Неверный формат email'
                }
            }}
            render={({field, fieldState}) => {
                return (
                    <div className="flex flex-col gap-2">
                        <p>{label}</p>
                        {isSecure ? (
                            <Password {...field} feedback={false} inputClassName='w-full'/>
                        ) : (
                            <InputText {...field}/>
                        )}
                        {(fieldState.error || error!=='') && (
                            <p className='text-red-600'>{fieldState?.error?.message || error}</p>
                        )}
                    </div>
                )
            }}
        />
    )
}

export {Input}
