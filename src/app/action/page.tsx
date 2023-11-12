'use server';
 
import { cookies } from 'next/headers'
 
async function create() {
  const oneDay = 24 * 60 * 60 * 1000
  cookies().set('name', 'value', { expires: Date.now() - oneDay })
}

export default async function Home() {

    // create()
    
    
    return (
        <div>
            
            <p>ABC</p>

        </div>
    )
}