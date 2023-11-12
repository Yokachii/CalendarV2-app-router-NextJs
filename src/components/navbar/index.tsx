import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import { useState,useEffect } from 'react'

import logo from '../../public/logo.png'

export default function Index({}) {

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
            return setNavScrollState('invisible')
        }

        if(lastScroll>scroll){
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
                <Image className={styles.nav__img} src={logo} alt="Hallay logo" />
                <span>Hallay</span>
            </div>

            <div className={styles.link}>
                <ul>
                    <li> <span className={styles.select}><Link href={`/`}>Home</Link></span> </li>
                    <li> <span><Link href={`/projet`}>Projet</Link></span> </li>
                    <li> <span><Link href={`/team`}>Team</Link></span> </li>
                    <li> <span><Link href={`/contact`}>Contact</Link></span> </li>
                </ul>
            </div>
        </div>
    )
  
}