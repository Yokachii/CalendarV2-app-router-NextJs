"use client";

import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import { useState,useEffect } from 'react'

import logo from '../../public/logo.png'

export default function Index({}) {

    const [loginFormClass, setLoginFormClass] = useState('')
    const [loginTextContentH2, setLoginTextContentH2] = useState('Sign up')
    const [loginTextContentSwitch, setLoginTextContentSwitch] = useState('')
    const [loginError,setLoginError] = useState('')

    // Creating the input value using useState
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [eMail,setEMail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
  

    function switchLoginSign() {
        switch (loginTextContentH2) {
            case 'Log in':
                setLoginFormClass('sign-up')
                setLoginTextContentH2("Sign up")
                setLoginTextContentSwitch("Allready have an account? Log in.")
                break;
            case 'Sign up':
                setLoginFormClass('log-in')
                setLoginTextContentH2("Log in")
                setLoginTextContentSwitch("Don’t have an account? Sign up.")
                break;
        }
    }

    useEffect(() => {
        switchLoginSign() // initialasing the swithLoginButton
    }, []);

    return (
        <div className={`${styles.loginBoxMain}`}>
            <div className={`${styles[`login-form`]} ${styles[loginFormClass]}`}>
                <h2 className={`${styles[`login-h2`]}`}>{loginTextContentH2}</h2>
                <a onClick={()=>switchLoginSign()} className={`${styles[`login-alracc`]}`} >{loginTextContentSwitch}</a>
                <p className={`${styles[`login-error`]}`}>{loginError}</p>
                <div className="two-item-form">
                    <div className={`${styles[`login-form-input`]} ${styles[`sign-up`]}`}> <div className={`${styles[`login-label`]}`}>First name</div> <input placeholder='axo' onChange={e=>{setFirstName(e.currentTarget.value)}} value={firstName}></input> </div>
                    <div className={`${styles[`login-form-input`]} ${styles[`sign-up`]}`}> <div className={`${styles[`login-label`]}`}>Last name</div> <input placeholder='lotl' onChange={e=>{setLastName(e.currentTarget.value)}} value={lastName}></input> </div>
                </div>
                
                <div className="login-form-input"> <div className={`${styles[`login-label`]}`}>e-mail</div> <input placeholder='axolotl@gmail.com' onChange={e=>{setEMail(e.currentTarget.value)}} value={eMail}></input> </div>
                <div className="login-form-input"> <div className={`${styles[`login-label`]}`}>Password</div> <input placeholder='********' onChange={e=>{setPassword(e.currentTarget.value)}} value={password}></input> </div>
                <div className={`${styles[`login-form-input`]} ${styles[`sign-up`]}`}> <div className={`${styles[`login-label`]}`}>Confirm password</div> <input placeholder='********' onChange={e=>{setConfirmPassword(e.currentTarget.value)}} value={confirmPassword}></input> </div>
                <a>Forgot password</a>
                <button className={`${styles[`continue-button`]}`} onClick={()=>{}}>Continue</button>
            </div>
        </div>
    )
  
}