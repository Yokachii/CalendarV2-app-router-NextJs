import type { AppProps } from 'next/app'
import styles from './styles.module.scss'
import Nav from '../navbar/index'
import { useEffect, useState } from 'react'



export default function MyApp({ children,test }) {

  // const [x,setX] = useState(100)

  // const tmp = async () =>{
  //   let data = await test()
  //   setX(data)
  // }
  
  // useEffect(()=>{
  //   tmp()
  // },[tmp])

  return (
    <>
      <Nav></Nav>

      <div className={styles.main}>

        <p>{JSON.stringify(test)}</p>
        
        {children}

      </div>

    </>
  )
}