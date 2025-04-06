import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import AccountDetails from '../components/account/AccountDetails'
import AccountEdit from '../components/account/AccountEdit'
import { NavLink , useNavigate} from 'react-router-dom'
import DepositHistory from '../components/account/DepositHIstory'
import PurchaseHistory from '../components/account/PurchaseHistory'
import api from "../js/api"
import * as jwtDecode from 'jwt-decode';
import Loader from '../boilerplates/Loader'
const Account = () => {
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    const profileset = () => {
        profile ? setProfile(false):setProfile(true)
    }
    const setttingUpdating = (value) => {
        updating ? setUpdating(false) : setUpdating(true)
    }
    const authenticator = async (config) => {
        try {
            const res = await api.get("/info/", config)
            const dataProfile = res.data
            setUserData(dataProfile)
            // console.log(dataProfile)
            document.title = `${dataProfile.username} | Account`
            setLoading(false)
        } catch {
            navigate('/account/authenticate')
        }
    }
    useEffect(() => {
        window.scrollTo(0,0)
        setUpdate(false)
        const authentic = localStorage.getItem("Authenticated")
        if (authentic == "true") {
            setAuthenticated(true)
            const token = localStorage.getItem("access_token")
            // if authenticated
            if(token) {
            const config = {
                headers : {
                "Authorization" : `Bearer ${token}`
                }
            }
               authenticator(config)                    
            } else {
                navigate('/account/authenticate')
            }
        }else {
            navigate('/account/authenticate')
        }
    }, [updating])
    const logout = async() => { 
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("Authenticated")
        localStorage.removeItem("paid")
        localStorage.removeItem("paidVideo")
        localStorage.removeItem("username")
        localStorage.removeItem("admin")
        localStorage.removeItem("proID")
        navigate('/account/authenticate')
    }
  return (
    <Layout>
        <main className='bg-black p-2 '>
           
           <div className='lg:w-10/12 mx-auto 2xl:w-4/5'>
           {
            loading ? <div>
                <div className='text-sky-300 flex flex-col items-center my-5 gap-2'>
                    {/* image */}
                    <Loader h1='h-32 w-32 rounded-full' h2=""/>
                    {/* links */}
                    <div className=' flex gap-3 text-sm font-bold font-mon tracking-wide'>
                        <Loader h1='' h2='h-5 w-20'/>
                        <Loader h1='' h2='h-5 w-20'/>
                        <Loader h1='' h2='h-5 w-20'/>
                    </div>
                </div>
                    {/* pro and dash */}
                    <div className='flex gap-2'>
                        <Loader h2='' h1='h-10 w-32'/>
                        <Loader h2='' h1='h-10 w-32'/>
                    </div>
                    {/* history */}
                    <Loader  h1='' h2='h-40'/>
                    <Loader h1='' h2='h-40'/>
                    <Loader h1='' h2='h-40'/>
            </div> :
            <>
                <div className='text-sky-300 flex flex-col items-center my-5 gap-2'>
                <figure>
                    <img className='profilePic block' src={require(userData.profile.profile_pic)} alt="" />
                </figure>
                <nav className=' flex gap-3 text-sm font-bold font-mono tracking-wide hover:cursor-pointer'>
                    <div onClick={logout}>Logout</div>
                    <NavLink to="/account/deposit">Deposit</NavLink>
                    <p onClick={() => {
                        update ? setUpdate(false):setUpdate(true)
                    }} className='hover:cursor-pointer'>Update</p>
                </nav>
            </div>
            <div className='text-white mx-3'>
                <span className={`mx-3 bg-sky-600 text-sm  p-2 font-bold rounded-md hover:cursor-pointer  ${profile ? "opacity-100" : "opacity-60 inline-block"}`} onClick={profileset}>Profile</span>
                <span className={`mx-3 bg-sky-600 text-sm  p-2 font-bold rounded-md hover:cursor-pointer  ${!profile ? "opacity-100" : "opacity-60 inline-block"}`} onClick={profileset}>DashBoard</span>
            </div>
        { profile ? <div>
        {!update ? <AccountDetails userData={userData}/> : <AccountEdit userData={userData} setttingUpdating={setttingUpdating}/>}
        </div>: <>
            <DepositHistory userData={userData}/>
            <PurchaseHistory userData={userData}/>
        </>}
            </>
           }
        </div>
        </main>
           
    </Layout>
  )
}

export default Account
