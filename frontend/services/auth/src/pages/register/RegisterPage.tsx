import {Form} from "@/components/form/Form";
import {Input} from "@/components/input/Input";
import {Button} from "primereact/button";
import {ProgressSpinner} from "primereact/progressspinner";
import {Link} from "react-router-dom";
import {useCallback} from "react";


function RegisterPage(){

    const isLoading = false

    const onSubmit = useCallback((e:any)=>{
        e.preventDefault();
    },[])


    return (
        <div className='flex flex-col gap-5'>
            <h1 className={'text-3xl font-bold'}>Регистрация</h1>
            <Form onSubmit={onSubmit}>
                <Input name={'login'} label={'Логин'}/>
                <Input name={'first_name'} label={'Имя'}/>
                <Input name={'last_name'} label={'Фамилия'}/>
                <Input name={'password'} label={'Пароль'} isSecure/>
                <Button className={'flex item-center justify-center'} disabled={isLoading}>
                    {isLoading && <ProgressSpinner style={{width: '20px', height: '20px', stroke: 'white'}} className='m-0 mr-5'/>}
                    Зарегистрироваться
                </Button>
            </Form>
            <Link to={'/auth/login'} className='text-right'>Вход</Link>
        </div>
    )
}

export {RegisterPage}