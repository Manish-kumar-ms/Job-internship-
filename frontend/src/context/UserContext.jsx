import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


export const UserDataContext  = createContext();

const UserContext=({children})=>{
    const serverUrl = "http://localhost:8000";
    const [userData,setUserData]=useState(null)

    const [loading,setLoading]=useState(true)

    const handleCurrentUser=async()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/auth/currentuser`,{withCredentials:true})
            setUserData(result.data.user)
        } catch (error) {
            setUserData(null)
        }finally{
            setLoading(false)
        }
    }


    useEffect(()=>{
        handleCurrentUser()
    },[])

   const value={
       userData,
       loading,
       serverUrl,
       setUserData
   }

   return (
       <UserDataContext.Provider value={value}>
           {children}
       </UserDataContext.Provider>
   )
}


export default UserContext