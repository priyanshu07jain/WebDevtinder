import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utiles/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utiles/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed=useSelector(store=>store.feed);
  const dispatch=useDispatch();


  const getFeed=async()=>{
try{
  if (feed && feed.length > 0) return;
const res=await axios.get(BASE_URL+"/user/feed",{withCredentials:true});
dispatch(addFeed(res.data.data));

}
catch(err){
  console.error(err);
}
  }
  useEffect(()=>{
   getFeed();
  },[])
  if (!feed || feed.length === 0) return <p>No Users Found...</p>;
 return (
    <div className='flex justify-center my-10'>
      {/* Access feed[0] directly because feed is the array */}
      <UserCard key={feed[0]._id} user={feed[0]} />
    </div>
  );
};

export default Feed