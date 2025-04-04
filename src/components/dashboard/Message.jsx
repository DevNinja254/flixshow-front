import React, { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { TiMessageTyping as Typer } from "react-icons/ti";
import api, { config } from '../../js/api';
import Loader from '../../boilerplates/Loader';
const Message = () => {
  const [message, setMessages] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const fetchin = async () => {
    const res = await api.get("/notification/?ordering=-date_notified", config)
    const data = res.data.results
    // console.log(data)
    setMessages(data)
    setIsLoading(false)
 }
  useEffect(() => {
    
    fetchin()
  }, [])

  const result = []
  if (!isLoading){
    for (const mess of message) {
      result.push(mess.message)
      result.push(2000)
    }
  }

  return (
    <div className='py-3'>
      {isLoading ? <div>
        <Loader h1='h-7 w-32' h2='h-32'/>
      </div> : <>
        <div className='text-white flex mx-4 items-center gap-2 font-bold text-opacity-80'>
            <Typer size={27}/>
            <h2 className='text-xl'>Info</h2>
        </div>
      <TypeAnimation
      sequence={result.map(messa => messa)}
      wrapper='div'
      speed={50}
      className='text-sky-300 text-sm text-center px-4 py-2 tracking-wide capitalize'
      repeat={Infinity}

      />
      </>}
    </div>
  )
}

export default Message
