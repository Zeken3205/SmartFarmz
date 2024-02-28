import React, { useState, useContext, useEffect } from 'react'
import "./myStyles.css"
import ProfileidContext from '../Context/ProfileidContext';
const SmartFertilizer = () => {
    const profileidcontext = useContext(ProfileidContext)
    const [informationfert, setinformationfert] = useState({ nitrogen: "", potasium: "", phosphorous: "", tempreature: "", humidity: "", moisture: "", soiltype: "", croptype: "" });
    const [cropTypes, setCropTypes] = useState([
        "Maize",
        "Sugarcane",
        "Cotton",
        "Tobacco",
        "Paddy",
        "Barley",
        "Wheat",
        "Millets",
        "Oil seeds",
        "Pulses",
        "Ground Nuts",

    ]);

    // Function to handle crop type selection
    const handleCropTypeChange = (e) => {
        setinformationfert({ ...informationfert, croptype: e.target.value });
    };

    const onChange = (e) => {
        setinformationfert({ ...informationfert, [e.target.name]: e.target.value })
    }

    const id = profileidcontext.profileid;
    const host = "http://localhost:5000"
    const [foundprofile, setfoundprofile] = useState("");
    const fetchProfile = async () => {
        try {
            const response = await fetch(`${host}/api/soilprofile/soilprofiles`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const profiles = await response.json();

            // Do something with the JSON data if needed
            const foundProfile = profiles.find(profile => profile._id === id);

            if (foundProfile) {
                // Do something with the found profile
                setfoundprofile(foundProfile);
            } else {
                console.log(`Profile with ID ${id} not found.`);
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Fetch the profile data only when the component mounts
        fetchProfile();
    }, []);

    useEffect(() => {
        if (foundprofile) {
            setinformationfert({
                nitrogen: foundprofile.nitrogen ? parseFloat(foundprofile.nitrogen) : "",
                potasium: foundprofile.potasium ? parseFloat(foundprofile.potasium) : "",
                phosphorous: foundprofile.phosphorous ? parseFloat(foundprofile.phosphorous) : "",
                tempreature: foundprofile.tempreature ? parseFloat(foundprofile.tempreature) : "",
                humidity: foundprofile.humidity ? parseFloat(foundprofile.humidity) : "",
                moisture: foundprofile.moisture ? parseFloat(foundprofile.moisture) : "",
                rainfall: foundprofile.rainfall ? parseFloat(foundprofile.rainfall) : "",

                soiltype: foundprofile.soiltype ? foundprofile.soiltype : "",
            });
        }
    }, [foundprofile]);

    console.log(informationfert)


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:5000/fertilizer_predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ N: informationfert.nitrogen, P: informationfert.phosphorous, K: informationfert.potasium, tempreature: informationfert.tempreature, humidity: informationfert.humidity, moisture: informationfert.moisture, soiltype: informationfert.soiltype, croptype: informationfert.croptype }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            const result = json.result;
            alert(result)
            console.log(result);
        }
        else {
            alert("Something went wrong")
        }
    }

    return (
        <div className="bg-[#C1DABB] w-full h-screen flex justify-center">
            <section className="section_form">
                <form id="consultation-form" className="feed-form" >
                    <input required="" name="nitrogen" placeholder="Nitrogen" onChange={onChange} value={informationfert.nitrogen} type="text" />
                    <input name="potasium" required="" placeholder="K" onChange={onChange} value={informationfert.potasium} type="text" />
                    <input name="phosphorous" required="" placeholder="K" onChange={onChange} value={informationfert.phosphorous} type="text" />
                    <input name="tempreature" required="" placeholder="Tempreature" onChange={onChange} value={informationfert.tempreature} type="text" />
                    <input name="humidity" required="" placeholder="Humidity" onChange={onChange} value={informationfert.humidity} type="text" />
                    <input name="moisture" required="" placeholder="Moisture" onChange={onChange} value={informationfert.moisture} type="text" />
                    <input name="soiltype" required="" placeholder="Soil Type" onChange={onChange} value={informationfert.soiltype} type="text" />
                    {/* Crop type dropdown */}
                    <select
                        name="croptype"
                        required=""
                        onChange={handleCropTypeChange}
                        value={informationfert.croptype}
                    >
                        <option value="">Select Crop Type</option>
                        {cropTypes.map((crop, index) => (
                            <option key={index} value={crop}>
                                {crop}
                            </option>
                        ))}
                    </select>

                    <button className="button_submit" onClick={handleLoginSubmit}>Submit</button>
                </form>
            </section>
        </div>
    )
}

export default SmartFertilizer
