import React, { useEffect, useState } from 'react'
import Layout from "../layout/Layout"
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../js/api';
import Loader from '../boilerplates/Loader';
import { config as configurer } from '../js/api';
const Purchased = () => {
    const data = [1,1,1,1,1,1]
    const [paidTitles, setPaidTitles] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        window.scrollTo(0,0)
        document.title = "Purchased"
        const token = localStorage.getItem("access_token")
        // if authenticated
        if(token) { 
          const config = {
            headers : {
              "Authorization" : `Bearer ${token}`
            }
          }
          try {
            api.get("/info/", config)
          .then(res => {
            const dataProfile = res.data
            // console.log(dataProfile.username)
            localStorage.setItem("Authenticated", true)
            // if authenticated get purchsed item
            api.get(`/purchased/?username=${dataProfile.username}`, configurer)
            .then(res => {
              const dataPurchased = res.data.results
            //   console.log("purchased", dataPurchased)
                setPaidTitles(paidTitles => [...paidTitles, ...dataPurchased])
            })
            // watch movied
            api.get(`/onwatch/?watcher=${dataProfile.username}`, configurer)
            .then(res => {
              const dataPurchased = res.data.results
            //   console.log("watched", dataPurchased)
                setPaidTitles(paidTitles => [...paidTitles, ...dataPurchased])
              
            })
            // downloaded movies
            api.get(`/download/?name=${dataProfile.username}`, configurer)
            .then(res => {
              const dataPurchased = res.data.results
            //   console.log("downloaded", dataPurchased)
                setPaidTitles(paidTitles => [...paidTitles, ...dataPurchased])
            })
          })
          } catch(error) {
            navigate("/account/authenticate")
          }
        } else {
          navigate("/account/authenticate")
        }
        setIsLoading(false)
      },[])
    //   remove duplicate
    function removeDuplicates(arr, key) {
        const seen = new Set();
        return arr.filter(obj => {
          const keyValue = obj[key];
          if (seen.has(keyValue)) {
            return false; // Duplicate, filter it out
          }
          seen.add(keyValue);
          return true; // Not a duplicate, keep it
        });
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
          <p className='text-white text-sm font-mono text-center py-3'>{removeDuplicates(paidTitles, 'video_name').length} Total movies and series you've purchased.</p>
            <div className='grid grid-cols-3 gap-5   2xl:grid-cols-4 div2'>
                    {removeDuplicates(paidTitles, 'video_name').map((paid, index) => (
                        <NavLink to={`/store/play/${paid.video_name}?q=${paid.video_id}`} key={index} className="hover:shadow-md hover:shadow-sky-400 block h-full w-full" >
                            <img src={require(paid.image_url)} className='img w-full rounded-md block h-5/6' alt="" />
                            <p className='text-white text-opacity-50 text-sm tracking-wider font-serif my-1'>{paid.video_name}</p>
                        </NavLink>
                    ))}
                </div>
          </>}
            </div>
      </main>
    </Layout>
  )
}

export default Purchased
