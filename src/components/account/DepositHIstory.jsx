import React, { useEffect, useState } from 'react'
import api, { config } from "../../js/api"
import Loader from '../../boilerplates/Loader'
const DepositHistory = ({userData}) => {
    const [datas, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      
      api.get(`/deposit_history/?name=${userData.username}`, config)
      .then(res => {
        const data = res.data
        const dat2 = []
        for (const dat of data) {
          dat2.unshift(dat)
        }
        setData(dat2)
        setLoading(false)
      })
    }, [])
    function convertTimestampToDateTime(timestampString) {
      const date = new Date(timestampString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
    
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    
  return (
    <div className='text-white m-3 border-2 border-gray-300 border-opacity-20 rounded-md ' >
        <h1 className='text-center py-2 font-mono'>Deposit History</h1>
        <div style={{
      maxHeight: "50vh",
      "overflowY" : "scroll"
    }}>
        {loading ? <div>
              <Loader h1='h-32'/>
            </div> : datas.map((data, index) => (
            index % 2 == 0 ? <div className='grid grid-cols-2 justify-between p-2 bg-slate-500 bg-opacity-40 text-sm font-mono' key={index}>
            <p>Ksh, {data.amount}</p>
            <p>{convertTimestampToDateTime(data.time)}</p>
          </div> :
           <div key={index} className='grid grid-cols-2 justify-between p-2 bg-gray-400 bg-opacity-40 text-sm font-mono'>
           <p>Ksh, {data.amount}</p>
           <p>{convertTimestampToDateTime(data.time)}</p>
         </div>
        ))}
      </div>    
    </div>
  )
}

export default DepositHistory
