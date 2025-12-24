import React from 'react'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile';

const Profile = () => {
  const userData=useSelector((store)=>store.user);

  return (
    <div>
{userData ? <EditProfile user={userData?.data} /> : <p>Loading...</p>}</div>
  )
}

export default Profile