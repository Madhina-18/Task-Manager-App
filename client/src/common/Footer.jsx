import React from 'react';
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";



import { motion } from 'framer-motion'

function Footer() {
  return (

    <>
      <motion.footer


        initial={{ opacity: 0, translateX: "100%" }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 2 }}


        class=" bg-gray-500 text-white p-10  mt-8 overflow-hidden   ">

        <div className="flex  flexgap-2">

          <div className="flex flex-col justify-between text-center gap-5 font-serif  ">

            <p className=' hover:text-black cursor-pointer'>TaskHive Business</p>
            <p className=' hover:text-black cursor-pointer'>Teach On TaskHive</p>
            <p className=' hover:text-black cursor-pointer'>Get the App</p>
            <p className=' hover:text-black cursor-pointer'>Contact Us</p>
            <p className=' hover:text-black cursor-pointer'>About Us</p>
          </div>
          <div className="flex flex-col justify-between text-center">
            <p className=' hover:text-black cursor-pointer'>Careers</p>
            <p className=' hover:text-black cursor-pointer'>Blog</p>
            <p className=' hover:text-black cursor-pointer'>Affiliate</p>
            <p className=' hover:text-black cursor-pointer'>Investors</p>
            <p className=' hover:text-black cursor-pointer'>Help and Support</p>
          </div>


        </div>

        <div className="flex flex-row gap-4 text-2xl justify-end  ">
          <p className='animate-bounce hover:text-pink-700 cursor-pointer' ><RiInstagramFill /></p>
          <p className='animate-bounce hover:text-blue-500 cursor-pointer' ><FaTwitter /></p>
          <p className='animate-bounce hover:text-red-700 cursor-pointer'><GrYoutube /></p>
        </div>

        <p className="flex justify-end cursor-pointer ">@2024 TaskHive All rights reserved</p>

      </motion.footer>

    </>
  )
}




export default Footer