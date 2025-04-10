import React, { useEffect, useState } from 'react'
import Layout from "../layout/Layout"
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../js/api';
import Loader from '../boilerplates/Loader';
import { config } from '../js/api';
import { IoIosArrowBack as Back } from "react-icons/io";
import { GrNext as Next } from "react-icons/gr";
const Popular = () => {
  
    const [datas, setData] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const[count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const path = window.location.pathname.split("/")
    const [error, setError] = useState(null);
    const [searchr, setSearchr] = useState('')
    const pageSize = 20
    const maxVisiblePages = 100
    const fetchItems = async (page) => {
      window.scrollTo(0,0)
      setIsLoading(true);
      setError(null);
      try {
        let url = ''
        if (path.includes("popular")){
            url = `/videoDetails/?ordering=-date_uploaded&page_size=1000&page=${page}`
            setSearchr('popular')
        }else {
            url = `/videoDetails/?cartegory=${path[2]}&ordering=-date_uploaded&page_size=1000`
            setSearchr(path[2])
        }
        const response = await api.get(url, config);
        const data = await response.data;
        // console.log(data)
        setData(data.results);
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
   
    document.title = "Popular"
    fetchItems(currentPage)
   }, [path[2]])
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
          <p className='text-white text-sm font-mono text-center py-3 capitalize'>{datas.length} {path[2] == "popular" ? "Recent" : path[2]} Movies and Series Available.</p>
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
            {/* <div className='text-white sticky bottom-0 bg-black flex justify-between items-center px-3 py-2 border-y-2 border-gray-300 border-opacity-10 text-sm button'>
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
          </div>    */}
      </main>
    </Layout>
  )
}

export default Popular
