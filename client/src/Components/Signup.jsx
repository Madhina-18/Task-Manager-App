
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useEffect } from 'react';
import axios from "axios";



{/*React icons*/ }
import { BsEye } from "react-icons/bs";
import signImg from "../assets/s.png";
import { useNavigate } from 'react-router-dom';
import auth from '../config/firebase';







function Signup() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 


  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        navigate("/login")
      }

    })
  }, []);



 


  const handleSumbit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('password do not match');
      return;
    }

    
  

   createUserWithEmailAndPassword(auth,email,password).then(async (res)=>{

      console.log(res._tokenResponse)
      const uid = res.user.uid
      
      try {
         await axios.post('http://localhost:5000/api/signup', {
            uid : uid,
            email : email
         });
         console.log("User Data Sent To MongoDB");
         navigate ('/login');

      } catch (error) {
            console.log("Error Saving User To MongoDB" , error);
      }
      
      navigate("/login")
  
    }).catch(()=>{
      console.log("Failed to add User")
    })

     console.log('User registered:', { email, password });
     navigate('/login')
  }





  






  return (
    <>
      {/*Starting and Overall Part*/}
      <div className='bg-gray-300 mt-5  min-h-screen  flex  justify-center shadow-2xl items-center '>


        {/*Inside  part*/}
        <div className='bg-gray-100 m-2 flex rounded-2xl p-2  items-center'>

          {/*Inside Container*/}
          <div className='md:w-1/2 px-16 '>



            {/*Heading part*/}
            <h2 className='font-serif text-2xl  text-black'>Sign Up</h2>
            <p className='text-sm font-serif mt-4  text-gray-700'>If You Already A Membership,Easily Log in</p>



            {/*Input Part*/}
            <form onSubmit={handleSumbit} 
              className='flex flex-col gap-4'>

              {/*Email*/}
              <input className='p-2 mt-8 rounded-xl border border-gray-700  focus:outline-none'


                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email' />

              <div className='relative'>

                {/*Password*/}
                <input className='p-2 rounded-xl mt-8 w-full  border  border-gray-700 focus:outline-none'


                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  required />



                <p className='absolute top-1/2 right-3 fill-gray-500 translate-y-1/2 '> <BsEye /></p>





              </div>


              <div className='relative'>

                {/*Conform Password*/}
                <input className='p-2 rounded-xl mt-8 w-full border  border-gray-700  focus:outline-none'


                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Confirm Password '
                  required/>

                <p className='absolute top-1/2 right-3 fill-gray-500 translate-y-1/2 '> <BsEye /></p>
                
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

             
              
              <div className='text-sm  font-serif flex justify-between items-center mt-5'>
                  
                <p className='font-serif text-gray-700 ml-2 ' onClick={() => navigate("/login")}>Already have an account ? Login Here....</p>
              </div>


              <button type='submit' className='bg-gray-700 rounded-xl text-white mt-3 py-3 hover:scale-105 duration-300 font-medium  '

                

              >Register</button>



            </form >











          </div>

          {/*image part*/}
          <div className=' md:block hidden'>
            <img className='
             
             rounded-2xl w-[250px] h-[550px]'  src={signImg}></img>
          </div>



        </div>





      </div>



    </>

  )
}

export default Signup
