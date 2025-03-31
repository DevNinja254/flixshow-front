import React from 'react'
import { NavLink } from 'react-router-dom';
import { BiSolidPurchaseTagAlt as Purchase } from "react-icons/bi";
import { GoHomeFill as Home } from "react-icons/go";
import { BiSolidCategory as Cartegory } from "react-icons/bi";
import { IoPerson as Person} from "react-icons/io5";
import { RiAppStoreFill as Store} from "react-icons/ri";
const Footer = () => {
  return (
    <div className='footer sticky w-full bottom-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm md:hidden'>
        <nav className='flex justify-evenly items-center  text-sm text-white text-opacity-60 tracking-wide'>
            <NavLink to="/" className="py-2 flex place-content-center flex-col items-center justify-start hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear">
                <Home size={20}/>
                <p>Home</p>
            </NavLink> 
            <NavLink to="/store" className="py-2 flex place-content-center flex-col items-center justify-start hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear">
                <Store size={20}/>
                <p>Store</p>
            </NavLink> 
            <NavLink to="/purchased" className="py-2 flex place-content-center flex-col items-center justify-start hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear">
                <Purchase size={20}/>
                <p>Purchased</p>    
            </NavLink >   
            <NavLink to="/category" className="py-2 flex place-content-center flex-col items-center justify-start hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear">
                <Cartegory size={20}/>
                <p>Cartegory</p>
            </NavLink>
            <NavLink to="/account" className="py-2 flex place-content-center flex-col items-center justify-start hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear">
                <Person size={20}/>
                <p>Me</p>
            </NavLink>
        </nav>      
    </div>
  )
}

export default Footer
