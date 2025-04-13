import React, { useEffect, useState } from 'react'
import Layout from "../layout/Layout"
import { NavLink, useNavigate } from 'react-router-dom';
import api, {config} from '../js/api';
import Loader from '../boilerplates/Loader';
import { config as configurer } from '../js/api';
import { BarLoader as Spinner } from 'react-spinners'
const Purchased = () => {
    const data = [1,1,1,1,1,1]
    const [spinner, setSpinner] = useState(false)
    const [paidTitles, setPaidTitles] = useState([])
    const navigate = useNavigate()
    const [isLoading1, setIsLoading1] = useState(true)
    const [isLoading2, setIsLoading2] = useState(true)
    const [isLoading3, setIsLoading3] = useState(true)
     const [redirecto, setRedirector] = useState(false)
    const [error, setError] = useState(false);
    const fetchItems = async () => {
      window.scrollTo(0, 0);
      const token = true
      if (token) {
        const config = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        };
        const authenticated = localStorage.getItem("Authenticated")
        if (authenticated === "true") {       
          // if authenticated get purchased items
          const paidVid = localStorage.getItem("paidVideo")
          if (paidVid) {
            console.log("local")
            const paid = JSON.parse(paidVid)
            setPaidTitles(paid)
            setIsLoading1(false)
            setIsLoading3(false)
            setIsLoading2(false)
          } else {
            try {
              const profileResponse = await api.get("/info/", config);
              const dataProfile = profileResponse.data;
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
          }
    
       
        }else {
        navigate("/account/authenticate");
      }
      } else {
        navigate("/account/authenticate");
      }}
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
      // console.log(paidTitles)
      const redirect = async (title, id) => {
          setSpinner(true)
          setRedirector(true)
          
          try {
            api.get(`/videoDetails/${id}/`,config )
            .then (res => {
              sessionStorage.setItem("videodetail", JSON.stringify(res.data))
              api.get(`/videos/?name=${title.split(" ").join("%20")}`, config)
              .then(res => {
                const data1 = res.data.results
                sessionStorage.setItem("video", JSON.stringify(data1))
                console.log(data1,"VideoColorSpace")
                navigate(`/store/play/${title}?q=${id}`)
              })
            } )
            
            
            
          } catch (e) {
            setError(true)
            console.log(e.message)
          } finally {
            setSpinner(false)
            setRedirector(false)
          }
      }
  return (
    <div className={`${redirecto ? "opacity-80" : "opacity-100"} transition-all duration-300`}>
      <Layout>

      <div className='fixed top-0 left-0 w-full z-30'>
        <Spinner
          color="rgba(255,255,255,0.5)"
          // backgroundColor="black"
          loading={spinner}
          cssOverride={{
            "width": "100%",
            "backgroundColor": "transparent"
          }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      {error ? <p className='bg-red-700 text-white fixed bottom-20 left-3 p-2 text-sm font-bold rounded-sm'>Loading video failed!</p> : null}
      <main className=' bg-black search'>
            <div className="mx-3 py-2 md:w-11/12 md:mx-auto lg:w-10/12 xl:w-4/5">
          <p className='text-white text-sm font-mono text-center py-3 capitalize'>{paidTitles.length} paid Movies and Series Available.</p>
            <div className='grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5  2xl:grid-cols-6 my-2'>
                {paidTitles.map((data, index) => (
                    <div key={index} className="hover:shadow-md hover:shadow-sky-400 hover:cursor-pointer my-2 " onClick={() => {
                        redirect(data.video_name, data.video_id)
                    }}>
                        <img src={require(data.image_url)} className='img rounded-md h-full object-cover' alt="" />
                        <p className='text-white text-opacity-50 text-sm tracking-wider font-serif my-1'>{data.video_name}</p>
                    </div>
                ))}
                </div>
          
            </div>
          {/*<div className='text-white sticky bottom-0 bg-black flex justify-between items-center px-3 py-2 border-y-2 border-gray-300 border-opacity-10 text-sm button'>
            <button className='inline-block text-sm ' onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              <span>Prev</span>
            </button>
            <div className='pagination-container'>
            {getPaginationButtons().map((button, index) => (
              <span key={index} className='inline-block'>
                {button}
              </span>
            ))}
            </div>
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              <span>Next</span>
            </button>
          </div>*/}
      </main>
      </Layout>
    </div>
  )
}

export default Purchased
