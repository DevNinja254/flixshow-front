import React, {useState} from 'react'
import { CiSearch as Search} from "react-icons/ci";
import { NavLink, useNavigate } from 'react-router-dom';
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search?q=${searchTerm}`)
  }
  return (
    <div className='p-3 bg-gray-900 bg-opacity-80 gap-4 sticky top-0 header z-20 backdrop-blur-sm md:hidden'>
      <div className='flex justify-between gap-4'>
      <form onSubmit={handleSubmit} className='flex h-fit items-center justify-start gap-2 bg-white bg-opacity-15 p-2 rounded-md text-gray-100 font-bold text-sm w-full'>
        <label htmlFor="searchTerm" onClick={handleSubmit}><Search size={20}/></label>
        <input type="text" name='searchTerm' value={searchTerm} onChange={handleChange} className='bg-transparent outline-none place-content-center placeholder-slate-100 placeholder-opacity-50 w-full' placeholder={"Demon city"}/>
      </form>
      <img src={require("../../assets/images/removebg.png")} alt="" className='block rounded-md w-10'/>
      </div>
      <nav className='flex justify-evenly my-2 text-sm tracking-wider text-white text-opacity-70'>
        <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/">Trending</NavLink>
        <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/series">TV/Series</NavLink>
        <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/movies">Movie</NavLink>
        <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/anime">Anime</NavLink>
        <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/cart">Cart</NavLink>
      </nav>
    </div>
  )
}

export default Header
