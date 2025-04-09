import React, {useEffect, useState} from 'react'
import { CiSearch as Search} from "react-icons/ci";
import { NavLink, useNavigate } from 'react-router-dom';
import { RiMenuFold3Line as Menu2 } from "react-icons/ri";
import { IoLogoGameControllerB  as Game} from "react-icons/io";
import { RxCross1 as Cross } from "react-icons/rx";
import { MdAdminPanelSettings as Admin } from "react-icons/md"
const Header = () => {
  const [showSide, setShowSide] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [admin, setAdmin] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search?q=${searchTerm}`)
  }
  const setttingShowFalse = () => {
    setShowSide(false)
  }
  const setttingShowTrue = () => {
    setShowSide(true)
  }
  useEffect(() => {
    const superuser = localStorage.getItem("admin")
    superuser == "true" ? setAdmin(true) : setAdmin(false)
  }, [])
  return (
    <div className='p-3 bg-gray-900 bg-opacity-80 gap-4 sticky top-0 header z-20 backdrop-blur-sm md:hidden'>
      <div className='flex justify-between gap-4'>
      <form onSubmit={handleSubmit} className='flex h-fit items-center justify-start gap-2 bg-white bg-opacity-15 p-2 rounded-md text-gray-100 font-bold text-sm w-full'>
        <label htmlFor="searchTerm" onClick={handleSubmit}><Search size={20}/></label>
        <input type="text" name='searchTerm' value={searchTerm} onChange={handleChange} className='bg-transparent outline-none place-content-center placeholder-slate-100 placeholder-opacity-50 w-full' placeholder={"Demon city"}/>
      </form>
      <div>
        {!showSide ? <Menu2 className={`block text-white  font-extrabold`} size={25} onClick={setttingShowTrue}/> :
        <Cross className={`block text-white font-extrabold`} size={25} onClick={setttingShowFalse}/>}
      </div>
      </div>
      <nav className='flex justify-evenly my-2 text-sm tracking-wider text-white text-opacity-70'>
        <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/">Trending</NavLink>
        <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/series">TV/Series</NavLink>
        <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/movies">Movie</NavLink>
        <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/anime">Anime</NavLink>
        <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/cart">Cart</NavLink>
      </nav>
      <div className={`fixed p-4 top-50 left-0 h-screen w-full bg-slate-800 ${showSide ? "block" : "hidden"} `}>
        <div className='flex justify-between pb-2 border-b-2 border-gray-500 border-opacity-15'>
                    <div>
                        <p className='text-gray-100 font-mono'>KingstoneMovies</p>
                        <p className='capitalize text-sm font-serif text-gray-300'>site navigation</p>
                    </div>
              </div>
        <nav className=' text-sky-200 text-opacity-100 text-sm font-mono tracking-wider'>
          <NavLink to="/spin_and_win"  className="py-2 flex place-content-center  items-center justify-start  gap-3 transition-all duration-150 ease-linear border-b-2 border-gray-500 border-opacity-15" onClick={setttingShowFalse}>
            <Game size={23}/>
            <span>Spin and win</span>
          </NavLink>
          {/* add more side links hera in sm */}
          {admin ? <NavLink to="https://kingstonemovies.org/api/v1/admin" target='_blank'  className="py-2 flex place-content-center  items-center justify-start  gap-3 transition-all duration-150 ease-linear border-b-2 border-gray-500 border-opacity-15" onClick={setttingShowFalse}>
            <Admin size={23}/>
            <span>Admin Site</span>
          </NavLink> : null}
        </nav>
      </div>
    </div>
  )
}

export default Header
