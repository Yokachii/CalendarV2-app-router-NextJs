'use server'
 
import { cookies } from 'next/headers'
 
async function create() {
  cookies().set('name', 'value', { maxAge: 60*60 })
}

export {create}