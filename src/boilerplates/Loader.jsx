import React from 'react'

const Loader = ({h1="h-32", h2="h-5"}) => {
  return (
   <div className='p-1 hoder'>
     <div className={`${h1} rounded-md bg-gray-400 bg-opacity-20 boiler1`} >
      </div>
      <div className={`${h2} bg-gray-700  rounded-md bg-opacity-60 mt-2 boiler`}>

      </div>
   </div>
  )
}

export default Loader
