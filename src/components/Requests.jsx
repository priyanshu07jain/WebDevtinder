import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utiles/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequests } from '../utiles/requestsSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const getRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });
           
            // Keeping your working data path
            dispatch(addRequests(res.data.connectionRequests));
            
        } catch (err) {
            console.error(err);
        }
    };
    const handleRequest=async(status,_id)=>{
        try{
          await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
          dispatch(removeRequests(_id));
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getRequests();
    }, []);

    // 1. Loading State
    if (!requests) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // 2. Empty State
    if (requests.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[40vh]">
                <h1 className="text-xl font-semibold text-gray-500">No pending connection requests.</h1>
            </div>
        );
    }

    // 3. Data View
    return (
        <div className="max-w-2xl mx-auto my-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-white text-center">Connection Requests</h1>
            
            <div className="space-y-4">
                {requests.map((request) => {
                    const { _id, fromUserId } = request;
                    const { firstName, lastName, photoUrl, about, age, gender } = fromUserId;

                    return (
                        <div key={_id} className="card card-side bg-base-300 shadow-xl border border-gray-700 hover:border-primary transition-all p-4">
                            <figure className="w-20 h-20 md:w-32 md:h-32 shrink-0">
                                <img
                                    className="rounded-full object-cover w-full h-full"
                                    src={photoUrl || "https://via.placeholder.com/150"}
                                    alt={firstName}
                                />
                            </figure>
                            
                            <div className="card-body py-2 px-4">
                                <h2 className="card-title text-2xl font-semibold">
                                    {firstName + " " + (lastName || "")}
                                </h2>
                                <p className="text-sm italic text-gray-400">
                                    {age && `${age} yrs, `} {gender}
                                </p>
                                <p className="line-clamp-2 text-gray-300">{about}</p>
                                
                                <div className="card-actions justify-end mt-2">
                                    <button className="btn btn-sm btn-ghost hover:bg-red-500/20 text-red-400" onClick={()=>handleRequest("rejected",_id)} >
                                        Reject
                                    </button>
                                    <button className="btn btn-sm btn-primary px-6" onClick={()=>handleRequest("accepeted",_id)}>
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Requests;