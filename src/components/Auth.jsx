import React, { useState } from 'react'
import {auth ,GoogleProvider} from '../config/firebase-config'
import {createUserWithEmailAndPassword ,signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
export default function Auth() {
    const [email , setEmail] = useState('')
    const navigate = useNavigate()
    const [password , setPassword] = useState('')
    console.log(auth?.currentUser?.email)
    const signIn =async()=>{
        try {
            await createUserWithEmailAndPassword(auth , email , password)
            navigate("/home")

        } catch(err){
            console.log(err)
        }
    }
    const signInWithGoogle =async ()=>{
        try {
            await signInWithPopup(auth ,GoogleProvider)
            navigate("/home")

        } catch(err){
            console.log(err)
        }
    }
  return (
    <div style={{display :"flex" , flexDirection :"column" , gap : 20}}>
        <input style={{padding: 10}} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email' />
        <input style={{padding: 10}} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password' />
        <button style={{padding: 10}} onClick={signIn}>Login</button>
        <button style={{padding: 10}} onClick={signInWithGoogle}>Continue with Google</button>
    </div>
  )
}
