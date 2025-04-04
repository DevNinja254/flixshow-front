import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { AiFillLike as Like } from "react-icons/ai";
import { MdStarRate as Rate } from "react-icons/md";
import { FaComment as Comment } from "react-icons/fa";
import { IoMdPricetags as Price} from "react-icons/io";
import { FaUserCircle as User} from "react-icons/fa";
import { FaStar as Star } from "react-icons/fa";
import api from '../js/api';
import { useNavigate } from 'react-router-dom';
import Loader from '../boilerplates/Loader';
import { config as configurer } from '../js/api';
const Mp4 = () => {
   
    const star = [1,2,3,4,5,6,7,8,9,10]
    // const ment = [1,1,1]
    const [datas, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isPurchasing, setPurchasing] = useState(false)
    const path = window.location
    const id = path.search.split("=")[1]
    const [userData, setUserData] = useState()
    const [authenticated, setAuthenticated] = useState(false)
    const [cartExist,  setCartExist] = useState(false)
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const[add, setAdd] = useState(false)
    const[failedPurchased, setFailedPurchased] = useState(false)
    const settingCart = (obj) => {
         // cart items
         const carty = localStorage.getItem("cart")
         if (carty) {
             setCart(JSON.parse(carty))
             for (const car of JSON.parse(carty)) {
                // console.log(car.video_name, obj.title)
                 if (car.video_name == obj.title) {
                     setCartExist(true)
                    //  console.log("cart")
                 }
             }
            
         }
    }
    useEffect(() => {
        window.scrollTo(0,0)
        const token = localStorage.getItem("access_token")
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
                    setUserData(dataProfile)
                    setAuthenticated(true)
                })} catch(error) {
                    setAuthenticated(false)
                    console.log(error)
                }
        }
                
        try {
            api.get(`/videoDetails/${id}/`, configurer)
        .then(res => {
            // console.log(res.data)
            setData(res.data)
            document.title = res.data.title
            setIsLoading(false)
            settingCart(res.data)
        })
        }catch {
            setIsLoading(false)
        }
    }, [])
    // console.log(cart)
    const addCart = () => {
        // if (authenticated) {
            if (window.confirm(`Add ${datas.title} to cart`)) {
                    // console.log("it ok")
                const data =[ {
                    // username: userData.username,
                    video_name: datas.title,
                    video_id:datas.vidId,
                    image_url:datas.image,
                    price: datas.price,
                    cartegory: datas.cartegory,
                    type:datas.typs,
                    season: datas.season,
                }]
                localStorage.setItem("cart", JSON.stringify([...cart, ...data]))
                settingCart(datas)
                setAdd(true)
                // api.post("/cart/", data)
                // .then(res => {
                //     console.log(res.data)
                // })
                // save to local storage
        }
        // } else {
        //     navigate("/account/authenticate/")
        // }
     
    }
    const purchase = () => {
        setPurchasing(true)
        if (authenticated) {
            if (window.confirm(`Purchase ${datas.title} at Ksh ${datas.price}. Your account balance is Ksh.${userData.profile.account}`)) {
                if (userData.profile.account >= datas.price) {
                    const data = {
                        username: userData.username,
                        video_name: datas.title,
                        image_url:datas.image,
                        price: datas.price,
                        video_id:datas.vidId,
                    }
                    try {
                        api.patch(`/profile/${userData.profile.buyerid}/`, {account: (userData.profile.account - datas.price)}, configurer)
                        .then(res => {
                            // console.log(res.data)
                            try {
                                api.post("/purchased/", data, configurer)
                            .then(res => {
                                // console.log(res.data)
                                const paid = localStorage.getItem("paid").split(",")
                                localStorage.setItem("paid" , [...paid, String(res.data.video_name).toLowerCase()].join(","))
                                // console.log(paid)
                                setPurchasing(false)
                                navigate(`/store/play/${res.data.video_name}?q=${res.data.video_id}`)
                            })
                            } catch(error) {
                                setFailedPurchased(true)
                            }
                        })
                    } catch(error) {
                        setFailedPurchased(true)
                    }
                    
                } else {
                    navigate("/account/deposit/")
                }
            }
        } else {
            navigate("/account/authenticate/")
        }
        
    }
    const starz = () => {
        let total = 0
        if(!isLoading  & datas.reviews.length !== 0) {
            for (const da of datas.reviews) {
                total += da.rate
            }
            const result = Number(total / (datas.reviews.length * 10) * 10).toFixed(1)
            return result
        }
        
       return total
    }
  
  return (
    <Layout>
      <main className='cartMain relative  '>
        {/* {add ? <div className={`text-white absolute top-0 z-20 right-3 bg-green-600 text-sm p-2 rounded-md font-bold capitalize`}>{datas.title} Added to cart</div>:null} */}

     {  isLoading ? <div>
        <div>
            {/* title and season */}
            <div className='p-4'>
                <Loader h1='h-7 w-32' h2=''/>
                <Loader h2='h-7 w-32' h1=''/>
            </div>
            {/*  */}
            <div className='grid grid-cols-2 gap-4 my-3 md:w-4/5 mx-auto lg:w-full'>
                {/* img add cart purchase */}
                <div>
                    <Loader h1='h-32' h2=''/>
                    <Loader h2='h-7' h1=''/>
                    <Loader h2='h-7' h1=''/>
                </div>
                <div className='mx-2'>
                    {/* like */}
                    <div className='grid grid-cols-2 gap-2 items-start'>
                        <Loader h1='h-7' h2=''/>
                        <Loader h2='h-7' h1=''/>
                    </div>
                    {/* rate */}
                    <div className='grid grid-cols-2 gap-2 items-start'>
                        <Loader  h1='h-7' h2=''/>
                        <Loader h2='h-7' h1=''/>
                    </div>
                    {/* price */}
                    <div className='grid grid-cols-2 gap-2 items-start'>
                        <Loader h1='h-7' h2=''/>
                        <Loader h2='h-7' h1=''/>
                    </div>
                </div>
            </div>
        </div>
        {/* synopis */}
        <div className='w-5/6 m-auto my-2 '>
            <Loader h1='h-7' h2=''/>
            <Loader h2='h-32' h1=''/>
        </div>
        {/* comment */}
        <div className='bg-slate-600 bg-opacity-40 p-3 rounded-md '>
            <Loader h1='h-7' h2=''/>
            <div className='grid grid-cols-3 gap-3'>
                <Loader h2='h-32' h1=''/>
                <Loader h2='h-32' h1=''/>
                <Loader h2='h-32' h1=''/>
            </div>
        </div>
     </div> : <div className='lg:grid grid-cols-5 gap-4 lg:w-4/5 lg:mx-auto'>
     {cartExist ? <div className='text-white absolute top-0 z-20 right-3 bg-green-600 text-sm p-2 rounded-md font-bold capitalize '>{datas.title} Already in cart</div>:null}
        <div className='relative z-10 col-span-3'>
        <img src={require(datas.image)} className='absolute lg:hidden -z-10 w-full h-full object-cover' alt="" />
        <div className='div text-white p-4'>
            <div className='font-bold text-lg'>
                <p>{datas.title}</p>
                <p className='text-slate-300'>{datas.season}</p>
            </div>
            <div className='grid grid-cols-2 gap-4 my-3 md:w-4/5 mx-auto lg:w-full'>
                <div>
                    <figure>
                        <img src={require(datas.image)} className='object-cover rounded-md w-full block' alt="" />
                    </figure>
                    <div>
                        {cartExist ? null : <>
                        
                            <span className='block my-3 bg-sky-700 p-1 rounded-md text-center text-sm font-bold hover:cursor-pointer' onClick={addCart}>Add Cart</span>
                            {isPurchasing ? <span className='block hover:cursor-pointer my-3 bg-sky-700 p-1 rounded-md text-center text-sm font-bold opacity-50 ' onClick={purchase}>Purchasing...</span> : <span className='block hover:cursor-pointer my-3 bg-sky-700 p-1 rounded-md text-center text-sm font-bold ' onClick={purchase}>Purchase</span>}
                        </>
                        }
                    </div>
                </div>
                <div className='mx-2'>
                   <div className='flex gap-2 items-center pb-2 text-sm '>
                        <Like color='green' size={25}/>
                        <p>{datas.likes.length}</p>
                    </div> 
                    <div className='flex gap-2 items-center pb-2 text-sm '>
                        <Rate color='yellow' size={25}/>
                        <p>{starz()} / 10</p>
                    </div> 
                    <div className='flex gap-2 items-center pb-2 text-sm '>
                        <Price color='skyblue' size={25}/>
                        <p>Ksh. {datas.price}</p>
                    </div> 
                </div>
            </div>
        </div>
        <div className='bg-black bg-opacity-90 p-4'>
            <p className='text-sky-300 md:w-4/5 font-mono text-sm'>Synopsis Of {datas.title} Torrent On Kingstonemovies:</p>
            <p className='text-slate-400 text-sm tracking-wide py-1'>Movie Story : {datas.synopsis}</p>
       </div>
       </div>
       <div className='text-white p-3 col-span-2'>
            <p className='text-center text-lg my-2'>Comments</p>
            {datas.reviews.map((review, index) => (
                <div className='bg-slate-600 bg-opacity-40 p-3 rounded-md my-3'  key={index}>
                {/* Star */}
                <div className='flex my-2 gap-1'>
                    {star.map((rat, index) => (rat <= review.rate ? <Star color='yellow' key={index}/> : <Star color="white" key={index}/>))}
                </div>
                {/* user */}
                <div className='flex py-3 items-center gap-3 text-slate-300'>
                    <User size={23}/>
                    <p>{review.user}</p>
                </div>
                <div className='text-gray-400 flex'>
                    
                    <p>{review.comment}</p>
                    <Comment className='text-4xl'  color='skyBlue'/>
                </div>
            </div>
            ))}
       </div>
        </div>}
        {/* failed purchase */}
       {failedPurchased ?  <p className='fixed bottom-3 left-3 bg-red-700 text-white z-10 text-sm p-2 font-bold rounded-md '>Failed to Purchase!</p>:null}
      </main>
    </Layout>
  )
}

export default Mp4
