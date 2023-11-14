"use client"

import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import NoAvatar from '../../../public/noavatar.png'


import { useState,useEffect } from 'react'

export default function UserInfo({user}) {

    return (
        <div className={styles.main}>
            <Link href={`/acount`}>
                <Image src={NoAvatar} alt='User-Avatar' className={styles.avatar}></Image>
            </Link>
            {/* <div className={styles.userHover}>
                <p>{user?.id}</p>
            </div> */}
        </div>
    )
  
}