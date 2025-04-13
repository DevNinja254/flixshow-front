import React, {useState, useEffect} from 'react'
import api from '../../js/api'
import { useNavigate } from 'react-router-dom' 
import Loader from '../../boilerplates/Loader'
import { config } from '../../js/api'
import { BarLoader as Spinner } from 'react-spinners'

const Slider = ({paidTitles}) => {
  const navigate = useNavigate()
  const [curr, setCurr] = useState(0)
  const [datas, setData] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
   const [spinner, setSpinner] = useState(false)
  const prev = () => {
    setCurr((curr) => curr == 0 ? datas.length - 1 : curr -1)
  }
  const next= () => {
    setCurr((curr) => curr > datas.length-1 ? 0 : curr + 1)
  }
  // console.log(paidTitles)
  useEffect(() => {
    const items = sessionStorage.getItem("slide")
    if (items) {
      setData(JSON.parse(items))
      setIsLoading(false)
    } else {
      try {
        api.get('/videoDetails/?ordering=-date_uploaded&page_size=20', config)
        .then(res => {
          setData(res.data.results)
          setIsLoading(false)
          sessionStorage.setItem("slide", JSON.stringify(res.data.results))
        })
      } catch(error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    const scroll = false
    if(scroll){return console.log("no scroll")}
    const slideInterval = setInterval(next, 5000)
    return () => clearInterval(slideInterval)
  }, [])
  
  const redirect = async (title, id) => {
    // console.log(paidTitles)
    const paidTitles = JSON.parse(localStorage.getItem("paid"))
    // console.log("clicked")
    if(paidTitles.includes(title)) {
      // setSpinner(true)
      // setRedirector(true)
      
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
      }
    } else {
      setSpinner(true)
      try {
        const response = await api.get(`/videoDetails/${id}/`,config )
        const data = await response.data
        sessionStorage.setItem("videodetail", JSON.stringify(data))
        navigate(`/store/${title}?q=${id}`)
      } catch (e) {
        setError(true)
      } finally {
        setSpinner(false)
      }
      
    }
  }
  return (
    <div className={` slidder overflow-hidden pb-5 `} >  
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
        {isLoading ? <div>
          <Loader h1='h-40 md:h-80' h2='h-0' />
        </div>:<div className='flex transition-all duration-500 ease-linear' style={{
        transform:`translateX(-${curr >= datas.length - 1 ? 0 * 100: curr * 100}%)`
    }}>
            {datas.map((data, index) => (
                <div key={index} className="relative nav overflow-hidden" onClick={() => {
                  redirect( data.title, data.vidId)
                }}>
                    <p className='absolute top-0 h-full w-full  bg-opacity-40 text-white font-bold p-2'>{data.title}</p>
                    <img className='img' src={require(data.image)} alt="" />
                </div>
            ))}
        </div>}
    </div>
    

  )
}

export default Slider;