import React, { useEffect, useState } from 'react'
import Layout from "../layout/Layout"
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../js/api';
import Loader from '../boilerplates/Loader';
const Search = () => {
    const [datas, setData] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const path = window.location.search.split("=")[1]

   useEffect(() => {
    let url = `/videoDetails/?search=${path}`
    window.scrollTo(0,0)
    document.title = `Search | ${path}`
    // console.log(path)
    try {
          api.get(url)
          .then(res => {
            // console.log(res.data)
            setData(res.data.results)
            setIsLoading(false)
          })
        } catch(error) {
        //   console.log(error)
          setIsLoading(false)
        }
      
   }, [path])
   // console.log(datas)
   const redirect = (title, id) => {
    // console.log(paidTitles)
    const paidTitles = JSON.stringify(localStorage.getItem("paid"))
    if(paidTitles.includes(title.toLowerCase())) {
      navigate(`/store/play/${title}?q=${id}`)
    } else {
      navigate(`/store/${title}?q=${id}`)
    }
  }
  return (
    <Layout>
      <main className=' bg-black search'>
            <div className="mx-3 py-2 md:w-11/12 md:mx-auto lg:w-10/12 xl:w-4/5">
          {isLoading ? <div>
            <div className=' mb-3'>
            <Loader h1='' h2='h-4'/>
            </div>
            <div className='grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5  2xl:grid-cols-6'>
              {[1,1,1,1,1,1,1,1, 1].map((_, index) => (
                <Loader h1='h-24' h2='h-6' key={index}/>
              ))}
            </div>
            <Loader h1='' h2='h-4'/>
          </div> :<>
          <p className='text-white text-sm font-mono text-center py-3 capitalize'>{datas.length} Movies and Series matches Your search, "{path}".</p>
            <div className='grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5  2xl:grid-cols-6 my-2'>
                    {isLoading ? <p>Loading</p> : datas.map((data, index) => (
                        <div key={index} className="hover:shadow-md hover:shadow-sky-400 hover:cursor-pointer my-2 " onClick={() => {
                            redirect(data.title, data.vidId)
                        }}>
                            <img src={require(data.image)} className='img rounded-md h-full object-cover' alt="" />
                            <p className='text-white text-opacity-50 text-sm tracking-wider font-serif my-1'>{data.title}</p>
                        </div>
                    ))}
                </div>
          </>}
            </div>
      </main>
    </Layout>
  )
}

export default Search
