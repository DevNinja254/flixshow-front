import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdEmail as Email} from "react-icons/md";
import { FaSquareWhatsapp as Whatsapp } from "react-icons/fa6";
import { PiPhoneCallFill as Call } from "react-icons/pi";
import { MdMessage as Message } from "react-icons/md";
import { FaFacebookF as Facebook } from "react-icons/fa";
import { FaInstagramSquare as Insta } from "react-icons/fa";
import { FaTwitter as Twitter } from "react-icons/fa";
const MainFooter = () => {
  return (
    <footer className='bg-black bg-opacity-95 p-3 text-white '>
        <div className='md:flex justify-evenly items-center lg:w-5/6 m-auto xl'>
        <h2 className='text-red-800 text-center font-bold tracking-wide text-lg my-2 md:text-xl 2xl:w-4/5'>KingstoneMovies</h2>
        <section className='md:flex justify-evenly gap-5 w-full'>
        <div className='mb-3'>
            <h3 className=' text-center tracking-wide  text-white font-bold mb-1'>Quick Navigation</h3>
            <nav  className='text-sm text-sky-300 text-opacity-75'>
               <NavLink className="block text-center" to="/">Home</NavLink>
               <NavLink className="block text-center" to="/series">TV/Series</NavLink>
               <NavLink className="block text-center" to="/movies">Movies</NavLink>
               <NavLink className="block text-center" to="/cartegory/popular">Popular</NavLink>
               <NavLink className="block text-center" to="/cart">Cart</NavLink>
            </nav>
        </div>
        <div className='text-center'>
            <h3 className=' text-center tracking-wide  text-white font-bold mb-1'>Contact Us</h3>
            <div className='text-sm text-slate-200'>
                <div className='flex flex-col items-center mb-4'>
                    <Email size={20}/>
                    <p>kingstone@gmail.com</p>
                </div>
                <div className='flex flex-col items-center mb-4'>
                    <Call size={20}/>
                    <p>+254706335775</p>
                </div>
                <NavLink to="/message" className='flex flex-col items-center mb-4 text-sky-300'>
                    <Message size={20}/>
                    <p>Message</p>
                </NavLink>
            </div>
        </div>
        <div>
            <h3 className=' text-center tracking-wide  text-white font-bold mb-1'>Social Media</h3>
            <div class="flex items-center justify-center gap-3 text-sky-300">
                {/* <!--facebook--> */}
                <a href="https://www.facebook.com/profile.php?id=61562863659214" target="blank" ><Facebook size={20}/></a>

                {/* <!--instagram--> */}
                <a href="https://www.instagram.com/aleewamovies/profilecard/?igsh=MWQ2ZDB3dmJxaW1maw=="  target="blank" ><Insta size={20}/></a>

                {/* <!--Twitter--> */}
                <a href="https://x.com/Geniuskevoh?t=XuuzUe9qhUMCV0oNGca5Rw&s=09"  target="blank" ><Twitter size={20}/></a>

                {/* <!--Whatsapp--> */}
                <a href="https://wa.me/254708198410"  target="blank" >
                <Whatsapp size={20}/>
                  </a>
            </div>
        </div>
        </section>
        </div>
  </footer>
  )
}

export default MainFooter
