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
      <div className='flex flex-col h-screen bg-rose-50'>
        <nav className='bg-rose-100 p-4'>
          <div className='container mx-auto'>
            <div className='flex justify-between items-center'>
              <h1 className='text-rose-800 text-2xl font-bold'>
                Step 3 : Game Start
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
                Game Start
              </p>
            </div>
            <p className='text-rose-800 text-2xl font-bold mb-8 text-center'>
              Okay So This is why it is
            </p>

            <div className='bg-rose-50 p-6 rounded-md mb-8 max-h-96 overflow-y-auto'>
              {loading ? (
                <div className='flex justify-center items-center h-32'>
                  <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500'></div>
                </div>
              ) : (
                <p className='text-rose-900 leading-relaxed'>
                  {textLines.slice(0, visibleLines).map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              )}
            </div>

            <div className='flex justify-center gap-4'>
              {!loading && visibleLines >= textLines.length ? (
                <>
                  <button
                    onClick={handleNo}
                    className='bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md transition-colors'
                  >
                    NO
                  </button>
                  <button
                    onClick={handleYes}
                    className='bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-md transition-colors'
                  >
                    YES
                  </button>
                </>
              ) : (
                !loading && (
                  <button
                    onClick={handleReadMore}
                    className='bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-md transition-colors'
                  >
                    Read More
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
