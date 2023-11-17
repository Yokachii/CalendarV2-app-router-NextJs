"use client"

import { FormEvent } from 'react';
import styles from './main.module.scss'

export default function Form() {

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(formData.get('email'))
        const response = await fetch(`http://localhost:3000/api/auth/register`,{
            method:`POST`,
            body:JSON.stringify({
                username:formData.get('username'),
                email:formData.get('email'),
                password:formData.get('password'),
            })
        })
        let json = response.json();
        console.log({json})
    }
    

    return (
        <div>
           <form onSubmit={handleSubmit}>

            <input name='email' type="email"/>
            <input name='username' type="username"/>
            <input name='password' type="password"/>
            <button type='submit'>Register</button>

           </form>
        </div>
    )
}