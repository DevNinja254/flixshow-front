import React, {useState} from 'react'
import { AiOutlineMenuUnfold as Menu} from "react-icons/ai"
import { CiSearch as Search} from "react-icons/ci";
import { MdAccountCircle as Account } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import SlidingNav from './SlidingNav';
const HeaderLarge = () => {
    const [slide, setSlide] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
      const handleChange = (e) => {
        setSearchTerm(e.target.value)
      }
      const handleSubmit = (e) => {
        // e.preventDefault()
        e.preventDefault()
        navigate(`/search?q=${searchTerm}`)
      }
    const settingSlide = () => {
        slide ? setSlide(false): setSlide(true)
    }
  return (
    <div className='bg-black sticky top-0 pb-2  z-20 hidden md:block'>
      <p className='text-white text-center text-sm p-2 bg-slate-500 bg-opacity-50 font-mono'>Best Movies and Series By your Favourite Dee-Jays.</p>
      <div>
        <div className='text-white flex p-4 gap-3 items-start'>
            
            <div className='flex items-start gap-2'>
                <Menu size={25} onClick={settingSlide}/>
                <div>
                    <img src={require("../../assets/images/removebg.png")} alt="" />
                    <p className='text-sm capitalize font-mono'>Kingstonemovies</p>
                </div>
            </div>
                  <form onSubmit={handleSubmit} className='flex h-fit items-center justify-start gap-2 bg-white bg-opacity-15 p-2 rounded-md text-gray-100 font-bold text-sm w-full'>
                    
                    <input type="text" name='searchTerm' value={searchTerm} onChange={handleChange} id='searchTerm' className='bg-transparent outline-none place-content-center placeholder-slate-100 placeholder-opacity-50 w-full' placeholder={"Demon city"}/>
                    <label htmlFor="searchTerm" onClick={handleSubmit}><Search size={20}/></label>
                  </form>
                  <NavLink to='/account'>
                    <Account size={25}/>
                  </NavLink>
        </div>
        <nav className='flex header justify-evenly my-2 text-sm tracking-wider text-white text-opacity-70 md:w-5/6 md:mx-auto lg:w-4/5 2xl:w-1/2 xl:w-2/3'>
            <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/">Trending</NavLink>
            <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/store">Store</NavLink>
            <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/series">TV/Series</NavLink>
            <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/movies">Movie</NavLink>
            <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/anime">Anime</NavLink>
            <NavLink className="pb-1 hover:text-sky-200 hover:text-opacity-100 transition-all duration-150 ease-linear" to="/cart">Cart</NavLink>
        </nav>
      </div>
      <div className={`fixed top-41 text-white z-10 w-1/2 h-screen bg-slate-800 ${slide ? "opacity-100 " : "opacity-0 hidden"} transition-all duration-300 ease-linear`}>
        <SlidingNav settingSlide={settingSlide}/>
      </div>
    </div>
  )
}

export default HeaderLarge
