'use server'
 
import { cookies } from 'next/headers'
// import User from '../module/model/user'
// import sequelize from '../module/sequelize'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import sequelize from '../module/sequelize'
import User from '../module/model/user'
import { sql } from '@sequelize/core';
import { QueryTypes } from 'sequelize'

type FormData2 = {
  firstname:string;
  lastname:string;
  email:string;
  password:string;
  confirmpassword:string;
};
 
async function create() {
  cookies().set('name', 'value', { maxAge: 60*60 })
}

// async function loginRegister(firstname,lastname,password,email){

//   await User.create({
//     firstname:firstname,
//     lastname:lastname,
//     email:email,
//     password:password,
//     activities:JSON.stringify([]),
//     dailytask:JSON.stringify([]),
//     dashboardwidget:JSON.stringify([]),
//     day:JSON.stringify([]),
//     notification:JSON.stringify([]),
//     objective:JSON.stringify([]),
//     song:JSON.stringify([]),
//     todaytask:JSON.stringify([]),
//     widgettask:JSON.stringify([]),
//   }).then(x=>{
//     cookies().set('token', x.id, { maxAge: 60*60*24*7 })
//   })

// }

async function createTodo(prevState: any, formData: FormData) {
  const schema = z.object({
    todo: z.string().min(1),
  })
  const data = schema.parse({
    todo: formData.get('todo'),
  })

  try {
    
    revalidatePath('/')
    cookies().set('token', 'salut toi', { maxAge: 60*60*24*7 })
    return { message: `Added todos ${data.todo}` }
  } catch (e) {
    return { message: 'Failed to create todo' }
  }
}

async function deleteTodo(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  })
  const data = schema.parse({
    id: formData.get('id'),
    todo: formData.get('todo'),
  })

  try {
    cookies().delete('token')

    revalidatePath('/')
    return { message: `Deleted todo ${data.todo}` }
  } catch (e) {
    return { message: 'Failed to delete todo' }
  }
}

// async function loginRegister(data:FormData2){

//   if(data.firstname){
//     return 'eheh'
//   }else{
//     return 'ahah'
//   }

// }

async function checkIfUser(email:string){
  let sql = `SELECT * FROM users WHERE email = '${email}'`

  let tmp

  await sequelize.query(sql, {type: QueryTypes.SELECT}).then(x=>{
    console.log(x.length,email,x)
    if(x.length>0){
      tmp = true
    }else{
      tmp = false
    }
  })

  return tmp

}


async function registerAction(data:FormData2){

  if(data.password!==data.confirmpassword) return `${data.password} ${data.confirmpassword}`

  let isUser = await checkIfUser(data.email)

  console.log(isUser,data.email)

  if(isUser) return { status:303,error:`cette email a déja un compte`,message:"" }

  try {
    await User.create({
      firstname:data.firstname,
      lastname:data.lastname,
      email:data.email,
      password:data.password,
      activities:JSON.stringify({}),
      dailytask:JSON.stringify({}),
      dashboardwidget:JSON.stringify([]),
      day:JSON.stringify({}),
      notification:JSON.stringify([]),
      objective:JSON.stringify({}),
      song:JSON.stringify([]),
      todaytask:JSON.stringify({}),
      widgettask:JSON.stringify([]),
    }).then((x:any) => {
  
      cookies().set('token',`${x.id}`)
      return { status:202,error:``,message:`Register succesfull` }
  
    });
  } catch (error) {
    return { status:505,error:`${error}`,message:`` }
  }


}

async function loginAction(data:FormData2){

  let sql = `SELECT * FROM users WHERE email = '${data.email}' AND password = '${data.password}'`

  let tmp

  await sequelize.query(sql, {type: QueryTypes.SELECT}).then((x:any)=>{
    let user = x[0]
    if(x.length>0){
      cookies().set('token',`${user.id}`)
      tmp = { status:200,error:``,message:`Succesfull login` }
    }else{
      tmp = { status:300,error:`Not user find`,message:`` }
    }
  })

  return tmp
  
  // cookies().set('name','login'+data.email)
  // return 'login func'

}

export { create,createTodo,deleteTodo,registerAction,loginAction }