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
    const[count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [error, setError] = useState(null);
    const pageSize = 20
    const maxVisiblePages = 10
    const path = window.location.pathname.substring(1)
    const fetchItems = async (page) => {
      setIsLoading(true);
      setError(null);
      try {
        let url = ''
        if (path.includes("store")){
          // console.log(path)
            url = `/search/?page=${page}`
        }else {
          console.log()
            url = `/search/?title=&cartegory=&popular=unknown&typs=${path}`
        }
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
    setIsLoading(true)
    window.scrollTo(0,0)
    document.title = path
    fetchItems(currentPage)
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
  ///////////////////////////////////
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(count / pageSize)) {
      fetchItems(pageNumber);
    }
  };
  const totalPages = Math.ceil(count / pageSize);
  const getPaginationButtons = () => {
    const buttons = [];
    if (totalPages <= maxVisiblePages + 2) { // Show all if total is small
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={i === currentPage ? 'active px-2 py-1 font-bold bg-gray-300 text-red-400 bg-opacity-30 rounded-sm' : 'px-2 py-1 bg-gray-500 bg-opacity-30 rounded-sm'}
            disabled={i === currentPage}
          >
            {i}
          </button>
        );
      }
    } else {
      // Show first page
      buttons.push(
        <button
          key={1}
          onClick={() => goToPage(1)}
          className={1 === currentPage ? 'active' : ''}
          disabled={1 === currentPage}
        >
          1
        </button>
      );

      // Show ellipsis if current page is far from the start
      if (currentPage > Math.ceil(maxVisiblePages / 2) + 1) {
        buttons.push(<span key="start-ellipsis">...</span>);
      }

      // Show a few pages around the current page
      const start = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages - 1, currentPage + Math.floor(maxVisiblePages / 2));
      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={i === currentPage ? 'active' : ''}
            disabled={i === currentPage}
          >
            {i}
          </button>
        );
      }

      // Show ellipsis if current page is far from the end
      if (currentPage < totalPages - Math.ceil(maxVisiblePages / 2)) {
        buttons.push(<span key="end-ellipsis">...</span>);
      }

      // Show last page
      buttons.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className={totalPages === currentPage ? 'active' : ''}
          disabled={totalPages === currentPage}
        >
          {totalPages}
        </button>
      );
    }
    return buttons;
  };
  ////////////////////////////
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
          <div className='text-white sticky bottom-0 bg-black flex justify-between items-center px-3 py-2 border-y-2 border-gray-300 border-opacity-10 text-sm'>
            <button className='inline-block text-sm ' onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              <span>Prev</span>
            </button>
            <div className='flex items-center justify-center gap-2'>
            {getPaginationButtons().map((button, index) => (
              <span key={index} className=''>
                {button}
              </span>
            ))}
            </div>
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              <span>Next</span>
            </button>
          </div> 
      </main>
    </Layout>
  )
}

export default Store
