import React, {useEffect, useState} from 'react'
import { RxCross1 as Cross } from "react-icons/rx"; 
import { BiSolidPurchaseTagAlt as Purchase } from "react-icons/bi";
import { GoHomeFill as Home } from "react-icons/go";
import { BiSolidCategory as Cartegory } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import { MdAdminPanelSettings as Admin} from "react-icons/md"
import { IoLogoGameControllerB  as Game} from "react-icons/io";
const SlidingNav = ({settingSlide}) => {
  const [admin, setAdmin] = useState(false)
  useEffect(() => {
      const superuser = localStorage.getItem("admin")
      superuser == "true" ? setAdmin(true) : setAdmin(false)
    }, [])
  return (
    <div className='bg-slate-800 p-4 slider'>
      <div className='flex justify-between pb-2 border-b-2 border-gray-500 border-opacity-15'>
            <div>
                <p className='text-gray-100 font-mono'>KingstoneMovies</p>
                <p className='capitalize text-sm font-serif text-gray-300'>site navigation</p>
            </div>
            <Cross className='hover:cursor-pointer' size={23} onClick={settingSlide}/>
      </div>
      <nav className=' text-sky-200 text-opacity-100 text-sm font-mono tracking-wider'>
        <NavLink to="/" className="py-2 flex place-content-center  items-center justify-start  gap-3 transition-all duration-150 ease-linear border-b-2 border-gray-500 border-opacity-15" onClick={settingSlide}>
            <Home size={20}/>
            <p>Home</p>
        </NavLink> 
        {admin ? <NavLink to="https://admin.flixshow.xyz/api/v1/admin" target='_blank' className="py-2 flex place-content-center  items-center justify-start  gap-3 transition-all duration-150 ease-linear border-b-2 border-gray-500 border-opacity-15 " onClick={settingSlide}>
            <Admin size={20}/>
            <p>Admin Site</p>    
        </NavLink > : null}
        <NavLink to="/purchased" className="py-2 flex place-content-center  items-center justify-start  gap-3 transition-all duration-150 ease-linear border-b-2 border-gray-500 border-opacity-15 " onClick={settingSlide}>
            <Purchase size={20}/>
            <p>Purchased</p>    
        </NavLink >   
        <NavLink to="/category" className="py-2 flex place-content-center  items-center justify-start  gap-3 transition-all duration-150 ease-linear border-b-2 border-gray-500 border-opacity-15" onClick={settingSlide}>
            <Cartegory size={20}/>
            <p>Cartegory</p>
        </NavLink>
        <NavLink to="/spin_and_win" className="py-2 flex place-content-center  items-center justify-start  gap-3 transition-all duration-150 ease-linear border-b-2 border-gray-500 border-opacity-15 " onClick={settingSlide}>
            <Game size={20}/>
            <p>Spin and Win</p>    
        </NavLink > 
      </nav>
    </div>
  )
}

export default SlidingNav
