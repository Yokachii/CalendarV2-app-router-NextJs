"use client";

import styles from '../../page.module.css'
import Modal from 'react-modal'
import { useRef,useState } from 'react'
import { headers } from 'next/headers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBell, faCalendarMinus, faCheck, faClock, faCross, faFaceAngry, faMoon, faPen, faXmark } from '@fortawesome/free-solid-svg-icons'

type User = {
    id:string;
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    activities:string;
    dailytask:string;
    dashboardwidget:string;
    day:string;
    notification:string;
    objective:string;
    song:string;
    todaytask:string;
    widgettask:string;
}

export default async function Home() {


    const headersList = headers()
    const userAcc = headersList.get('user-account')
    let userAccountJson:User={
        id:'',
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        activities:'',
        dailytask:'',
        dashboardwidget:'',
        day:'',
        notification:'',
        objective:'',
        song:'',
        todaytask:'',
        widgettask:'',
    }

    if(userAcc){
        userAccountJson=JSON.parse(userAcc)
    }


    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editFieldName, setEditFieldName]:[any,any] = useState('')
    const input = useRef(null)

    const editModalStyle = {
        overlay: {
           backgroundColor: 'rgba(0, 0, 0, 0.6)'
        },
        content: {
           top: '50%',
           left: '50%',
           right: 'auto',
           bottom: 'auto',
           marginRight: '-50%',
           transform: 'translate(-50%, -50%)',
           padding: '0px',
           border: 'none',
           background: 'none',
        }
    }

    const openModalWithValue = (name:string) => {
        setEditFieldName(name)
        setIsEditModalOpen(true)
    }

  return (
    <main>

        <Modal isOpen={isEditModalOpen} onRequestClose={() => setIsEditModalOpen(false)} style={editModalStyle}>
            <div className={styles.modalContent}>
                <button className={styles.closeModal} onClick={() => setIsEditModalOpen(false)}><FontAwesomeIcon icon={faXmark} size='2x'></FontAwesomeIcon></button>
                {
                    !userAccountJson.todaytask[editFieldName]?`An error as occured on loading`:(
                        <div>
                            <h1>{userAccountJson.todaytask[editFieldName].displayName}</h1>
                            <span>{userAccountJson.todaytask[editFieldName].after?`The value has to be specified in ${userAccountJson.todaytask[editFieldName].after}`:``}</span>
                            <input onChange={inputChange} placeholder={`${getPlayholder(editFieldName)}`} className={styles.changeValueInput} ref={input}></input>
                            <button className={styles.btnSave} onClick={()=>saveNewValue(editFieldName)}>{`Save >`}</button>
                        </div>
                    )
                }
                
            </div>
        </Modal>

        <FontAwesomeIcon icon={faClock} size='7x' pull='left' style={{width:"9rem"}}></FontAwesomeIcon>
        <h1>@Today</h1>
        <div className=''></div>
        <div className={styles.todayFieldContainer}>
            <div className={styles.field}>
                <div className={styles.fieldName}><div className={styles.icon}><FontAwesomeIcon icon={faCalendarMinus} pull='right'></FontAwesomeIcon></div> Date</div>
                <div className={styles.fieldValue}>{`${new Date().getDate()}-${`${new Date().getMonth()+1}`.length<2?`0${new Date().getMonth()+1}`:`${new Date().getMonth()+1}`}-${new Date().getFullYear()}`}</div>
            </div>
            {Object.keys(userAccountJson.todaytask).map((item,i) =>
                <div className={styles.field} key={i}>
                    <div className={styles.fieldName}><div className={styles.icon}>{iconObj[userAccountJson.todaytask[item].icon]?<FontAwesomeIcon icon={iconObj[userAccountJson.todaytask[item].icon]} pull='right' style={{marginTop:`.3rem`}}></FontAwesomeIcon>:``}</div>  {userAccountJson.todaytask[item].displayName}</div>
                    <div className={styles.fieldValue}> <p>{getActuallyName(item)}{userAccountJson.todaytask[item].after}</p> <button onClick={() => openModalWithValue(item)}><FontAwesomeIcon icon={faPen} pull='left'></FontAwesomeIcon></button></div>
                </div>
            )}
        </div>
        
    </main>
  )
}