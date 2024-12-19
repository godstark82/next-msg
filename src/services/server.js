import { db } from './config'
import { setDoc, doc, updateDoc, getDoc } from 'firebase/firestore'

export async function getPass () {
  const docRef = doc(db, 'data', 'pass')
  const docSnap = await getDoc(docRef)
  return docSnap.data()['password']
}

export async function getData () {
  const docRef = doc(db, 'data', 'msgs')
  const docSnap = await getDoc(docRef)
  return docSnap.data()['msg']
}

export async function updateSession (name, step, data) {
  try {
    await updateDoc(doc(db, 'sessions', name), { [step]: data })
    console.log('Session updated successfully')
  } catch (error) {
    console.warn('Failed to update session:', error)
  }
}

export default async function addSession (name, passkey) {
  try {
    const session = {
      name,
      passkey,
      createdAt: new Date()
    }
    await setDoc(doc(db, 'sessions', name), session)
    console.log('Session added successfully')
  } catch (error) {
    console.warn('Failed to add session:', error)
  }
}
