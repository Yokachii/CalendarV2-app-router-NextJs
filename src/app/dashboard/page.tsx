import { sql } from '@vercel/postgres'
import { AddForm } from '@/components/add-form/index'
import { DeleteForm } from '@/components/delete-form/index'

export const runtime = 'edge'
export const preferredRegion = 'home'

export default async function Home() {
  let data = [{id:"1",text:'salut'}]

  return (
    <main>
      <h1 className="sr-only">Todos</h1>
      <AddForm />
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <DeleteForm id={todo.id} todo={todo.text} />
          </li>
        ))}
      </ul>
    </main>
  )
}