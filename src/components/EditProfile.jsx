import axios from "axios";
import { BASE_URL } from "../utiles/constant";
import { useState, useEffect } from "react";
import UserCard from './UserCard';
import { addUser } from '../utiles/userSlice';
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [showToast, setShowToast] = useState(false);
 
  const dispatch=useDispatch();

  // Keep state in sync with props when page reloads
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setPhotoUrl(user.photoUrl || "");
      
    }
  }, [user]);

  const handleSaveProfile = async () => {
    try {
      const res=await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
        Seterror(err?.response?.data||"something went wrong")
      console.error("Profile Update Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-md">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="avatar">
              <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-2xl">
                <img 
                  src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                  alt="Profile Preview"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 bg-primary p-2 rounded-full shadow-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl font-bold mt-4">Edit Profile</h1>
          <p className="text-sm text-gray-500">Update how you appear to others</p>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          
          {/* Section: Basic Info */}
          <section className="bg-base-200 p-6 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 px-1">Basic Information</h2>
            
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="First Name" 
                className="input input-ghost bg-base-300 rounded-2xl w-full font-medium" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Last Name" 
                className="input input-ghost bg-base-300 rounded-2xl w-full font-medium" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
               <input 
                type="text" 
                placeholder="Photo URL" 
                className="input input-ghost bg-base-300 rounded-2xl w-full text-xs" 
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <input 
                type="number" 
                placeholder="Age" 
                className="input input-ghost bg-base-300 rounded-2xl w-1/2 font-medium" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <select 
                className="select select-ghost bg-base-300 rounded-2xl w-1/2 font-medium"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </section>

          {/* Section: About Me */}
          <section className="bg-base-200 p-6 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 px-1">About Me</h2>
            <textarea 
              className="textarea textarea-ghost bg-base-300 rounded-2xl w-full h-32 leading-relaxed" 
              placeholder="Write something interesting about yourself..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </section>
         
          {/* Save Button */}
          <div className="flex justify-center pt-4 pb-20">
            <button 
              className="btn btn-primary btn-wide rounded-full text-lg font-bold shadow-xl hover:scale-105 transition-all"
              onClick={handleSaveProfile}
            >
              Done
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-lg rounded-2xl">
            <span className="font-bold text-white flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               Profile Saved!
            </span>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default EditProfile;