import React, {useEffect, useState} from 'react'
import Layout from '../layout/Layout'
import { useNavigate } from 'react-router-dom'
import { BarLoader as Spinner } from 'react-spinners'
import api, { config } from "../js/api"
import { useParams } from 'react-router-dom'; // or your routing library

function ResetPasswordForm() {
  const [pwdMatch, setPwdMatch]  = useState(false)
  const { slug } = useParams(); // Get the token from URL
  const [erro, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [display, setDisplay] = useState(false)
  const [less, setLess] = useState(false)
  const [pwd1, setPwd1] = useState("") 
  const [pwd2, setPwd2] = useState("") 
  const [change, setChange] = useState(false)
  // console.log(slug)
  const navigate = useNavigate()
  const handleSubmit= async (e) => {
    window.scrollTo(0,0)
    setDisplay(false)
    setError(false)
    setLess("")
    setChange(false)
    e.preventDefault();
    if (pwd1 === pwd2){
      if (pwd1.length >= 8) {
        setSubmitting(true)
        // console.log(formData)
        const data = {
          token: slug,
          new_password: pwd1
        }
        try {
          const res = await api.post('/password_reset/reset/', data, config)
            // console.log(res.data)
              setSubmitting(false)
              setSubmitted(true)
              setDisplay(true)
        } catch(error) {
            setSubmitting(false)
            setError(true)
        }
      } else {
        setLess("Password minimum, 8 characters!")
      }
    } else {
      setLess("Password don't match!")
    }
  }
  const handlePwd1 = (e) => {
    setLess("")
    setDisplay(false)
    setPwd1(e.target.value)
    if (e.target.value.length < 8) {
      setLess("Password minimum, 8 characters!")
    } else {
      setLess("")
    }
  }
  const handlePwd2 = (e) => {
    setLess("")
    setDisplay(false)
    setPwd2(e.target.value)
    // console.log(e.target.value)
    setChange(true)
    if(pwd1 == e.target.value) {
      setPwdMatch(true)
    } else {
      setPwdMatch(false)
    }
  }
  if (submitted) {
      // console.log("sumitted")
      setTimeout(() => {
        navigate("/account/authenticate/")
      }, 4000)
    }
      useEffect(() => {
        window.scrollTo(0,0)
        document.title = "Password | reset"
      }, [])
    return (
        <Layout>
                <Spinner
          color="rgba(0,0,0,0.3)"
          loading={submitting}
          cssOverride={{
            "width": "100%",
            "backgroundColor": "white"
          }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {/* stk sent */}
        {submitted ? <p className='fixed top-1 right-1 z-20 bg-green-600 text-white p-2 text-sm rounded-md font-bold'>Password reset link sent.</p>:null}
        {/* error processing */}
        {erro ? <p className='fixed top-1 right-1 z-20 bg-red-600 text-white p-2 text-sm rounded-md font-bold'>Error! sending email. Try again.</p>:null}
      <main className={`m-6 py-2 autheticate ${submitting ? "opacity-50" : "opacity-100"}`}>
        <h2 className='text-center'>Enter New Password.</h2>
        {display ? <p className='my-2 bg-red-700 bg-opacity-15 text-green-700 p-2 text-center text-sm font-bold rounded-md'>
            You will be redirecred to login page
        </p>:null}
         <p className='text-red-500 textMidSm font-bold'>{less}</p> 
      <form onSubmit={handleSubmit}>
            <label  className="block text-sm my-2" htmlFor="pwd1">New Password</label>
            <input type="password"  className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600" name='pwd1'  value={pwd1} required={true} onChange={handlePwd1}/>
            <label  className="block text-sm my-2" htmlFor="emial">Confirm New Password</label>
            <input type="password"  className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600" name='pwd2'  value={pwd2} required={true} onChange={handlePwd2}/>
            
            <div>
            {change ? pwdMatch ? <p className='text-green-600 text-sm font-bold'>Password Match</p> : <p className='text-red-600 smMidText font-bold text-sm '>Password don't match.</p> : null}
            <button  className={` bg-sky-600  w-full p-2 rounded-sm text-white font-bold hover:opacity-85 block mt-2`} type='submit' disabled={submitting} onSubmit={handleSubmit}>Submit</button>
            </div>
        </form>
      </main>
    </Layout>
    );
}

export default ResetPasswordForm;

