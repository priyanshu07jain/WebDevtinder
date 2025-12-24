import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utiles/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utiles/connectionsSlice';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections);

    const getConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            // Note: Make sure the data structure matches your Redux slice expectations
            dispatch(addConnections(res.data.data || res.data));
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getConnections();
    }, [])

    if (!connections) return null;
    if (connections?.connections.length === 0) return <p className="text-center my-10 text-gray-500">No connections found</p>

    return (
        <div className="flex flex-col items-center my-10 px-4">
            <div className="w-full max-w-lg bg-base-300 rounded-xl shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6 border-b border-gray-600 pb-2">Connections</h1>
                
                <div className="flex flex-col gap-4">
                    {connections?.connections.map((user) => (
                        <div 
                            key={user._id} 
                            className="flex items-center p-3 bg-base-100 rounded-lg border border-gray-700 hover:bg-base-200 transition-colors"
                        >
                            <img 
                                src={user.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                                alt="profile" 
                                className="h-16 w-16 rounded-full object-cover shadow-sm" 
                            />
                            <div className="ml-5">
                                <h2 className="text-lg font-semibold tracking-tight">
                                    {user.firstName} {user.lastName}
                                </h2>
                                {user.age&&user.gender&&<h4 className=' text-sm tracking-tight'>{user.age+" ,"+user.gender}</h4>}
                                <h4 className=' text-sm tracking-tight'>{user.about}</h4>
                               
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Connections