import React, { useState, useEffect } from 'react'
import { TbChartBarPopular as Popula } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import CatButton from '../ui/CatButton';
import { useNavigate } from 'react-router-dom';
import api from '../../js/api';
import { config } from '../../js/api';
import Loader from '../../boilerplates/Loader';
const Popular = ({paidTitles}) => {
    const [datas, setData] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        try {
          api.get('/videoDetails/?ordering=-date_uploaded&page_size=13', config)
          .then(res => {
            setData(res.data.results)
            setIsLoading(false)
          })
        } catch(error) {
          console.log(error)
          setIsLoading(false)
        }
      }, [])
      
      // console.log(datas)
      const redirect = (title, id) => {
        // console.log(paidTitles)
        if(paidTitles.includes(title.toLowerCase())) {
          navigate(`store/play/${title}?q=${id}`)
        } else {
          navigate(`store/${title}?q=${id}`)
        }
      }
  return (
    <div className='mx-4 popula py-3'>
      {isLoading ? <div>
        <div className='flex items-center justify-start gap-4 mb-3'>
          <Loader h1='h-10 w-10' h2='h-0'/>
          <Loader h1='' h2='h-4 w-80'/>
        </div>
        <div className='grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5  2xl:grid-cols-6'>
        {[1,1,1,1,1,1,1,1, 1].map((_, index) => (
          <Loader h1='h-24' h2='h-6' key={index}/>
        ))}
        </div>
      </div>:
      <>
         <div className='text-white flex  items-center gap-2 font-bold text-opacity-60 pb-2 '>
            <Popula size={24}/>
            <h2 className='text-xl'>Recent</h2>
        </div>
        <div className='grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5  2xl:grid-cols-6'>
             {datas.map((data, index) => (
                <div key={index}  onClick={() => {
                    redirect(data.title, data.vidId)
                }}>
                    <img src={require(data.image)} className='img rounded-md' alt="" />
                    <p className='text-white text-opacity-35 text-sm tracking-wider font-serif my-1'>{data.title}</p>
                </div>
            ))}
        </div>
        <NavLink to="/cartegory/popular" className="md:flex justify-end">
            <CatButton/>
        </NavLink>
      </>}
    </div>
  )
}

export default Popular
