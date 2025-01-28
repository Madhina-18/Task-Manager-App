import React, { useContext } from 'react';
import LogImg from "../assets/l.png";
import { BsEye } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../config/firebase';
import { useState } from 'react';
import { useEffect } from 'react';

import { UserContext } from '../Context/UserContext';





function Login() {



  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState("");

 

  const {setUser} = useContext(UserContext)


  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      // if (user) {
      //   navigate("/dashboard")
      // }

    })
  }, []);




  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;

      setUser({
        uid:user.uid,
        email:user.email,
      });

      console.log("User Id :",user.uid);
      console.log("User Email:",user.email);

      navigate('/dashboard');
    } catch(err){
      console.error(err)
      setErr("Error Signing in,Please try again")
    }
    
  }



  return (
    <>
      {/*Starting and Overall Part*/}
      <div className='bg-gray-300 min-h-screen  mt-5 flex  justify-center shadow-2xl items-center '>


        {/*Inside  part*/}
        <div className='bg-gray-100 m-2 flex rounded-2xl p-2  items-center'>

          {/*Inside Container*/}
          <div className='md:w-1/2 px-16 '>



            {/*Heading part*/}
            <h2 className='font-serif text-2xl text-black '>Login</h2>
            <p className='text-sm font-serif mt-4 text-gray-700'>If You  are a New user ? then, Register here...!</p>



            {/*Input Part*/}
            <form onSubmit={handleLogin}
              className='flex flex-col gap-4'>
             
              <input className='p-2 mt-8 rounded-xl border border-gray-700  focus:outline-none'

                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required placeholder='Email' />
              
              <div className='relative'>
                <input className='p-2 rounded-xl mt-8 w-full border border-gray-700   focus:outline-none'


                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required placeholder='Password ' />

                <p className='absolute top-1/2 right-3 fill-gray-500 translate-y-1/2 '> <BsEye /></p>


              </div>

              <button className='bg-gray-700  shadow-2xl rounded-xl text-white mt-3 py-3 hover:scale-105 duration-300'>Login</button>
            </form>







            <p className='font-serif mt-3 text-red-600'>{err}</p>


            <div className='text-sm flex justify-between items-center mt-3'>

              <p className='font-serif mt-5 mr-7 text-gray-600'>New user...Click  here...</p>
              <button className='py-2 mt-5 px-5 bg-white rounded-xl   border-gray-700 border hover:scale-110 duration-300 font-medium' onClick={() => navigate("/signup")}>Register</button>
            </div>

          </div>

          {/*image part*/}
          <div className=' md:block hidden'>
            <img className='
            
            rounded-2xl w-[250px] h-[550px]'  src={LogImg}></img>
          </div>



        </div>





      </div>



    </>

  )
}

export default Login
