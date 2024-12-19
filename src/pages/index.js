/*
![1.] Welcome Message and Confirmation to view more
![2.] Show starting what and how and why etc
![3.] Show ultimate everything.
![4.] End with a thank you and a call to action.
*/

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import addSession, { getPass } from '../services/server'

export default function Home () {
  const [name, setName] = useState('')
  const [passkey, setPasskey] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(true)
  const [pass, setPass] = useState('')
  const router = useRouter()

  useEffect(() => {
    getPass()
      .then(password => {
        setPass(password)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const requestFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    requestFullscreen()
    if (passkey === pass) {
      addSession(name, passkey).then(() => {
        setMessage('Access Granted')
        setMessageType('success')
        localStorage.setItem('name', name)

        setTimeout(() => {
          router.push('/screens/step2')
        }, 1000)
      })
    } else {
      setMessage('Access Denied')
      setMessageType('error')
    }
  }

  return (
    <div className='relative flex flex-col min-h-screen bg-rose-50'>
      <div className='mountain-bg'></div>
      <nav className='relative z-10 bg-rose-800 p-4'>
        <div className='container mx-auto z-10'>
          <div className='flex justify-between items-center'>
            <h1 className='text-white text-2xl font-bold'>Step 1</h1>
            <div className='w-64 bg-rose-600 h-2 rounded-full'>
              <div className='w-1/4 bg-rose-400 h-2 rounded-full'></div>
            </div>
          </div>
        </div>
      </nav>
      <div className='relative z-10 flex flex-col flex-1 justify-center items-center'>
        <h1 className='text-rose-800 text-4xl font-bold mb-8'>Welcome</h1>
        {loading ? (
          <div className='flex justify-center items-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500'></div>
          </div>
        ) : (
          <form className='flex flex-col gap-4 z-10' onSubmit={handleSubmit}>
            <input
              className='p-2 rounded-md border-2 border-rose-300'
              type='text'
              placeholder='Enter your name'
              value={name}
              autoComplete='off'
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              className='p-2 rounded-md border-2 border-rose-300'
              type='password'
              placeholder='Enter PassKey To Access'
              value={passkey}
              autoComplete='off'
              onChange={e => setPasskey(e.target.value)}
              required
            />
            <button
              className='bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-md'
              type='submit'
            >
              Access
            </button>
          </form>
        )}
      </div>
      {message && (
        <div
          className={`fixed bottom-0 left-0 right-0 flex items-center justify-between p-4 shadow-lg ${
            messageType === 'success' ? 'bg-rose-500' : 'bg-red-500'
          }`}
        >
          <div className='flex items-center'>
            <span className='text-white ml-2'>{message}</span>
          </div>
          <button
            onClick={() => setMessage('')}
            className='text-white hover:text-rose-200 focus:outline-none'
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
