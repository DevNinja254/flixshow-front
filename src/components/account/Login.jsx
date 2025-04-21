import React, {useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import api, { config } from '../../js/api'

const Login = ({settingLoading, isLoading}) => {
    const [errors, setError] = useState([])
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const handleSubmit= async (e) => {
        settingLoading(true)
        e.preventDefault();
        try {
            const res = await api.post("/login/", formData, config)
            const data = res.data
            console.log(data)
            localStorage.setItem("Authenticated", true)
            localStorage.setItem("refresh_token", data.tokens.refresh)
            localStorage.setItem("admin",data.is_staff )
            localStorage.setItem("access_token", data.tokens.access)
            settingLoading(false)
            navigate("/")
        }catch(error) {
            settingLoading(false)
            if(error.response.data) {
                console.log(error.response.data)
                for (const err in error.response.data) {
                    setError(error.response.data[err][0])
                }

            }
        }
    } 
    const handleChange = (e) => {
        setError("")
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
    })
    }
  return (
    <div className='min-w-full'>
        <p className='textMidSm capitalize text-red-700 '>{errors}</p>
        <form onSubmit={handleSubmit}>
            <label  className="block text-sm my-2" htmlFor="email">Email</label>
            <input type="email"  className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600 text-sm" name='email' id='email' onChange={handleChange}/>
            <label  className="block text-sm my-2" htmlFor="password">Password</label>
            <input type="password"  className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600 text-sm" name='password' id='password' onChange={handleChange} />
            <NavLink to="/account/password_reset" className='my-3 text-sm text-sky-500 font-bold hover:cursor-pointer '>Forgot your password?</NavLink>
            <div>
            <button disabled={isLoading} className={`bg-sky-700 block w-full p-2 rounded-sm text-white font-bold hover:opacity-85' type='submit ${isLoading ? "opacity-50": null}`}>sign in</button>
            </div>
        </form>
    </div>
  )
}

export default Login
