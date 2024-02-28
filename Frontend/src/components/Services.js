import React, { useState, useContext } from 'react'
import './myStyles.css'
import TogoContext from '../Context/TogoContext';
import { useNavigate } from 'react-router-dom';
import Logincontext from '../Context/Logincontext';
const Services = () => {
    let navigate = useNavigate();
    const logincontext = useContext(Logincontext)
    const togocontext = useContext(TogoContext)
    const handleSmartFarm = () => {

        if (logincontext.logincheck) {
            navigate('/soilprofile')
            togocontext.setwheretogo("/smartfarm")
        }

        else {
            navigate("/login")
            togocontext.setwheretogo("/smartfarm")
        }

    }

    const handleFertilizerPredict = () => {
        if (logincontext.logincheck) {
            navigate('/soilprofile')
            togocontext.setwheretogo('/smartfertilizer')
        }

        else {
            navigate("/login")
            togocontext.setwheretogo('/smartfertilizer')
        }

    }

    const weatherpredict = () => {
        if (logincontext.logincheck)
            navigate('/plantdiseasepredict')
        else {
            togocontext.setwheretogo('/plantdiseasepredict')
        }

    }


    return (
        <div>
            <div className={`FFC47E py-48 flex-none flex flex-col justify-end`}>

                <div className='py-10 flex '>
                    <div className='flex'>
                        <div className="card flex mx-6" onClick={handleSmartFarm}>
                            <img src="https://img.freepik.com/free-vector/isometric-smart-farm-flowchart_1284-59308.jpg?w=740&t=st=1698414936~exp=1698415536~hmac=d9518ad01b017bd9c43794c7b7bf53104b568ea4ee720d8f70131cdf8958ea4a" alt="" />
                            <div className="card__content">
                                <p className="card__title">Crop Prediction</p>
                                <p className="card__description">Know what crop is best suited for your soil. Growing a farm is not easy, but we can sure help. Here you can know what crop will best suit your soil, trying to grow the wrong plants in the wrong soil will lead to huge losses, let us help you to figure out what crops will thrive in your land.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center text-center flex-grow">
                        <h1 className="text-4xl block merryweatherfont">Know your Soil.</h1>
                        <p className="block mx-auto max-w-lg lg:max-w-2xl xl:max-w-3xl ubuntufont">
                            Understanding your soil type is crucial for successful farming. Clayey soil is ideal for crops like wheat and barley, thriving in its moisture-retaining properties. Sandy soil suits root vegetables such as carrots and potatoes due to its excellent drainage. Loamy soil, a balanced mix, is versatile for crops like corn, tomatoes, and beans. Assessing soil pH is essential; alkaline soils benefit crops like broccoli and cauliflower, while acidic soils favor blueberries and strawberries. Fertilization is key; nitrogen-rich soils enhance leafy greens like lettuce. Tailoring crops to your soil composition ensures optimal yields, minimizing losses and promoting a thriving, sustainable farm.
                        </p>
                    </div>

                </div>

            </div>




            <div className={`FFF78A py-48 flex flex-col justify-end `} >
                <div className='flex'>
                    <div className="flex flex-col justify-center text-center flex-grow">
                        <h1 className="text-4xl block merryweatherfont">Necessarily fertilisers.</h1>
                        <p className="block mx-auto max-w-lg lg:max-w-2xl xl:max-w-3xl ubuntufont">
                            No matter how fertile your soil, continuous improvement is essential. Discover the best fertilizers to achieve the perfect balance of nourishment for your crops. Tailored to suit various plant needs, these fertilizers enhance soil fertility, ensuring robust growth and optimal yield. Nitrogen-rich fertilizers promote lush foliage, while phosphorus boosts root development and flowering. Potassium aids overall plant health and disease resistance. Micronutrients like iron and zinc are vital for specific crops. Regular soil testing guides precise fertilizer application, preventing overuse and environmental impact. Stay tuned for our upcoming release, where we'll provide comprehensive insights on the most effective fertilizers for your specific soil and crop requirements.
                        </p>
                    </div>

                    <div className="card flex mx-6" onClick={handleFertilizerPredict}>
                        <img src="https://organicagproducts.com/wp-content/uploads/2020/11/Benefits-Of-Choosing-Organic-Fertilizers.jpg" alt="" />
                        <div className="card__content">
                            <p className="card__title">Fertilizer Prediction</p>
                            <p className="card__description">Doesn’t matter how good your soil is, it can always be better. Let us show you the best fertilisers to balance your soil on perfect equilibrium of nourishment. Whatever, plant you decide to grow, we will help you grow it well and keep your land fertile.</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className={`FFE382 py-48 flex-none flex flex-col justify-end`}>

                <div className='py-10 flex '>
                    <div className='flex'>
                        <div className="card flex mx-6" onClick={weatherpredict}>
                            <img src="https://static.vecteezy.com/system/resources/previews/002/228/405/non_2x/the-weather-forecaster-is-forecasting-the-weather-hand-drawn-style-design-illustrations-vector.jpg" alt="" />
                            <div className="card__content">
                                <p className="card__title">Weather Prediction</p>
                                <p className="card__description">Available Soon</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center text-center flex-grow">
                        <h1 className="text-4xl block merryweatherfont">Weather Prediction</h1>
                        <p className="block mx-auto max-w-xs lg:max-w-md xl:max-w-lg ubuntufont">
                            Coming soon!
                        </p>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Services
