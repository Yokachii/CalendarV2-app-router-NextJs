"use client"

import { FormEvent } from 'react';
import styles from './main.module.scss'
import { signIn } from 'next-auth/react'

export default function Form2() {

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials',{
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        })
        console.log(response)
        // Signin
        // const response = await fetch(`http://localhost:3000/api/auth/login`,{
        //     method:`POST`,
        //     body:JSON.stringify({
        //         username:formData.get('username'),
        //         password:formData.get('password'),
        //     })
        // })
        // let json = response.json();
        // console.log({json})
    }
    

    return (
        <div>
           <form onSubmit={handleSubmit}>

            <input name='email' type="email"/>
            <input name='password' type="password"/>
            <button type='submit'>Login</button>

           </form>
        </div>
    )
}