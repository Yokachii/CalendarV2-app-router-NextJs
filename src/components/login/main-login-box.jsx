'use client'

import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
// import { createTodo } from '@/utils/action'

import { useState,useEffect } from 'react'
import styles from './styles.module.scss'

import { loginRegister } from '../../utils/action'

// const loginRegister = {
//     message:'b',
// }
// function loginRegister(){
//     return {message:'b'}
// }

export default function Index({firstName,lastName,eMail,password,confirmPassword,setFirstName,setLastName,setEMail,setPassword,setConfirmPassword,handleSubmit,onSubmit,register,isRegister,setIsRegister}) {

    const [loginFormClass, setLoginFormClass] = useState('')
    const [loginTextContentH2, setLoginTextContentH2] = useState('Sign up')
    const [loginTextContentSwitch, setLoginTextContentSwitch] = useState('')
    const [loginError,setLoginError] = useState('')

    
  
    // Form manage
    // const initialState = {
    //     firstName,
    //     lastName,
    //     password,
    //     confirmPassword,
    //     eMail,
    // }

    // const [state, formAction] = useFormState(loginRegister, initialState)

    function switchLoginSign() {
        switch (loginTextContentH2) {
            case 'Log in':
                setLoginFormClass('sign-up')
                setLoginTextContentH2("Sign up")
                setLoginTextContentSwitch("Allready have an account? Log in.")
                setIsRegister(true)
                break;
            case 'Sign up':
                setLoginFormClass('log-in')
                setLoginTextContentH2("Log in")
                setLoginTextContentSwitch("Don’t have an account? Sign up.")
                setIsRegister(false)
                break;
        }
    }

    useEffect(() => {
        switchLoginSign() // initialasing the swithLoginButton
    }, []);

    return (
        <form className={`${styles.loginBoxMain}`} onSubmit={handleSubmit(onSubmit)}>
            <div className={`${styles[`login-form`]} ${styles[loginFormClass]}`}>
                <h2 className={`${styles[`login-h2`]}`}>{loginTextContentH2}</h2>
                <a onClick={()=>switchLoginSign()} className={`${styles[`login-alracc`]}`} >{loginTextContentSwitch}</a>
                <p className={`${styles[`login-error`]}`}>{loginError}</p>
                <div className="two-item-form">
                    <div className={`${styles[`login-form-input`]} ${styles[`sign-up`]}`}> <div className={`${styles[`login-label`]}`}>First name</div> <input {...register('firstname', { required: ((loginFormClass=="sign-up")?'Ce champ est requis':false) })} placeholder='axo' onChange={e=>{setFirstName(e.currentTarget.value)}} value={firstName}></input> </div>
                    <div className={`${styles[`login-form-input`]} ${styles[`sign-up`]}`}> <div className={`${styles[`login-label`]}`}>Last name</div> <input {...register('lastname', { required: ((loginFormClass=="sign-up")?'Ce champ est requis':false) })} placeholder='lotl' onChange={e=>{setLastName(e.currentTarget.value)}} value={lastName}></input> </div>
                </div>
                
                <div className="login-form-input"> <div className={`${styles[`login-label`]}`}>e-mail</div> <input {...register('email', {required:'Ce champ est requis'})} placeholder='axolotl@gmail.com' onChange={e=>{setEMail(e.currentTarget.value)}} value={eMail}></input> </div>
                <div className="login-form-input"> <div className={`${styles[`login-label`]}`}>Password</div> <input {...register('password', {required:'Ce champ est requis'})} placeholder='********' onChange={e=>{setPassword(e.currentTarget.value)}} value={password}></input> </div>
                <div className={`${styles[`login-form-input`]} ${styles[`sign-up`]}`}> <div className={`${styles[`login-label`]}`}>Confirm password</div> <input {...register('confirmpassword', { required: ((loginFormClass=="sign-up")?'Ce champ est requis':false) })} placeholder='********' onChange={e=>{setConfirmPassword(e.currentTarget.value)}} value={confirmPassword}></input> </div>
                <a>Forgot password</a>
                <button className={`${styles[`continue-button`]}`} type="submit">Continue</button>
            </div>

            {/* <p>{state?.message}</p> */}

            {/* <p>{JSON.stringify(initialState)}</p> */}
            {/* <input {...register('nom', { required: 'Ce champ est requis' })} />
    
            {errors.nom && <p>{errors.nom.message}</p>} */}
    
            {/* <button type="submit">Envoyer</button> */}
        </form>
    )
  
}