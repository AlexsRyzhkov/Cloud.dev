import {Form} from "@/components/form/Form";
import {Input} from "@/components/input/Input";
import {Button} from "primereact/button";
import {ProgressSpinner} from "primereact/progressspinner";
import {Link} from "react-router-dom";
import {useCallback, useRef, useState} from "react";
import {$api} from "@/http";
import {Toast} from "primereact/toast";


function RegisterPage(){
    const [isLoading, setLoading]=useState(false)
    const [error, setError]=useState("")
    const toast = useRef(null);

    const onSubmit = useCallback(async (data:any)=>{
        try{
            setLoading(true)
            await $api.post('/api/auth/register/', {...data, role:1})
            toast.current.show({ severity: 'Wa', summary: 'Info', detail: 'Успешно создан' });
        }catch (e){
            setError(e.response.data.login[0]==='user with this login already exists.' ? "Такой пользователь уже существует": "Ошибка сервера")
        }finally{
            setLoading(false)
        }
    },[])


    return (
        <div className='flex flex-col gap-5'>
            <h1 className={'text-3xl font-bold'}>Регистрация</h1>
            <Toast ref={toast} />
            <Form onSubmit={onSubmit}>
                <Input name={'login'} label={'Email'} emailValidation error={error}/>
                <Input name={'first_name'} label={'Имя'} error={error}/>
                <Input name={'last_name'} label={'Фамилия'} error={error}/>
                <Input name={'password'} label={'Пароль'} isSecure error={error}/>
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