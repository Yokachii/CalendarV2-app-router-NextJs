"use client"

import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import { useState,useEffect } from 'react'

export default function Index({user}) {

    let navHeight = 70

    const [clientWindowHeight, setClientWindowHeight] = useState(0);
    const [navScrollState, setNavScrollState] = useState("default"); // default - invisible

    const handleScroll = () => {
        let scroll = window.scrollY
        let lastScroll = clientWindowHeight
        setClientWindowHeight(window.scrollY);

        if(scroll==0){
            return setNavScrollState('default')
        }

        if(scroll>lastScroll){
            if(scroll>0&&scroll<navHeight){
                return setNavScrollState('relative-down')
            }
            if(scroll>navHeight-1&&scroll<navHeight+10){
                return setNavScrollState('invisible')
            }
            return setNavScrollState('invisible-down')
        }

        if(lastScroll>scroll){
            if(scroll>0&&scroll<navHeight){
                return setNavScrollState('relative-up')
            }
            return setNavScrollState('default')
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll); 
        return () => window.removeEventListener("scroll", handleScroll);
    });

    return (
        <div className={`${styles.nav} ${styles[`nav-${navScrollState}`]}`}>
            <div className={styles.logo}>
                {/* <Image className={styles.nav__img} src={logo} alt="Hallay logo" /> */}
                <span>Calendar</span>
            </div>

            <div className={styles.link}>
                <ul className={styles.page}>
                    {/* <li> <span className={styles.select}><Link href={`/`}>Home</Link></span> </li> */}
                    <li> <span><Link href={`/`}>Home</Link></span> </li>
                    <li> <span><Link href={`/login`}>Login</Link></span> </li>
                    <li> <span><Link href={`/contact`}>Dashboard</Link></span> </li>
                </ul>
                <div className={styles.user}>
                    {user}
                </div>
            </div>
        </div>
    )
  
}