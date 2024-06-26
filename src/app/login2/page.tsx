'use client';

import { useEffect, useState } from 'react';
import styles from './main.module.scss'
import LoginBox from '../../components/login/main-login-box'
import { useForm, SubmitHandler, useFormState } from 'react-hook-form';
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { registerAction,loginAction } from '@/utils/action';


type FormData = {
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    confirmPassword:string;
};

// type Data2 = {
//     status:number;
//     error:string;
//     message:string;
// }

export default function Home() {

    const router = useRouter()

    // Creating the input value using useState
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [eMail,setEMail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [isRegister,setIsRegister] = useState(false)

    const { register, handleSubmit, control } = useForm<FormData>();
    const { errors } = useFormState({ control });
  
    const onSubmit: SubmitHandler<FormData> = async (data:any) => {

        let data2:any

        if(isRegister){
            data2 = await registerAction(data)
        }else{
            data2 = await loginAction(data)
        }
        
        // console.log(data2);
        if(data2?.status>199&&data2?.status<300){
            
            router.push("/")
            
        }
    };


    return (
        <div className={`${styles[`login-app`]}`}>
                
        <div className={`${styles[`login-body`]}`}>
            <div className={`${styles[`login-front`]}`}>
                
            <div className={`${styles[`left`]}`}>
                <div className={`${styles[`text-container`]}`}>
                    <h1>
                        <span className={`${styles[`span1`]}`}>Welcome to</span>
                        <span className={`${styles[`span2`]}`}>Impact Platform</span>
                    </h1>
                    <p>Practice your chess skills, grow your levels and play with other chess player</p>
                </div>
            </div>

            <div className={`${styles[`right`]}`}>
                <LoginBox firstName={firstName} lastName={lastName} eMail={eMail} password={password} confirmPassword={confirmPassword} setFirstName={setFirstName} setLastName={setLastName} setEMail={setEMail} setPassword={setPassword} setConfirmPassword={setConfirmPassword} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} isRegister={isRegister} setIsRegister={setIsRegister}></LoginBox>
            </div>

            

            </div>
        </div>
    </div>
    )
}