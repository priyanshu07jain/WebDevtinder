import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utiles/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utiles/constant';

const Login = () => {
    // Toggle state
    const [isLoginForm, setIsLoginForm] = useState(true);

    const [emailId, SetemailId] = useState("");
    const [password, Setpassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, Seterror] = useState("");
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

   const handleAuth = async () => {
    try {
        Seterror(""); 
        const endpoint = isLoginForm ? "/login" : "/signup";
        const payload = isLoginForm 
            ? { emailId, password } 
            : { firstName, lastName, emailId, password };

        const res = await axios.post(BASE_URL + endpoint, payload, { withCredentials: true });
        
        // Save the user data to Redux
        dispatch(addUser(res.data));

        // Conditional Navigation
        if (isLoginForm) {
            navigate("/"); // Go to feed if logging in
        } else {
            navigate("/profile"); // Go to profile if signing up
        }
        
    } catch (err) {
        // Handle cases where err.response might be an object or a string
        const errorMsg = typeof err?.response?.data === 'string' 
            ? err.response.data 
            : err?.response?.data?.message || "Something went wrong";
        
        Seterror(errorMsg);
        console.error(err);
    }
}

    return (
        <div className='flex justify-center my-15'>
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl font-bold">
                        {isLoginForm ? "Login" : "Sign Up"}
                    </h2>
                    
                    <div>
                        {!isLoginForm && (
                            <>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input 
                                        type="text" 
                                        value={firstName} 
                                        className="input w-full" 
                                        onChange={(e) => setFirstName(e.target.value)} 
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input 
                                        type="text" 
                                        value={lastName} 
                                        className="input w-full" 
                                        onChange={(e) => setLastName(e.target.value)} 
                                    />
                                </fieldset>
                            </>
                        )}

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email Id</legend>
                            <input 
                                type="text" 
                                value={emailId} 
                                className="input w-full" 
                                onChange={(e) => SetemailId(e.target.value)} 
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input 
                                type="password" 
                                value={password} 
                                className="input w-full" 
                                onChange={(e) => Setpassword(e.target.value)} 
                            />
                        </fieldset>

                        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
                    </div>

                    <div className="card-actions justify-center mt-4 flex-col items-center">
                        <button className="btn btn-primary w-full" onClick={handleAuth}>
                            {isLoginForm ? "Login" : "Create Account"}
                        </button>
                        
                        <p className='mt-4 cursor-pointer hover:underline text-sm' 
                           onClick={() => {
                               setIsLoginForm(!isLoginForm);
                               Seterror(""); // Clear error when switching
                           }}>
                            {isLoginForm 
                                ? "New user? Sign up here" 
                                : "Already have an account? Login here"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;