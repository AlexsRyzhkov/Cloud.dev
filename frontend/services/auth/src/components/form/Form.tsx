import React, {FC, PropsWithChildren} from "react";
import {FormProvider, useForm} from "react-hook-form";

interface IForm{
    onSubmit: (data: any)=>any
}

const Form:FC<PropsWithChildren & IForm> = ({children, onSubmit}) => {
    const method = useForm()
    const {handleSubmit} = method

    return (
        <FormProvider {...method}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-[320px] flex flex-col gap-4'
            >
                {children}
            </form>
        </FormProvider>
    )
}

export {Form}