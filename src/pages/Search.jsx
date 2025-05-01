import React, { useEffect, useState } from 'react'
import Layout from "../layout/Layout"
import { NavLink, useNavigate } from 'react-router-dom';
import api, { config } from '../js/api';
import Loader from '../boilerplates/Loader';
import { BarLoader as Spinner } from 'react-spinners'
const Search = () => {
    const [datas, setData] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const[count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [error, setError] = useState(null);
    const pageSize = 20
    const maxVisiblePages = 100
    const path = window.location.search.split("=")[1]
    const [redirecto, setRedirector] = useState(false)
    const [spinner, setSpinner] = useState(false)
    
    const fetchItems = async (page) => {
      window.scrollTo(0,0)
      setIsLoading(true);
      setError(null);
      console.log(path)
      try {
        let url = `/videoDetails/?title=${String(path).toLowerCase()}&page_size=20&ordering=-date_uploaded`
        const response = await api.get(url, config);
        const data = await response.data;
        // console.log(data)
        setData(data.results)
        setCount(data.count);
        setCurrentPage(page);
        
      } catch (e) {
        console.log(e.message);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
   useEffect(() => {
    
    window.scrollTo(0,0)
    document.title = `Search | ${path}`
    fetchItems(currentPage)      
   }, [path])
   // console.log(datas)
   const redirect = async (title, id) => {
    // console.log(paidTitles)
    const paidTitles = JSON.parse(localStorage.getItem("paid"))
    // console.log("clicked")
    if(paidTitles && paidTitles.includes(title)) {
      setSpinner(true)
      setRedirector(true)
      
      try {
        const response = await api.get(`/videoDetails/${id}/`,config )
        const data = await response.data
        api.get(`/videos/?name=${title.split(" ").join("%20")}`, config)
        .then(res => {
          const data1 = res.data.results
          sessionStorage.setItem("video", JSON.stringify(data1))
          sessionStorage.setItem("videodetail", JSON.stringify(data))
          navigate(`/store/play/${title}?q=${id}`)
        })
        
      } catch (e) {
        setError(true)
        console.log(e.message)
      } finally {
        setSpinner(false)
        setRedirector(false)
      }
    } else {
      setSpinner(true)
      setRedirector(true)
      try {
        const response = await api.get(`/videoDetails/${id}/`,config )
        const data = await response.data
        sessionStorage.setItem("videodetail", JSON.stringify(data))
        navigate(`/store/${title}?q=${id}`)
      } catch (e) {
        setError(true)
      } finally {
        setSpinner(false)
        setRedirector(false)
      }
      
    }
  }
  ///////////////////////////////////
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(count / pageSize)) {
      fetchItems(pageNumber);
    }
  };
  const totalPages = Math.ceil(count / pageSize);
  const getPaginationButtons = () => {
    const buttons = [];

    // Determine the range of pages to display directly
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));

    // Adjust start and end if near the edges to show a fixed number of pages
    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (endPage - startPage < maxVisiblePages - 1) {
        if (startPage === 1) {
          endPage = Math.min(totalPages, maxVisiblePages);
        } else if (endPage === totalPages) {
          startPage = Math.max(1, totalPages - maxVisiblePages + 1);
        }
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={i === currentPage ? 'active px-2 py-1 bg-gray-500 text-red-600 font-bold bg-opacity-15' : 'px-2 py-1 bg-gray-500 text-white font-bold bg-opacity-15'}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };
  ////////////////////////////
  return (
   <div className={`${redirecto ? "opacity-80" : "opcity-100"} transition-all duration-300 ease-in-out`}>
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
      <main className=' bg-black search'>
            <div className="mx-3 py-2 md:w-11/12 md:mx-auto lg:w-10/12 xl:w-4/5">
          {isLoading ? <div className='fixed top-0 left-0 w-full z-30'>
        <Spinner
          color="rgba(255,255,255,0.5)"
          // backgroundColor="black"
          loading={true}
          cssOverride={{
            "width": "100%",
            "backgroundColor": "transparent"
          }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
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
            {/* <div className='text-white sticky bottom-0 bg-black flex justify-between items-center px-3 py-2 button border-y-2 border-gray-300 border-opacity-10 text-sm'>
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
          </div> */}
      </main>
    </Layout>
   </div>
  )
}

export default Search
