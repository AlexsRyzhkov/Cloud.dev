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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-10 '>
                    <div>cds</div>
                    <div>cds</div>
                </div>
                {children}
            </form>
        </FormProvider>
    )
}

export {Form}