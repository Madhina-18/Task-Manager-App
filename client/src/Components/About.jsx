import React from 'react';
import lap from "../assets/lap.png";
import Footer from '../common/Footer';


function About() {

    return (

        
        <>
            

            <div className='flex justify-center bg-slate-200 shadow-2xl mt-14 py-8 m-8 p-5'>
                

                <div>


                    <div className=' md:block  w-[87%]'>
                        <img src={lap}></img>
                    </div>

                </div>


                <div>
                    <h1 className='text-4xl font-serif flex justify-center'>About My Task Manager App</h1>
                    <p className='text-2xl font-serif mt-7 '>About Task Management App

                        The Task Management App is a powerful tool designed to help users organize, prioritize, and track their tasks effectively. It allows individuals and teams to create tasks, set deadlines, assign priorities, and monitor progress in real time. With features like reminders, task categorization, and collaboration tools, this app ensures better productivity and time management.

                        Whether you’re managing personal goals or team projects, the Task Management App provides a user-friendly interface and flexible features to keep you on track and boost efficiency.</p>
                </div>
                
               
            </div>

            <Footer></Footer>

        </>
    )














}

export default About