'use server'
 
import { cookies } from 'next/headers'
// import User from '../module/model/user'
// import sequelize from '../module/sequelize'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

type FormData2 = {
  firstname:string;
  lastname:string;
  email:string;
  password:string;
  confirmPassword:string;
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

async function loginRegister(data:FormData2){

  if(data.firstname){
    return 'eheh'
  }else{
    return 'ahah'
  }

}

const envoyerFormulaire = async (data: FormData) => {
  // Effectuez vos opérations ici, par exemple, envoyez les données au serveur
  console.log('Envoi du formulaire:', data);
};

export { create,createTodo,deleteTodo,loginRegister,envoyerFormulaire }