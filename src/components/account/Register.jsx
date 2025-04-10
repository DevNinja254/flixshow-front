
import React, {useState} from 'react'
import api, { config } from '../../js/api'
import { GrView as View } from "react-icons/gr";
import { BiHide as Hide} from "react-icons/bi";
const Register = ({settingRegister, isLoading, settingLoading}) => {
    const [errors, setError] = useState([])
    const [pwdMatch, setPwdMatch] = useState()
    const [change, setChange] = useState(false)
    const [showPwd, setShowPwd] = useState(false)
    const [formData, setFormData] = useState({
        "username": "",
        "email":"",
        "password1":"",
    }) 
    const handleSubmit= async(e) => {
        window.scrollTo(0,0)
        settingLoading(true)
        e.preventDefault();
        const resData = {
           "username": formData.username,
            "email": formData.email,
            "password1": formData.password1,
            "password2": formData.password1,
        }
        try {
            const res = await api.post("/register/", resData, config)
            const data = res.data
            // console.log(res.data)
            settingLoading(false)
            settingRegister(false, true) 
        } catch(error) {
            console.log(error)
            settingLoading(false)
            if(error.response.data) {
                console.log(error.response.data)
                for (const err in error.response.data) {
                    setError(errors => [...errors, error.response.data[err][0]])
                }

            }
        }
        
    }
    const handleChange = (e) => {
        setError([])
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
    })
    }
    const settingShow = () => {
        // console.log(showPwd)
        setShowPwd(!showPwd)
    }
  return (
    <div className={`${isLoading ? "opacity-60 " :'opacity-100 '}min-w-full`}>
        <div className='textMidSm text-red-700 capitalize my-2'>{errors.map((erro, index) => (
            <p>{erro}</p>
        ))}</div>
        <form onSubmit={handleSubmit}>
            <label  className="block text-sm my-2" htmlFor="username">Username</label>
            <input type="text"  className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600" disabled={isLoading} name='username'  value={formData.username} required={true} onChange={handleChange}/>
            <label  className="block text-sm my-2" htmlFor="email">Email</label>
            <input type="email" disabled={isLoading} className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600" name='email' required={true} value={formData.email} onChange={handleChange}/>
            <label  className="block text-sm my-2" htmlFor="password">Password</label>
            <div className='bg-gray-600 w-full py-2 px-1 pr-2 rounded-sm bg-opacity-15 text-gray-600 flex justify-between items-center gap-3'>
                <input type={`${showPwd ? "text": "password"}`} disabled={isLoading}  className="outline-none w-full bg-transparent " name='password1' required={true}  value={formData.password1} onChange={handleChange} />
                <div onClick={settingShow}>
                {showPwd ? <View   size={20}/> : <Hide size={20} />}
                </div>
            
            </div>
            <p className='opacity-70 text-sm py-2 '>Password must be at least 8 characters</p>
            {/* <label  className="block text-sm my-2" htmlFor="confirmpwd">Confirm Password</label>
            <input  type="password"  className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600" disabled={isLoading} name='password2' required={true}  value={formData.password2} onChange={handleChange}/>
            {
              change ? pwdMatch ? <p className='text-green-600 text-sm font-bold'>Password Match</p> : <p className='text-red-600 smMidText font-bold text-sm '>Password don't match.</p> : null
            } */}
            <p className='my-3 text-sm fontNewTimes tracking-wider text-gray-800'>Your personal data will be used to support your experience throughout this website, to manage access to your account and for other purposes described in our privacy policy.</p>
            <div>
            <button  className={`${isLoading ? "opacity-65": "opacity-100"} bg-sky-600 block w-full p-2 rounded-sm text-white font-bold hover:opacity-85`} type='submit' disabled={isLoading}>Create</button>
            </div>
        </form>
     </div>
  )
}

export default Register
