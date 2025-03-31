import React, { useEffect, useState } from 'react'

const PurchaseHistory = () => {
    const hist = [1,11,11,1,11,1]
    const [datas, setData] = useState([])
    useEffect(() => {
      const data = localStorage.getItem("paidVideo")
      if (data) {
        setData(JSON.parse(data))
      }
    }, [])
    // console.log(data)
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
      <div className='text-white m-3 border-2 border-gray-300 border-opacity-20 rounded-md '>
          <h1 className='text-center py-2 font-mono'>Purchase History</h1>
          {datas.map((data, index) => (
              index % 2 == 0 ? <div className='grid grid-cols-3 justify-between p-2 bg-slate-500 bg-opacity-40 text-sm font-mono'>
                <p>{data.video_name}</p>
              <p>Ksh, {data.price ? data.price : data.cost}</p>
              <p>{data.purchase_time ?data.purchase_time  : convertTimestampToDateTime(data.time)}.</p>
            </div> :
             <div className='grid grid-cols-3 justify-between p-2 bg-gray-400 bg-opacity-40 text-sm font-mono'>
                  <p>{data.video_name}</p>
             <p>Ksh, {data.price ? data.price : data.cost > 0 ? data.cost: null}</p>
             <p>{data.purchase_time ?data.purchase_time  : convertTimestampToDateTime(data.time)}</p>
           </div>
          ))}
        
       
      
      </div>
    )
}

export default PurchaseHistory
