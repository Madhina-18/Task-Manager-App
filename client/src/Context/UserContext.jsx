import {createContext,useState,useEffect } from "react";


//Create Context 

export const UserContext = createContext();



export const UserProvider = ({children}) => {

   const [user,setUser] = useState(()=>{
    const beforeUser = localStorage.getItem("user");
    return beforeUser ? JSON.parse(beforeUser) : {uid: "", email: ""}

   });




    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(user));
    })


    return (
        <UserContext.Provider value={{user,setUser}}>
          {children}
        </UserContext.Provider>
    )
}