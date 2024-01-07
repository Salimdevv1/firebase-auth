import React, { useEffect, useState } from 'react'
import {auth} from '../config/firebase-config'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import {db} from "../config/firebase-config"
import {getDocs , collection , addDoc , doc , deleteDoc , updateDoc} from 'firebase/firestore'

export default function Home() {
    const [dataBase , setDataBase] = useState([])
    const date = new Date()
    const blogsCollectionRef = collection(db ,"blogs")
    const [blogTitle , setBlogTitle] = useState('')
    const [blogDescription , setBlogDescription] = useState('')
    const [blogAuthor , setBlogAuthor] = useState('')
    const [blogDate , setBlogDate] = useState(date.getFullYear())

    const [updatedBlogTitle , setUpdatedBlogTitle] = useState('')
    const navigate = useNavigate()
    const logout= async()=>{
        try {
            await signOut(auth)
            navigate("/")
            navi
        }catch(err) {
            console.error(err)
        }
    }
    useEffect(()=>{
        const getBlogs = async()=>{
            try {
                const data = await getDocs(blogsCollectionRef)
                const filteredData = data.docs.map((doc)=>({
                    ...doc.data(),
                    id: doc.id,
                }))
                setDataBase(filteredData)
            } catch (error) {
                console.log(error)
            }
        }
        getBlogs()
    })
    const addBlog = async()=>{
        try {
            await addDoc(blogsCollectionRef ,{
                author : blogAuthor ,
                date : blogDate,
                description : blogDescription ,
                title : blogTitle ,
                userId : auth?.currentUser?.uid
            })
        } catch (error) {
            console.log(error)
        }
    }
    const deleteBlog =async(id)=>{
        const blogDoc = doc(db ,"blogs" , id);
        await deleteDoc(blogDoc)
    }
    const updateTitle =async(id , )=>{
        const blogDoc = doc(db ,"blogs" , id);
        await updateDoc(blogDoc , {
            title : updatedBlogTitle
        })
    }
  return (
    <div>
       Welcome to Salim's Shop 
       <button onClick={logout}>Logout</button>
        {dataBase.map((e)=>(
            <div>
                <p>{e.title}</p>
                <p>{e.description}</p>
                <p>ReleaseDate :{e.date}</p>
                <p>Author : {e.author}</p>
                <button onClick={()=>deleteBlog(e.id)}>
                    Delete Blog
                </button>
                <input onChange={(e)=>setUpdatedBlogTitle(e.target.value)} type="text" placeholder='New blog Title' />
                <button onClick={()=>updateTitle(e.id)}>
                    Update title
                </button>
            </div>
        ))}
        <br /><br />
        <div>
            <input onChange={(e)=>setBlogTitle(e.target.value)} type="text" placeholder='Blog Title' />    
            <input onChange={(e)=>setBlogDescription(e.target.value)} type="text" placeholder='Blog Description' />
            <input onChange={(e)=>setBlogAuthor(e.target.value)} type="text" placeholder='Blog Author' />
            <button onClick={()=>addBlog()} >
                Add Blog
            </button>
        </div>        
    </div>
  )
}
