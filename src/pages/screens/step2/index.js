/*
![1.] Welcome Message and Confirmation to view more
![2.] Show starting what and how and why etc
![3.] Show ultimate everything.
![4.] End with a thank you and a call to action.
*/

import { useState } from 'react'
import { useRouter } from 'next/router'
import { updateSession } from '../../../services/server'

export default function Step2 () {
  const router = useRouter()

  const handleAgree = () => {
    const name = localStorage.getItem('name')
    updateSession(name, 'step2', 'she agreed').then(() => {
      router.push('/screens/step3')
    })
  }

  return (
    <>
      <div className='flex flex-col h-screen bg-rose-50'>
        <nav className='bg-rose-100 p-4'>
          <div className='container mx-auto'>
            <div className='flex justify-between items-center'>
              <h1 className='text-rose-800 text-2xl font-bold'>
                Step 2 : Agreement
              </h1>
              <div className='w-64 bg-rose-200 h-2 rounded-full'>
                <div className='w-2/4 bg-rose-400 h-2 rounded-full'></div>
              </div>
            </div>
          </div>
        </nav>
        <div className='flex flex-col flex-1 justify-center items-center px-4'>
          <div className='max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg'>
            <div className='flex flex-col items-center'>
              <p className='text-rose-700 text-2xl font-bold mb-8 text-center'>
                Okay, Now I know It's You. But still
              </p>
            </div>
            <p className='text-rose-800 text-2xl font-bold mb-8 text-center'>
              Please read the following agreement carefully and click on the
              button below to continue.
            </p>

            <div className='bg-rose-50 p-6 rounded-md mb-8 max-h-96 overflow-y-auto'>
              <p className='text-rose-900 leading-relaxed'>
                By proceeding further, you agree to the following terms and
                conditions:
                <br />
                <br />
                1. You understand that all information provided is confidential.
                <br />
                <br />
                2. You agree to maintain the privacy and security of any
                information shared.
                <br />
                <br />
                3. You acknowledge that this is a secure environment and will
                respect all guidelines.
                <br />
                <br />
                4. You will not share or distribute any information without
                proper authorization.
              </p>
            </div>

            <div className='flex justify-center'>
              <button
                onClick={handleAgree}
                className='bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-md transition-colors'
              >
                I Agree & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
