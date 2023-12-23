'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function NewPage({ params }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title)
          setDescription(data.description)
        })
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (params.id) {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
    } else {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
    }
    router.refresh()
    router.push('/')
  }
  return (
    <div className='h-screen flex justify-center items-center'>
      <form onSubmit={onSubmit} className='bg-slate-900 p-10 w-1/2'>
        <label htmlFor='title' className='font-bold text-sm'>
          Titulo de la tarea
        </label>
        <input
          type='text'
          id='title'
          className='border border-gray-400 p-2 mb-4 w-full text-black'
          placeholder='Titulo'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor='description' className='font-bold text-sm'>
          Descripcion de la tarea
        </label>
        <textarea
          id='description'
          rows='3'
          className='border border-gray-400 p-2 mb-4 w-full text-black'
          placeholder='Describe tu tarea'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>

        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Crear
        </button>
        {params.id && (
          <button
            type='button'
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4'
            onClick={async () => {
              const res = await fetch(`/api/tasks/${params.id}`, {
                method: 'DELETE',
              })
              const data = await res.json()
              console.log(data)
              router.refresh()
              router.push('/')
            }}
          >
            Delete
          </button>
        )}
      </form>
    </div>
  )
}

export default NewPage
