import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utiles/constant';
import { useDispatch } from 'react-redux';
import { removeFromFeed } from '../utiles/feedSlice';

const UserCard = ({ user }) => {
  if (!user) return null;
  const dispatch=useDispatch();

  const { firstName, lastName, age, gender, skills, about, photoUrl,_id } = user;
  const handleSendRequests=async(status,_id)=>{
   const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},{withCredentials:true});
   dispatch(removeFromFeed(_id));
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-80 h-125 shadow-2xl relative overflow-hidden transition-transform hover:scale-[1.01]">
        {/* User Photo - Full Background */}
        <figure className="h-full w-full">
          <img
            src={photoUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
            alt={`${firstName}'s photo`}
            className="h-full w-full object-cover"
          />
        </figure>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>

        {/* User Info Overlay */}
        <div className="absolute bottom-20 left-0 p-5 text-white w-full">
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold">{firstName+" "+lastName}</h2>
            <span className="text-2xl font-light">{age}</span>
          </div>
          {gender && <p className="text-sm opacity-80 mb-2 capitalize">{gender}</p>}
          <p className="text-sm line-clamp-2 italic">"{about}"</p>
          
          {/* Skills Badges */}
          <div className="flex flex-wrap gap-1 mt-2">
            {skills?.slice(0, 3).map((skill, index) => (
              <div key={index} className="badge badge-outline badge-sm text-[10px] border-white/40 text-white">
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Tinder Action Buttons */}
        <div className="absolute bottom-4 w-full flex justify-evenly items-center px-4">
          <button className="btn btn-circle btn-lg border-2 border-error bg-transparent text-error hover:bg-error hover:text-white hover:border-error transition-all duration-300" onClick={()=>handleSendRequests("ignored",_id)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button className="btn btn-circle btn-lg border-2 border-success bg-transparent text-success hover:bg-success hover:text-white hover:border-success transition-all duration-300" onClick={()=>handleSendRequests("interested",_id)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;