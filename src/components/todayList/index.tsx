"use client"

import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBell, faCalendarMinus, faCheck, faClock, faCross, faFaceAngry, faMoon, faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useRef,useState } from 'react'
import type { User } from '@/utils/type';

export default function Index({user}) {

    const userAccountJson:User = user

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editFieldName, setEditFieldName] = useState('')
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

    function getTodayUse(){
        let date = new Date()
        let dates = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if(`${month}`.length<2) month=`0${month}`
        let strDate=`${dates}-${month}-${year}`
        let todayObject = userAccountJson.day[strDate]
    
        return todayObject
    }

    const openModalWithValue = (name:string) => {
        setEditFieldName(name)
        setIsEditModalOpen(true)
    }

    const inputChange = () => {
        input.current.classList.remove('error')
    }

    const getPlayholder = (name:string) => {
        let res = ``
        let today = getTodayUse()
        if(today&&today.todayNote&&today.todayNote[name]){
            res = today.todayNote[name].value
        }
        return res
    }

    const saveNewValue = (name:string) => {
        console.log(name)
        // return
        if(!input.current) return
        // console.log(input.current)
        // return
        let value = input.current.value
        if(`${value}`.length<1) {
            input.current.classList.add('error')
        }else{
            setIsEditModalOpen(false)
            //Save
        }
    }

    const getActuallyName = (name:string) => {
        let res = ``
        let today = getTodayUse()
        if(today&&today.todayNote&&today.todayNote[name]){
            res = today.todayNote[name].value
        }else{
            res = `?`
        }
        return res
    }

    const iconObj = {
        clock:faClock,
        pen:faPen,
        cross:faCross,
        arrowRight:faArrowRight,
        check:faCheck,
        moon:faMoon,
        angray:faFaceAngry,
        calandar:faCalendarMinus,
        bell:faBell,
    }
    
    // console.log()

    return (
        <>
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
        </>
    )
  
}