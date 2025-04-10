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
    const [isLoading1, setIsLoading1] = useState(true)
    const [isLoading2, setIsLoading2] = useState(true)
    const [isLoading3, setIsLoading3] = useState(true)
    const fetchItems = async () => {
      window.scrollTo(0, 0);
      const token = localStorage.getItem("access_token")
      if (token) {
        const config = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        };
    
        try {
          const profileResponse = await api.get("/info/", config);
          const dataProfile = profileResponse.data;
          localStorage.setItem("Authenticated", true);
    
          // if authenticated get purchased items
          try {
            const purchasedResponse = await api.get(`/purchased/?username=${dataProfile.username}`, configurer);
            const dataPurchased = purchasedResponse.data.results;
            setPaidTitles(paidTitles => [...paidTitles, ...dataPurchased]);
            setIsLoading1(false);
          } catch (error) {
            console.error("Error fetching purchased items:", error);
            setIsLoading1(false); // Ensure loading state is updated even on error
          }
    
          // watch movies
          try {
            const watchedResponse = await api.get(`/onwatch/?watcher=${dataProfile.username}`, configurer);
            const dataWatched = watchedResponse.data.results;
            setPaidTitles(paidTitles => [...paidTitles, ...dataWatched]);
            setIsLoading2(false);
          } catch (error) {
            console.error("Error fetching watched items:", error);
            setIsLoading2(false); // Ensure loading state is updated even on error
          }
    
          // downloaded movies
          try {
            const downloadedResponse = await api.get(`/download/?name=${dataProfile.username}`, configurer);
            const dataDownloaded = downloadedResponse.data.results;
            setPaidTitles(paidTitles => [...paidTitles, ...dataDownloaded]);
            setIsLoading3(false); // Assuming you want to set this to false on success
          } catch (error) {
            console.error("Error fetching downloaded items:", error);
            setIsLoading3(false); // Ensure loading state is updated even on error
          }
    
        } catch (error) {
          navigate("/account/authenticate");
        }
      } else {
        navigate("/account/authenticate");
      }
    };
    useEffect(() => {
        window.scrollTo(0,0)
        document.title = "Purchased"
        fetchItems()
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
            {isLoading1 & isLoading2 & isLoading3 ? <div>
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
