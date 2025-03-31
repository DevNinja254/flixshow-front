import React, {useEffect, useState} from 'react'
import Layout from '../layout/Layout'
import { TypeAnimation } from 'react-type-animation'
import { useNavigate } from 'react-router-dom'
import { BarLoader as Spinner } from 'react-spinners'
import api from "../js/api"
const Message = () => {
  const [submitting, setSubmitting] = useState(false)
  const [proid, setProid] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [erro, setError] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
        "email": "",
        "message":"",
  }) 
  const handleSubmit= async (e) => {
    window.scrollTo(0,0)
    setSubmitting(true)
    e.preventDefault();
    try {
      const res = await api.post('/message/', formData)
        setSubmitting(false)
        setSubmitted(true)
        // setFormData({
        //     email: "",
        //     message: ""
        // })
    } catch(error) {
        setSubmitting(false)
        // console.log(error)
    }
  }
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    window.scrollTo(0,0)
    document.title = "Message"
  }, [])
  if (submitted) {
    // console.log("sumitted")
    setTimeout(() => {
      setSubmitted(false)
    }, 7000)
  }
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
        {submitted ? <p className='fixed top-1 right-1 z-20 bg-green-600 text-white p-2 text-sm rounded-md font-bold'>Message sent successful.</p>:null}
        {/* error processing */}
        {erro ? <p className='fixed top-1 right-1 z-20 bg-red-600 text-white p-2 text-sm rounded-md font-bold'>Error! Sending Message. Try again.</p>:null}
      <main className={`m-6 py-2 autheticate ${submitting ? "opacity-50" : "opacity-100"}`}>
        <h2 className='text-center'>Message</h2>
      <form onSubmit={handleSubmit}>
            <label  className="block text-sm my-2" htmlFor="email">Email:</label>
            <input type="email"  className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600" name='email'  value={formData.email} required={true} onChange={handleChange}/>
            <label  className="block text-sm my-2" htmlFor="message">Message:</label>
            <textarea type="text"  className="outline-none bg-gray-600 block w-full py-2 px-1 rounded-sm bg-opacity-15 text-gray-600" name='message' required={true} value={formData.message} onChange={handleChange}></textarea>
            <div>
            <button  className={` bg-sky-600  w-full p-2 rounded-sm text-white font-bold hover:opacity-85 block mt-2`} type='submit' disabled={submitting} onSubmit={handleSubmit}>Send</button>
            </div>
        </form>
      </main>
    </Layout>
  )
}

export default Message
