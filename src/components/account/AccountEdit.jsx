import React, { useState } from 'react'
import api, { config } from '../../js/api'

const AccountEdit = ({userData, setttingUpdating}) => {
  // console.log(userData)
    const [imageFile, setImageFile] = useState(null);
    const handleImageChange = (e) => {
      // Get the File object from the event
      setImageFile(e.target.files[0]);
    };
    const [formData, setFormData] = useState({
        "username": userData.username,
        "email":userData.email,
        "phone_number":userData.profile.phone_number,
        country: userData.profile.country,
        city: userData.profile.city,
        profile_pic: "",
    })
    const handleChange = (e) => {
        // console.log(e.target.value)
        setFormData({
            ...formData,
            [e.target.name] :e.target.value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(formData)
        const formDat = new FormData()
        formDat.append("phone_number", formData.phone_number)
        formDat.append("username", formData.username)
        formDat.append("country", formData.country)
        formDat.append("city", formData.city)
        if (imageFile) {
          // console.log("update")
          formDat.append("profile_pic", imageFile)
        }

        const res1 = await api.patch(`/members/${userData.id}/`, {
          email: formData.email
        }, config)
        const data1 = res1.data
        // console.log(data1)
        // profile
        const res2 = await api.patch(`/profile/${userData.profile.buyerid}/`, formDat, config)
        const data2 = res2.data
        // console.log(data2)
        setttingUpdating(true)

    }
  return (
    <form className='text-white m-3 border-2 border-gray-300 border-opacity-20 rounded-md '>
      {/* <div className='grid grid-cols-2 justify-between p-2 bg-slate-500 bg-opacity-40 text-sm font-mono'>
        <p>Username</p>
        <input type='text' name='username' value={formData.username} autoFocus className='outline-none bg-transparent' onChange={handleChange}/>
      </div> */}
      <div className='grid grid-cols-2 justify-between p-2 bg-gray-400 bg-opacity-40 text-sm font-mono'>
        <p>Email</p>
        <input type='email' name='email' value={formData.email} className='outline-none bg-transparent' onChange={handleChange}/>
      
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-slate-500 bg-opacity-40 text-sm font-mono'>
        <p>Phone number</p>
        <input type='number' name='phone_number' value={formData.phone_number} className='outline-none bg-transparent' onChange={handleChange}/>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-gray-400 bg-opacity-40 text-sm font-mono'>
        <p>country</p>
        <input type='text' name='country' value={formData.country} className='outline-none bg-transparent' onChange={handleChange}/>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-slate-500 bg-opacity-40 text-sm font-mono'>
        <p>city</p>
        <input type='text' name='city' value={formData.city} className='outline-none bg-transparent' onChange={handleChange}/>
      </div>
      <div className='grid grid-cols-2 justify-between p-2 bg-gray-400 bg-opacity-40 text-sm font-mono'>
        <p>Profile Image</p>
        <input type='file' name='profile_image' value={formData.profile_pic} className='outline-none bg-transparent' onChange={handleImageChange}/>
      </div>
      <button className='bg-slate-600 text-white m-3 text-sm p-2 rounded-md' onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default AccountEdit
