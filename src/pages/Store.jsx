import React, { useEffect, useState } from 'react'
import Layout from "../layout/Layout"
import { useNavigate } from 'react-router-dom';
import api, { config } from '../js/api';
import Loader from '../boilerplates/Loader';
const Store = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [datas, setData] = useState([])
    const [pathUpdate, setPathUpdate] = useState("")
    const navigate = useNavigate()
    const path = window.location.pathname.substring(1)
   useEffect(() => {
    setIsLoading(true)
    let url = ""
    window.scrollTo(0,0)
    document.title = path
    if (path.includes("store")){
      // console.log(path)
        url = '/videoDetails/?page_size=200'
    }else {
      console.log()
        url = `/search/?title=&cartegory=&popular=unknown&typs=${path}`
    }
    try {
        api.get(url, config)
      .then(res => {
        path.includes("store") ? setData(res.data.results) : setData(res.data)
        setIsLoading(false)
    })
    }catch(error) {
        setIsLoading(false)
        // console.log(error)
    }
   }, [path])
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
      <main className=' bg-black store'>
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
          </div> : <>
          <p className='text-white text-sm font-mono text-center py-3 capitalize'>{datas.length} {path} Movies and Series Available.</p>
            <div className='grid div2 grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5  2xl:grid-cols-6 my-2'>
                    {datas.map((data, index) => (
                        <div key={index} className="hover:shadow-md hover:shadow-sky-400 hover:cursor-pointer my-2" onClick={() => {
                            redirect(data.title, data.vidId)
                        }}>
                            <img src={require(data.image)} className='img rounded-md h-5/6 object-cover' alt="" />
                            <p className='text-white text-opacity-50 text-sm tracking-wider font-serif my-1 '>{data.title}</p>
                        </div>
                    ))}
                </div>
          </>}
            </div>
      </main>
    </Layout>
  )
}

export default Store
