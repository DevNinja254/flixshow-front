import React , {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import { MdCategory as Cartegory } from "react-icons/md";
import CatButton from '../ui/CatButton';
import { useNavigate } from 'react-router-dom';
import api from "../../js/api"
import { config } from '../../js/api';
import Loader from '../../boilerplates/Loader';
import { BarLoader as Spinner } from 'react-spinners'

const Cartegorised = ({paidTitles}) => {
    const [datas, setData] = useState([])
    const [spinner, setSpinner] = useState(false)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false);
    useEffect(() => {
      const cartegory = sessionStorage.getItem("cartegory")
      if (cartegory) {
        setData(JSON.parse(cartegory))
        setIsLoading(false)
      }else {
        try {
          api.get('/cartegory', config)
          .then(res => {
            // console.log(res.data)
            setData(res.data.results)
            setIsLoading(false)
            sessionStorage.setItem("cartegory", JSON.stringify(res.data.results))
          })
        } catch(error) {
          console.log(error)
          setIsLoading(false)
        }
      }
      }, [])
      
      const redirect = async (title, id) => {
        // console.log(paidTitles)
        const paidTitles = JSON.parse(localStorage.getItem("paid"))
        // console.log("clicked")
        if(paidTitles && paidTitles.includes(title)) {
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
    <div className='mx-4 popula py-3'>
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
       <div>
       {isLoading ? <div>
        {[1,1,1,1].map((_, index) => (
          <div>
            <div className='flex items-center justify-start gap-4 mb-3' key={index}>
              <Loader h1='h-10 w-10' h2='h-0'/>
              <Loader h1='' h2='h-4 w-80'/>
            </div>
            <div className='grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5  2xl:grid-cols-6'>
              {[1,1,1,1,1,1,1,1].map((_, index) => (
                <Loader h1='h-24' h2='h-6' key={index}/>
              ))}
            </div>
            <Loader h1='' h2='h-4'/>
          </div>
        ))}
      </div>: datas.map((cart, index) => (
            <div key={index} className='md:border-b-2 md:border-gray-100 md:border-opacity-10 hover:cursor-pointer'>
                <div className='text-white flex  items-center gap-2 font-bold text-opacity-90 pb-2 ' >
                    <Cartegory size={24}/>
                    <h2 className='text-xl capitalize '>{cart.cartName}</h2>
                </div>
                <div className='grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5  2xl:grid-cols-6'>
                    {cart.video_details.map((dat, index) => (
                      <div key={index} onClick={() => {
                            redirect(dat.title, dat.vidId)
                        }}>
                            <img src={require(dat.image)} className='img rounded-md' alt="" />
                            <p className='text-white text-opacity-60 text-sm tracking-wider font-serif my-1'>{dat.title}</p>
                        </div>
                    ))}
                </div>
                <NavLink to={`/cartegory/${cart.cartName}`} className="md:flex justify-end">
                    <CatButton/>
                </NavLink>
                    </div>
                ))}
        </div>
    </div>
  )
}

export default Cartegorised
