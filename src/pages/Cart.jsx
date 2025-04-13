import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { useNavigate } from 'react-router-dom'
import api, { config } from '../js/api'
import { BarLoader as Spinner } from 'react-spinners'
const Cart = () => {
    const carr = [1,1,1,1]
    const [purchse, setPurchse] = useState(false)
    const [error, setError] = useState(false)
    const [total, setTotal] = useState(0)
    const [authenticated, setAuthenticated] = useState(false)
    const [cart, setCart] = useState([])
    const navigate = useNavigate()
    const [userData, setUserData] = useState()
    const [paidvideos, setPaidVideos] = useState(null)
     // console.log(cart)
     const getTotal = (objs) => {
        let ttl = 0
        for (const totl of objs) {
            ttl += totl.price
        }
        setTotal(ttl)
       }
    // cart items
    const settingCart = () => {
        const carty = localStorage.getItem("cart")
        if (carty) {
            setCart(JSON.parse(carty)) 
            getTotal(JSON.parse(carty))          
        }
   }
   const remove = (title) => {
        if(true) {
            const datz = cart.filter(obj => obj.video_name !== title)
            localStorage.setItem("cart", JSON.stringify(datz))
            // console.log(datz)
            settingCart()
            
        }
    }
    const purchase = () => {
        setPurchse(true)
        if (authenticated) {
            if (window.confirm(`Purchase ${cart.length} videos at cost of Ksh ${total}. Your account balance is Ksh.${userData.profile.account}`)) {
                // console.log(userData.profile)
                if (userData.profile.account >= total) {
                    
                    
                    for (const carty of cart) {
                        const paid = localStorage.getItem("paidVideo")
                        const paidTitles = localStorage.getItem("paid")
                        api.post("/purchased/", {
                            username: userData.username,
                            video_name: carty.video_name,
                            image_url:carty.image_url,
                            price: carty.price,
                            video_id:carty.video_id,
                        }, config)
                        .then(res => {
                            if(paidTitles) {
                                localStorage.setItem("paid", JSON.stringify([...JSON.parse(paidTitles), ...[carty.video_name]]))
                            }else {
                                localStorage.setItem("paid", JSON.stringify([carty.video_name]))
                            }
                            if(paid) {
                                localStorage.setItem("paidVideo", JSON.stringify([...JSON.parse(paid), ...[{
                                    video_name: carty.video_name,
                                    image_url: carty.image_url,
                                    price: carty.price,
                                    video_id: carty.video_id,
                                }]]))
                            }else {
                                localStorage.setItem("paidVideo", JSON.stringify([{
                                    video_name: carty.video_name,
                                    image_url: carty.image_url,
                                    price: carty.price,
                                    video_id: carty.video_id,
                                }]))
                            }
                            
                            // console.log(cart.length)
                            if (cart.indexOf(carty) === cart.length - 1) {
                                navigate("/purchased/")
                                setPurchse(false)
                            }
                            // remove(res.data.video_name)
                        })
                    }
                    // localStorage.setItem("paidVideo", JSON.stringify(paidvideos))
                    localStorage.removeItem("cart")
                    api.patch(`/profile/${userData.profile.buyerid}/`, {account: userData.profile.account + total}, config)
                    .then(res => {
                        
                        // console.log(res.data)
                    })
                    
                } else {
                    navigate("/account/deposit/")
                }
            }
           
        } else {
            setPurchse(false)
            navigate("/account/authenticate/")
        }
    }   
    useEffect(() => {
        window.scrollTo(0,0)
        document.title = "Your Cart"
        settingCart()
        const token = localStorage.getItem("access_token")
        const paid = localStorage.getItem("paidVideo")
        if (paid) {
            setPaidVideos(JSON.parse(paid))
        } 
        const paidTitles = JSON.stringify(localStorage.getItem("paid"))
        console.log(paidTitles)
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
                //    console.log(res.data)
                })} catch(error) {
                    setAuthenticated(false)
                    console.log(error)
                }
        }
    }, [])
   
       
  return (
    <Layout>
        <div className='fixed top-0 left-0 w-full z-30'>
              <Spinner
                color="rgba(255,255,255,0.5)"
                // backgroundColor="black"
                loading={purchse}
                cssOverride={{
                  "width": "100%",
                  "backgroundColor": "transparent"
                }}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
      <main className='cart text-white'>
        <h2 className=' text-center py-3 font-bold font-mono'>Your Cart ({cart.length} items)</h2>
        <div className='p-3 lg:w-10/12 m-auto'>
            <div className='sm:grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4'>
                {cart.map((cat, index) => (
                    <div key={index} className='grid grid-cols-2 gap-3 bg-slate-600 p-3 rounded-md bg-opacity-50 my-3'>
                    <figure>
                        <img src={require(cat.image_url)} className='img rounded-md block' alt="" />
                    </figure>
                    <div className='text-sm font-mono capitalize  text-amber-500'>
                        <p className=''>{cat.video_name}</p>
                        <p>{cat.type}</p>
                        <p>{cat.season}</p>
                        <p>Ksh.{cat.price}</p>
                        <span className='bg-red-700 text-white p-1 mt-2 block text-center rounded-md text-sm font-bold hover:cursor-pointer hover:opacity-80' onClick={() => {
                            remove(cat.video_name)
                        }}>Remove</span>
                    </div>
                </div>
                ))}                
            </div>
            <div className='bg-slate-500 bg-opacity-20 p-3'>
                    <span className='flex gap-3 text-sm font-mono tracking-wide'>
                        <p>Estimated Total: </p>
                        <p>Ksh.{total}</p>
                    </span>
                    <button disabled={purchse} className={`bg-green-700 my-2 p-2 rounded-md text-sm font-bold hover:opacity-80 ${purchse ? "opacity-80": "opacity-100"}`} onClick={purchase}>{purchse ? "Purchasing" : "Purchase"}</button>
                </div>
        </div>
        
      </main>
    </Layout>
  )
}

export default Cart
