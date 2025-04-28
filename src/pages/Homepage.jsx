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
  const [isLoading, setIsLoading] = useState(false)
  document.title = "KingStonemovies"
  
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
