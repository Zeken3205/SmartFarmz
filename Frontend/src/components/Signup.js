import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Logincontext from '../Context/Logincontext';
function Signup() {
    const logincontext = useContext(Logincontext)
    const [signupcredentials, setSignupCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!onCheckpassword()) {
            return;
        }
        console.log(signupcredentials)
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: signupcredentials.name, email: signupcredentials.email, password: signupcredentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            logincontext.setlogincheck(true);
            navigate("/");
        }
        else {
            alert("Invalid Credentials")
        }
    }
    const onChange = (e) => {
        setSignupCredentials({ ...signupcredentials, [e.target.name]: e.target.value })
    }
    const onCheckpassword = () => {
        if (signupcredentials.password !== signupcredentials.confirmPassword) {
            alert("Password does not match with Retyped Password");
            return false;
        }
        return true;
    }


    return (
        <div className="bg-[#C1DABB] flex flex-col items-center justify-center h-screen">
            <div className='absolute z-10'>
                <form>
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Create an account
                                </p>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Your username
                                    </label>
                                    <input placeholder="JohnDoe" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" name="name" onChange={onChange} type="text" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Email
                                    </label>
                                    <input placeholder="abc@gmail.com" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" name="email" onChange={onChange} type="text" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" name="password" onChange={onChange} type="password" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Confirm password
                                    </label>
                                    <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" name="confirmPassword" onChange={onChange} type="password" />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" type="checkbox" aria-describedby="terms" id="terms" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="font-light text-gray-500 text-gray-300">
                                            I accept the
                                            <Link to="/terms" className="font-medium text-primary-600 hover:underline text-primary-500">
                                                Terms and Conditions
                                            </Link>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="font-light text-gray-500 text-gray-300">
                                            <Link to="/login" className="font-medium text-primary-600 hover:underline text-primary-500">
                                                Already Have an account?
                                            </Link>
                                        </label>
                                    </div>
                                </div>

                                <button className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" onClick={handleSubmit} type="submit">
                                    Create an account
                                </button>

                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Signup
