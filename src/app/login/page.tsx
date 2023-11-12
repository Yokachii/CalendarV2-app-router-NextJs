'use client';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from './main.module.scss'
import LoginBox from '../../components/login/main-login-box'

export default function Home() {
    
    // const [activities,setActivities] = useState([])
    // const [dailyTask,setDailyTask] = useState([])

    // const getActivities = async () => {
    //     const response = await fetch('http://localhost:3000/api/getactivities', {
    //         method: 'GET',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //     });
        
    //     const datass = await response.json();
    //     setActivities(datass)
    // };
    // const getDailyTask = async () => {
    //     const response = await fetch('http://localhost:3000/api/getdailytask', {
    //         method: 'GET',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //     });
        
    //     const datass = await response.json();
    //     setDailyTask(datass)
    // };

    // useEffect(() =>{

    //     getActivities()
    //     getDailyTask()

    // },[])

    // let time = {}

    // for(let key of activities){
    //     time[key.displayName] = {
    //         total:'0'
    //     }
    //     for(let tmp in JSON.parse(key.subTaskList)){
    //         // console.log(tmp)
    //         time[key.displayName][tmp]=`0`
    //     }
    // }

    // function getTodayDate(){
    //     let date = new Date()
    //     let dates = `${date.getDate()}`;
    //     let month = `${date.getMonth() + 1}`;
    //     let year = `${date.getFullYear()}`;
    //     if(`${month}`.length<2) month=`0${month}`
    //     let strDate=`${dates}-${month}-${year}`
    
    //     return strDate
    // }
    // let date = getTodayDate()
    
    // const handleSubmit = async () => {
    //     const response = await fetch('http://localhost:3000/api/createday', {
    //         method: 'POST',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ 
    //             date:date,
    //             time:time,
    //             todayNote:``,
    //             objective:``,
    //         }), // Envoyer le message dans le corps de la requête
    //     });
        
    //     const datass = await response.json();
    //     console.log(datass)
    // };

    // const handleSubmit2 = async () => {
    //     const response = await fetch('http://localhost:3000/api/createactivities', {
    //         method: 'POST',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ 
    //             color:`#32a852`,
    //             displayName:`Chess`,
    //             subTaskList:JSON.stringify({problem:{color:'#8332a8'},game:{color:'#a6a832'}}),
    //         }), // Envoyer le message dans le corps de la requête
    //     });
        
    //     const datass = await response.json();
    //     console.log(datass)
    // };

    // const handleSubmit3 = async () => {
    //     const response = await fetch('http://localhost:3000/api/createdailytask', {
    //         method: 'POST',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ 
    //             name:"chess",
    //             time:JSON.stringify({
    //                 total:'60',
    //                 game:'30',
    //                 probleme:'30',
    //             }),
    //         }), // Envoyer le message dans le corps de la requête
    //     });
        
    //     const datass = await response.json();
    //     console.log(datass)
    // };

    const loginAccount = async () => {
        const response = await fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email:eMail,
                password:password,
            }), // Envoyer le message dans le corps de la requête
        });
        
        const datass = await response.json();
        console.log(datass)
    }

    const createAccount = async () => {
        const response = await fetch('http://localhost:3000/api/user/createaccount', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                firstname:firstName,
                lastname:lastName,
                email:eMail,
                password:password,
            }), // Envoyer le message dans le corps de la requête
        });
        
        const datass = await response.json();
        console.log(datass)
    };

    const checkIfUserExist = async () => {
        const response = await fetch('http://localhost:3000/api/user/checkifuser', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email:eMail,
            }), // Envoyer le message dans le corps de la requête
        });
        
        const datass = await response.json();
        return datass
    };


    

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

    function displayLoginError(err : string) {
        setLoginError(err)
    }

    async function LoginRegister(){
        displayLoginError('')
        switch (loginTextContentH2) {
            case 'Log in': // login the user
                if(!eMail||!password) return displayLoginError(`Please fill all the field`)
                
                let getUser = await checkIfUserExist() // Check if the user exist
                if(!getUser.isExsite) return displayLoginError(`Account does not exist`)
                
                loginAccount()
                break;
            case 'Sign up': // register the user
                if(!firstName||!lastName||!eMail||!password) return displayLoginError(`Please fill all the field`) // Check if the field are fill

                let checkUser = await checkIfUserExist() // Check if the mail is allready taken
                if(checkUser.isExsite) return displayLoginError(`This e-mail is allready taken, please try to use another email`)

                if(password===confirmPassword){ // Check if password match
                    createAccount() // Register
                }else{
                    displayLoginError('Password don\'t match, please check the password') // Error
                }
                break;
        }
    }

    // useEffect(() => {
    //     switchLoginSign() // initialasing the swithLoginButton
    // }, []);


    return (
        <div className={`${styles[`login-app`]}`}>
                
        {/* <button onClick={()=>handleSubmit3()}>{header}</button> */}
                
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
                <LoginBox></LoginBox>
            </div>

            </div>
        </div>
    </div>
    )
}