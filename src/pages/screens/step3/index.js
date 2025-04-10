/*
![1.] Welcome Message and Confirmation to view more
![2.] Show starting what and how and why etc
![3.] Show ultimate everything.
![4.] End with a thank you and a call to action.
*/

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { updateSession, getData } from '../../../services/server'

export default function Step3 () {
  const router = useRouter()
  const [visibleLines, setVisibleLines] = useState(5)
  const [textLines, setTextLines] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
      .then(data => {
        setTextLines(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const handleYes = () => {
    const name = localStorage.getItem('name')
    updateSession(name, 'step3', 'she said yes').then(() => {
      alert("I can't believe you said yes! Can you call me? and confirm it?")
    })
  }

  const handleNo = () => {
    const name = localStorage.getItem('name')
    if (confirm('Are you sure?')) {
      if (confirm('Are you really really sure?')) {
        updateSession(name, 'step3', 'she said no').then(() => {
          if (confirm(' 😢 I understand...')) {
            // window.close()
          }
        })
      } else {
        handleYes()
      }
    } else {
      handleYes()
    }
  }

  const handleReadMore = () => {
    if (visibleLines < textLines.length) {
      setVisibleLines(prev => prev + 1)
    }
  }

  return (
    <>
      <div className='flex flex-col h-screen bg-rose-50 relative'>
        {/* Decorative teddy bears using emoji and CSS */}
        <div className='absolute top-4 left-4 text-4xl animate-bounce'>
          🧸
        </div>
        <div className='absolute top-4 right-4 text-4xl animate-pulse'>
          🧸
        </div>
        
        <nav className='bg-rose-100 p-4'>
          <div className='container mx-auto'>
            <div className='flex justify-between items-center'>
              <h1 className='text-rose-800 text-2xl font-bold'>Cutieeeee...</h1>
              <div className='w-64 bg-rose-200 h-2 rounded-full'>
                <div className='w-2/4 bg-rose-400 h-2 rounded-full'></div>
              </div>
            </div>
          </div>
        </nav>
        <div className='flex flex-col flex-1 justify-center items-center px-4'>
          <div className='max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg relative'>
            {/* Teddy bear peeking from top of card */}
            <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 text-5xl'>
              🧸
            </div>
            
            <div className='flex flex-col items-center'>
              <p className='text-rose-700 text-2xl font-bold mb-8 text-center'></p>
            </div>
            <p className='text-rose-800 text-2xl font-bold mb-8 text-center'></p>

            <div className='bg-rose-50 p-6 rounded-md mb-8 max-h-[70vh] overflow-y-auto border-2 border-rose-200 relative'>
              {/* Small teddy in corner of text box */}
              <div className='absolute bottom-2 right-2 text-2xl opacity-80'>
                🧸
              </div>
              
              {loading ? (
                <div className='flex justify-center items-center h-32'>
                  <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500'></div>
                </div>
              ) : (
                <>
                  <p className='text-rose-900 leading-relaxed'>
                    {textLines.map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                 
                </>
              )}
            </div>
            {/* Teddy bear decorations around content */}
            <div className='flex justify-center items-center gap-4 mb-4'>
              <span className='text-4xl transform rotate-[-15deg]'>🧸</span>
              <span className='text-5xl'>❤️</span>
              <span className='text-4xl transform rotate-[15deg]'>🧸</span>
            </div>
            
            {/* Teddy bear border effect */}
            <div className='border-2 border-rose-200 p-4 rounded-lg mb-4'>
              <div className='flex justify-between'>
                <span className='text-2xl'>🧸</span>
                <span className='text-2xl'>🧸</span>
              </div>
              <p className='text-center text-rose-700 my-2'>
                Sorryyyyyyyyy pookie... 🤗
              </p>
              <div className='flex justify-between'>
                <span className='text-2xl'>🧸</span>
                <span className='text-2xl'>🧸</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom corner teddies */}
        <div className='absolute bottom-4 left-4 text-4xl animate-pulse'>
          🧸
        </div>
        <div className='absolute bottom-4 right-4 text-4xl animate-bounce'>
          🧸
        </div>
      </div>
    </>
  )
}
