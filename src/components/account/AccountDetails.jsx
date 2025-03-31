import React, {useState, useEffect} from 'react'

const AccountDetails = ({userData}) => {
  // console.log(userData)
  const [profile, setProfile] = useState({})
  useEffect(() => {
    if(userData) {
      setProfile(userData.profile)
    }
  })
  function convertTimestampToDate(timestampString) {
    const date = new Date(timestampString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  return (
    <div className='text-white m-3 border-2 border-gray-300 border-opacity-20 rounded-md '>
      <div className='grid grid-cols-2 justify-between p-2 bg-slate-500 bg-opacity-40 text-sm font-mono capitalize'>
        <p>Username</p>
        <p>{userData.username}</p>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-gray-400 bg-opacity-40 text-sm font-mono capitalize'>
        <p>Email</p>
        <p>{userData.email}</p>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-slate-500 bg-opacity-40 text-sm font-mono'>
        <p>Phone number</p>
        <p>+254{profile.phone_number}</p>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-gray-400 bg-opacity-40 text-sm font-mono capitalize'>
        <p>Account Balance</p>
        <p>Ksh. {profile.account}</p>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-slate-500 bg-opacity-40 text-sm font-mono capitalize'>
        <p>Date Joined</p>
        <p>{convertTimestampToDate(userData.date_joined)}</p>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-gray-400 bg-opacity-40 text-sm font-mono capitalize'>
        <p>country</p>
        <p>{profile.country}</p>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-slate-500 bg-opacity-40 text-sm font-mono capitalize'>
        <p>city</p>
        <p>{profile.city}</p>
      </div>
    </div>
  )
}

export default AccountDetails
