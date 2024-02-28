import React, { useState, useContext } from 'react'
import './myStyles.css'
import TogoContext from '../Context/TogoContext';
import { useNavigate } from 'react-router-dom';
import Farminganimation from './Farminganimation'
import Fruitbasketanimation from './fruitbasketanimation'
import Logincontext from '../Context/Logincontext';
function Home() {
    let navigate = useNavigate();
    const logincontext = useContext(Logincontext)
    const togocontext = useContext(TogoContext)
    const [homewheretogo, sethomewheretogo] = useState("");
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.Success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            alert("Logged in Successfully");
            logincontext.setlogincheck(true);
            navigate(homewheretogo);
            //console.log(togocontext.wheretogo);
        }
        else {
            alert("Invalid Credentials");
        }
    }
    const onlChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    const handleSmartFarm = () => {

        if (logincontext.logincheck) {
            navigate('/soilprofile')
            togocontext.setwheretogo("/smartfarm")
        }

        else {
            sethomewheretogo("/soilprofile")
            togocontext.setwheretogo("/smartfarm")
            setShowLogin(!showLogin);
            setIsBlurred(!isBlurred);
        }

    }
    const handleFertilizerPredict = () => {
        if (logincontext.logincheck) {
            navigate('/soilprofile')
            togocontext.setwheretogo('/smartfertilizer')
        }

        else {
            sethomewheretogo("/soilprofile")
            togocontext.setwheretogo('/smartfertilizer')
            setShowLogin(!showLogin);
            setIsBlurred(!isBlurred);
        }

    }
    const weatherpredict = () => {
        if (logincontext.logincheck)
            navigate('/plantdiseasepredict')
        else {
            togocontext.setwheretogo('/plantdiseasepredict')
            setShowLogin(!showLogin);
            setIsBlurred(!isBlurred);
        }

    }
    const navigateSignup = () => {
        navigate("/Signup")
    }

    const removeblur = () => {
        if (isBlurred) {
            setIsBlurred(!isBlurred)
        }
    };
    const [showLogin, setShowLogin] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);



    const svgCode = `
    <svg version="1.1" width="20" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
      <path style="fill:#FBBB00;" d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
        c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
        C103.821,274.792,107.225,292.797,113.47,309.408z"></path>
      <!-- Add other paths as needed -->
    </svg>
  `;

    // Convert the SVG code to a data URI
    const svgDataUri = `data:image/svg+xml;base64,${btoa(svgCode)}`;

    const newSvgCode = `
  <svg version="1.1" height="20" width="20" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22.773 22.773" style="enable-background:new 0 0 22.773 22.773;" xml:space="preserve">
    <g>
      <g>
        <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"></path>
        <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"></path>
      </g>
    </g>
  </svg>
`;
    const newSvgDataUri = `data:image/svg+xml;base64,${btoa(newSvgCode)}`;


    return (
        <div>
            <div className="green-stripe-container py-56 pl-7 flex justify-between text-center">
                <div className='flex flex-col w-1/2'>
                    <h1 className='text-7xl block merryweatherfont'>SmartFarmz</h1>
                    <p className='block text-xl my-3 ubuntufont'> where innovative technology meets sustainable agriculture.</p>
                </div>
                <div className="farming-animation-wrapper flex w-1/2">
                    <Farminganimation />
                </div>
            </div>

            <div className="white-stripe-container flex justify-between">
                <div className="fruitbasketanimation-wrapper">
                    <Fruitbasketanimation />
                </div>
                <div className="flex flex-col w-1/2 pr-9 justify-end">
                    <h1 className="text-5xl block merryweatherfont">We are here to help</h1>
                    <p className="block my-3 text-xl ubuntufont">
                        A website to find agriculture information,products and evaluation.
                    </p>
                </div>
            </div>

            <div className={`pepermint-stripe-container py-48 flex flex-col justify-center items-center `} >

                <div className={`absolute ${isBlurred ? '' : 'hidden'} z-10`}>
                    <form className="form">
                        <div className="flex-column">
                            <label>Email </label></div>
                        <div className="inputForm">
                            <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
                            <input type="text" className="input" name="email" onChange={onlChange} placeholder="Enter your Email" />
                        </div>

                        <div className="flex-column">
                            <label>Password </label></div>
                        <div className="inputForm">
                            <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                            <input type="password" className="input" name="password" onChange={onlChange} placeholder="Enter your Password" />
                            <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                        </div>

                        <div className="flex-row">
                            <div>
                                <input type="checkbox" />
                                <label>Remember me </label>
                            </div>
                            <span className="span">Forgot password?</span>
                        </div>
                        <button className="button-submit" onClick={handleLoginSubmit}>Sign In</button>
                        <p className="p">Don't have an account? <span className="span" onClick={navigateSignup}>Sign Up</span>

                        </p><p className="p line">Or With</p>

                        <div className="flex-row">
                            <button className="btn google">
                                <img src={svgDataUri} alt="My SVG" />

                                Google

                            </button><button className="btn apple">
                                <img src={newSvgDataUri} alt="My New SVG" />

                                Apple

                            </button></div></form>
                </div>

                <div className={`${isBlurred ? 'blurred' : ''}  `} onClick={removeblur} >
                    <div className={` flex flex-col justify-center items-center`}>


                        <div className="flex flex-col w-1/2 pr-9 text-center">
                            <h1 className="text-5xl block merryweatherfont">Services</h1>
                            <p className="block text-xl my-5 ubuntufont">
                                Explore our Services
                            </p>
                        </div>
                        <div>
                            <div className='py-10 flex justify-center '>
                                <div className="card flex mx-6" onClick={handleSmartFarm}>
                                    <img src="https://img.freepik.com/free-vector/isometric-smart-farm-flowchart_1284-59308.jpg?w=740&t=st=1698414936~exp=1698415536~hmac=d9518ad01b017bd9c43794c7b7bf53104b568ea4ee720d8f70131cdf8958ea4a" alt="" />
                                    <div className="card__content">
                                        <p className="card__title">Crop Prediction</p>
                                        <p className="card__description">Know what crop is best suited for your soil. Growing a farm is not easy, but we can sure help. Here you can know what crop will best suit your soil, trying to grow the wrong plants in the wrong soil will lead to huge losses, let us help you to figure out what crops will thrive in your land.</p>
                                    </div>
                                </div>

                                <div className="card flex mx-6" onClick={handleFertilizerPredict}>
                                    <img src="https://organicagproducts.com/wp-content/uploads/2020/11/Benefits-Of-Choosing-Organic-Fertilizers.jpg" alt="" />
                                    <div className="card__content">
                                        <p className="card__title">Fertilizer Prediction</p>
                                        <p className="card__description">Doesn’t matter how good your soil is, it can always be better. Let us show you the best fertilisers to balance your soil on perfect equilibrium of nourishment. Whatever, plant you decide to grow, we will help you grow it well and keep your land fertile.</p>
                                    </div>
                                </div>

                                <div className="card flex mx-6" onClick={weatherpredict}>
                                    <img src="https://static.vecteezy.com/system/resources/previews/002/228/405/non_2x/the-weather-forecaster-is-forecasting-the-weather-hand-drawn-style-design-illustrations-vector.jpg" alt="" />
                                    <div className="card__content">
                                        <p className="card__title">Weather Prediction</p>
                                        <p className="card__description">Available Soon</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="white-stripe-container py-52 justify-center">

                <div className="flex flex-col w-1/2 pr-9 justify-end">
                    <h1 className="text-4xl block merryweatherfont">Thank you for taking the time to check out our Services</h1>
                    <p className="block ubuntufont">
                        Hope we were able to help.
                    </p>
                </div>
            </div>
            <div className="color4-stripe-container py-52">
                <div className="flex flex-col w-1/2 pr-9 justify-end">
                    <h1 className="text-4xl block merryweatherfont">Credits</h1>
                    <p className="block ubuntufont">
                        Sahil Patel Sourish Sushant Denish
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home
