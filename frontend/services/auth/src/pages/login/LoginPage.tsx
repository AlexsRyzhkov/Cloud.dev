import {useCallback, useState} from "react";
import {Button} from "primereact/button";
import {ProgressSpinner} from "primereact/progressspinner";
import {Link} from "react-router-dom";
import {Form} from "@/components/form/Form";
import {Input} from "@/components/input/Input";
import {$api} from "@/http";


function LoginPage() {
    const [isLoading, setLoading]=useState(false)


    const onSubmit = useCallback(async (data:any)=>{
        try{
            setLoading(true)
            const result = await $api.post('/api/auth/login/', data, {
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            })
        }catch (e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    },[])

    return (
        <div className='flex flex-col gap-5'>
            <h1 className={'text-3xl font-bold'}>Вход</h1>
            {isLoading ? (
                <ProgressSpinner style={{width: '20px', height: '20px', stroke: 'white'}} className='m-0 mr-5'/>
            ): (
                <>
                    <Form onSubmit={onSubmit}>
                        <Input name={'login'} label={'Логин'}/>
                        <Input name={'password'} label={'Пароль'} isSecure/>
                        <Button className={'flex item-center justify-center'} disabled={isLoading}>
                            Войти
                        </Button>
                    </Form>
                    <Link to={'/auth/register'} className='text-right'>Регистрация</Link>
                </>
            )}
        </div>
    )
}


export {LoginPage}