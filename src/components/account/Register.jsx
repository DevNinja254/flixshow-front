
import React, {useState} from 'react'
import api, { config } from '../../js/api'
const Register = ({settingRegister, isLoading, settingLoading}) => {
    const [errors, setError] = useState([])
    const [pwdMatch, setPwdMatch] = useState()
    const [change, setChange] = useState(false)
    const [formData, setFormData] = useState({
        "username": "",
        "email":"",
        "password1":"",
        "password2":"",
    }) 
    const handleSubmit= async(e) => {
        window.scrollTo(0,0)
        settingLoading(true)
        e.preventDefault();
        try {
            const res = await api.post("/register/", formData, config)
            const data = res.data
            console.log(res.data)
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
    if ([e.target.name] == "password2"){
        setChange(true)
        e.target.value == formData.password1 ? setPwdMatch(true) : setPwdMatch(false)
    }
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
            <input type="password" disabled={isLoading}  className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600" name='password1' required={true}  value={formData.password1} onChange={handleChange} />
            <p className='opacity-70 text-sm py-2 '>Password must be at least 8 characters</p>
            <label  className="block text-sm my-2" htmlFor="confirmpwd">Confirm Password</label>
            <input  type="password"  className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600" disabled={isLoading} name='password2' required={true}  value={formData.password2} onChange={handleChange}/>
            {
              change ? pwdMatch ? <p className='text-green-600 text-sm font-bold'>Password Match</p> : <p className='text-red-600 smMidText font-bold text-sm '>Password don't match.</p> : null
            }
            <p className='my-3 text-sm fontNewTimes tracking-wider text-gray-800'>Your personal data will be used to support your experience throughout this website, to manage access to your account and for other purposes described in our privacy policy.</p>
            <div>
            <button  className={`${isLoading ? "opacity-65": "opacity-100"} bg-sky-600 block w-full p-2 rounded-sm text-white font-bold hover:opacity-85`} type='submit' disabled={isLoading}>Create</button>
            </div>
        </form>
     </div>
  )
}

export default Register
