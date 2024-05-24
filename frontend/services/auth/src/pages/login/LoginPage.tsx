import {useCallback} from "react";
import {Button} from "primereact/button";
import {ProgressSpinner} from "primereact/progressspinner";
import {Link} from "react-router-dom";
import {Form} from "@/components/form/Form";
import {Input} from "@/components/input/Input";


function LoginPage() {
    const isLoading = false

    const onSubmit = useCallback((data:any)=>{
        console.log(data)
    },[])

    return (
        <div className='flex flex-col gap-5'>
            <h1 className={'text-3xl font-bold'}>Вход</h1>
            <Form onSubmit={onSubmit}>
                <Input name={'login'} label={'Логин'}/>
                <Input name={'password'} label={'Пароль'} isSecure/>
                <Button className={'flex item-center justify-center'} disabled={isLoading}>
                    {isLoading && <ProgressSpinner style={{width: '20px', height: '20px', stroke: 'white'}} className='m-0 mr-5'/>}
                    Войти
                </Button>
            </Form>
            <Link to={'/auth/register'} className='text-right'>Регистрация</Link>
        </div>
    )
}


export {LoginPage}