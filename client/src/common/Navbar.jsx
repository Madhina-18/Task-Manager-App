import React from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import auth from '../config/firebase';
import { signOut } from 'firebase/auth';


function Navbar() {

    const navigate = useNavigate();
    const [log, setLog] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                setLog(true)
                console.log(" User Logged In")
            }
            else {
                setLog(false)
                console.log("User Logged Out")
            }
        })
    }, [])


    function logout() {
        signOut(auth)
    }


    return (
        <>

            <div className='py-3 shadow-xl  flex flex-col md:flex-row  justify-between overflow-hidden items-center  bg-slate-300 p-4'>
                <h2 className='text-2xl font-serif hidden md:block tracking-wider ml-2 text-black'>TaskHive</h2>


                <div className='flex text-gray-950  items-center font-serif  md:px-5 gap-9 px-2 '>


                    <Link className=' hover:text-blue-700 cursor-pointer animate-pulse duration-500' to={"/home"}>Home</Link>
                    <Link className=' hover:text-blue-700 cursor-pointer animate-pulse duration-500' to={"/about"}>About</Link>
                    <Link className=' hover:text-blue-700 cursor-pointer animate-pulse duration-500' to={"/contact"}>Contact</Link>
                    <Link className=' hover:text-blue-700 cursor-pointer animate-pulse duration-500' to={"/dashboard"}>DashBoard</Link>
                </div>



                {
                    log ? <button className='button-style ' onClick={logout} >Logout </button> : <button className='button-style ' onClick={() => navigate("/login")} >Login </button>
                }





            </div>




        </>
    )
}

export default Navbar