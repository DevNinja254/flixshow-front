import Slider from "../components/dashboard/Slider";
import React, { useEffect, useState } from 'react'
import Message from "../components/dashboard/Message";
import Popular from "../components/dashboard/Popular";
import Cartegorised from "../components/dashboard/Cartegorised";
import Layout from "../layout/Layout"
import api from "../js/api";
import Loader from "../boilerplates/Loader"
import { config as configurer } from "../js/api";
const Homepage = () => {
  const [paidTitles, setPaidTitles] = useState([])
  const [paidVideo, setPaidVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  document.title = "KingStonemovies"
  useEffect(() => {
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
        localStorage.setItem("username", dataProfile.username)
        localStorage.setItem("proID", dataProfile.profile.buyerid)
        localStorage.setItem("Authenticated", true)
        // if authenticated get purchsed item
        api.get(`/purchased/?username=${dataProfile.username}`, configurer)
        .then(res => {
          const dataPurchased = res.data.results
          // console.log(dataPurchased)
          setPaidVideos( paidVideo => [...paidVideo, ...dataPurchased])
          for (const dataPur of dataPurchased) {
            setPaidTitles(paidTitles => [...paidTitles, String(dataPur.video_name).toLowerCase()])
          }
        })
        // watch movied
        api.get(`/onwatch/?watcher=${dataProfile.username}`, configurer)
        .then(res => {
          const dataPurchased = res.data.results
          // console.log(dataPurchased)
          setPaidVideos( paidVideo => [...paidVideo, ...dataPurchased])
          for (const dataPur of dataPurchased) {
            setPaidTitles(paidTitles => [...paidTitles, dataPur.video_name])
          }
        })
        // downloaded movies
        api.get(`/download/?name=${dataProfile.username}`, configurer)
        .then(res => {
          const dataPurchased = res.data.results
          // console.log(dataPurchased)
          setPaidVideos( paidVideo => [...paidVideo, ...dataPurchased])
          for (const dataPur of dataPurchased) {
            setPaidTitles(paidTitles => [...paidTitles, dataPur.video_name])
          }
        })
      })
      } catch(error) {
        localStorage.setItem("Authenticated", false)
          console.log(error)
      }
    } else {
      localStorage.setItem("Authenticated", false)
    }
    setIsLoading(false)
  },[])
  // console.log(paidTitles)
  localStorage.setItem("paid", paidTitles)
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
  
  const uniqueArray = removeDuplicates(paidVideo, 'video_name');
  localStorage.setItem("paidVideo", JSON.stringify(uniqueArray))
  return (
    <Layout>
        <main className="bg-black bg-opacity-100">
         {isLoading ? <div>
          <Loader/>
          <div className="m-3 grid grid-cols-3 gap-3">
            {[1,11,1,1,1,1,1,1,1,1,1,1].map((_, index )=> (
              <Loader h1="h-20" h2="h-3"/>
            ))}
          </div>
         </div> :
          <>
             <Slider paidTitles={paidTitles}/>
            <div className="md:w-11/12 md:mx-auto lg:w-10/12 xl:w-4/5">
              <Message/>
              <Popular paidTitles={paidTitles}/>
              <Cartegorised paidTitles={paidTitles}/>
            </div>
          </>
         }
        </main>
    </Layout>
  )
}

export default Homepage
