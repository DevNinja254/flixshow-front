import React, { useEffect, useState } from 'react'
import Layout from "../layout/Layout"
import { NavLink } from 'react-router-dom';
import api, { config } from '../js/api';
import Loader from '../boilerplates/Loader';
const Store = () => {
    const [datas, setData] = useState([])
    // const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const path = window.location.pathname.substring(1)
    useEffect(() => {
      window.scrollTo(0,0)
      document.title = "Cartegories"
        try {
          api.get('/cartegorytotal', config)
          .then(res => {
            // console.log(res.data.results)
            setData(res.data.results)
            setIsLoading(false)
          })
        } catch(error) {
          // console.log(error)
          setIsLoading(false)
        }
    }, [])
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
          </div> :<>
          <p className='text-white text-sm font-mono text-center py-3'>{datas.length} Category/ies Available.</p>
            <div className='grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5  2xl:grid-cols-6'>
                    {datas.map((data, index) => (
                        <NavLink key={index} className={`hover:shadow-md hover:shadow-sky-400`} to={`/cartegory/${data.cartName}`}>
                            <img src={require(data.cart_image)} className='img rounded-md h-5/6 object-cover block' alt="" />
                            <p className='text-red-500 font-bold text-sm tracking-wider font-serif mt-1 capitalize'>{data.cartName}</p>
                           <p className='text-white text-opacity-50 text-sm tracking-wider font-serif'>{data.total_related_count} videos</p>
                        </NavLink>
                    ))}
                </div>
          </>}
            </div>
      </main>
    </Layout>
  )
}

export default Store
