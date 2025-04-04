import React, {useState, useEffect} from 'react'
import api from '../../js/api'
import { useNavigate } from 'react-router-dom' 
import Loader from '../../boilerplates/Loader'
import { config } from '../../js/api'
const Slider = ({paidTitles}) => {
  const navigate = useNavigate()
  const [curr, setCurr] = useState(0)
  const [datas, setData] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  const prev = () => {
    setCurr((curr) => curr == 0 ? datas.length - 1 : curr -1)
  }
  const next= () => {
    setCurr((curr) => curr > datas.length-1 ? 0 : curr + 1)
  }
  // console.log(paidTitles)
  useEffect(() => {
    try {
      api.get('/videoDetails/?ordering=-date_uploaded&page_size=20', config)
      .then(res => {
        setData(res.data.results)
        setIsLoading(false)
      })
    } catch(error) {
      console.log(error)
      setIsLoading(false)
    }
    const scroll = false
    if(scroll){return console.log("no scroll")}
    const slideInterval = setInterval(next, 5000)
    return () => clearInterval(slideInterval)
  }, [])
  
  // console.log(datas)
  const redirect = (title, id) => {
    // console.log(paidTitles)
    if(paidTitles.includes(title.toLowerCase())) {
      navigate(`store/play/${title}?q=${id}`)
    } else {
      navigate(`store/${title}?q=${id}`)
    }
  }
  return (
    <div className={` slidder overflow-hidden pb-5 `} >  
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