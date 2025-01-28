import React from 'react';
import HomeImg from "../assets/homeimg.png";

import One from "../assets/one.png";
import Two from "../assets/two.png";
import Three from "../assets/three.png";
import Four from "../assets/four.png";
import Six from "../assets/six.png";


import Clock from "../assets/c.png";
import P from "../assets/p.png";
import P2 from "../assets/p2.png";
import P3 from "../assets/p3.png";


import Last from "../assets/last.png"
import Footer from '../common/Footer';




{/*Framer Motion*/}
import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom';

function Home() {

   const navigate = useNavigate()
   return (


      <>

         
         {/*Section-1*/}
         <div className='flex  items-center justify-center bg-slate-200 m-3 overflow-hidden  shadow-xl rounded-md p-5'>


            <motion.div

               initial={{ opacity: 0, translateX: "-100%" }}
               whileInView={{ opacity: 1, translateX: 0 }}
               transition={{ duration: 4 }}

               className="w-full sm:w-1/2 flex-col justify-center">
               <h2 className='text-3xl md:text-5xl font-serif pb-2'> I Am Arjun</h2>
               <h2 className=' text-3xl font-serif'>Welcome to my <span className='text-[#FF0000]'>Task Management </span> App</h2>
               <img src={HomeImg} className='w-60 block sm:hidden' alt="Blog heading" />
               <p className='py-2 font-medium'> A simple and efficient tool designed to help you organize, prioritize, and track your tasks effortlessly. Stay productive with features like task creation, deadlines, and progress monitoring—all in one place!</p>
               <button className='button-style  '>Get Started</button>
            </motion.div>





            <motion.div


               initial={{ opacity: 0, translateX: "100%" }}
               whileInView={{ opacity: 1, translateX: 0 }}
               transition={{ duration: 2 }}


               className='justify-center hidden sm:block'>
               <img src={HomeImg} className='w-60 md:w-96  ' alt="Blog small " />

            </motion.div>

         </div>


         {/*Section-2*/}

         <motion.div


            initial={{ opacity: 0, translateY: "+50%" }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 2 }}


            className='flex justify-evenly flex-wrap overflow-hidden  '>
            <img src={One} style={{ width: "200px" }} alt="one" />
            <img src={Two} style={{ width: "200px" }} alt="two" />
            <img src={Three} style={{ width: "200px" }} alt="three" />
            <img src={Four} style={{ width: "200px" }} alt="four" />
            <img src={Six} style={{ width: "200px" }} alt="five" />
            <img src={One} style={{ width: "200px" }} alt="one" />
         </motion.div>


         {/*Section-3*/}


         <motion.div



            initial={{ opacity: 0, translateY: "+50%" }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 2 }}


            className='flex flex-col m-8 overflow-hidden  items-center bg-slate-200 shadow-xl rounded-md p-10 justify-around sm:flex-row'>
            <div className='flex-col'>
               <div className='mt-4 border-[6px] rounded-lg border-black p-5 border-t-0 w-60 flex-col items-center'>
                  <div className='rounded-full border-2 p-5 font-bold text-white text-center bg-gradient-to-br from-purple-200 to-black'>10</div>
                  <p className='text-center font-serif'>Task Completed List</p>
               </div>
               <div className='mt-4 border-[6px] rounded-lg border-[#FF0000] p-5 border-t-0 w-60 flex-col items-center'>
                  <div className='rounded-full border-2 p-5 font-bold text-white text-center bg-gradient-to-br   from-green-200 to-[#FF0000]'>8</div>

                  <p className='text-center font-serif'>Task InCompleted List</p>
               </div>
            </div>

            <div className='ml-4 mt-4 sm:mt-0'>
               <h2 className='text-3xl sm:text-5xl font-serif text-[#22C6F0]'>Create a Plan for a Business</h2>
               <h2 className='text-3xl sm:text-4xl  font-serif text-black'>Today's Scedule</h2>
               <p className='my-2 font-serif mr-6'>Click to view more...here</p>
               <button className='button-style mt-2'>Click It</button>

            </div>




         </motion.div>


         {/*Section-4*/}


         <motion.div



            initial={{ opacity: 0, translateY: "+50%" }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 2 }}


            className='bg-slate-200 m-8 overflow-hidden   shadow-2xl rounded-md p-10 '>

            <h2 className='text-center text-5xl my-14 font-serif'>Simple Way to manage Your  <span className='text-[#FF0000]'>Tasks</span> Here</h2>
            <div className='flex justify-around my-9 flex-col  gap-7 sm:flex-row '>


               <div  >
                  <img src={Clock} className='w-64 border rounded-md cursor-pointer' alt="Clock " />
                  <h1 className=' text-2xl font-serif flex justify-center mt-7'>Task Planning</h1>
               </div>


               <div >
                  <img src={P} className='w-64 border rounded-md cursor-pointer' alt="Clock " />
                  <h1 className=' text-2xl font-serif flex justify-center mt-7'>Check List</h1>
               </div>

               <div >
                  <img src={P2} className='w-64 border rounded-md cursor-pointer' alt="Clock " />
                  <h1 className=' text-2xl font-serif flex justify-center mt-7 '>Team Work</h1>
               </div>

               <div >
                  <img src={P3} className='w-64 border rounded-md  cursor-pointer' alt="Clock " />
                  <h1 className=' text-2xl font-serif flex justify-center mt-7'>Colloboration </h1>
               </div>







            </div>
         </motion.div>




         {/*Section-5*/}


         <motion.div


            initial={{ opacity: 0, translateY: "+50%" }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 2 }}


            className="text-center overflow-hidden  bg-slate-200 m-8 shadow-2xl rounded-md p-10  ">

            <h1 className="text-5xl font-sans mt-5 text-center p-3">Join our News Letter</h1>
            <p className='font-serif'>Sign up for our email newspaper to get exclusive discounts,updates,and more</p>
            <input type="text" className=" p-2 m-4 w-[80%] focus:outline-none border border-[#22C6F0] " /> <br></br>
            <button className="button-style" >Subscribe</button>

         </motion.div>





         {/*Section-6*/}


         <motion.div


            initial={{ opacity: 0, translateX: "-100%" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 2 }}







            className='flex items-center overflow-hidden  justify-center my-14 m-8 shadow-2xl rounded-md bg-slate-200 p-10'>
            <div className='justify-center '>
               <img src={Last} className='w-60 md:w-96 rounded-md ' alt="last " />

            </div>
            <div className="w-full sm:w-1/2 flex-col justify-center ml-14">
               <h2 className='text-3xl md:text-6xl font-serif pb-2'>Organize Smarter</h2>
               <h2 className='text-4xl md:text-7xl font-serif text-[#22C6F0] py-2'>Achieve Faster..!</h2>

               <p className='py-2 font-serif'> Explore my Task Manager app Dashboard to discover powerful tools and insights for seamless task organization and productivity enhancement.</p>
               <button className='button-style' onClick={() => navigate("/dashboard")} >Read My Dashboard ➜ </button>
            </div>





         </motion.div>




         <Footer></Footer>








      </>




   )
}

export default Home
