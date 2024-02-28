import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Newprofile = () => {

    const [information, setinformation] = useState({ name: "", nitrogen: "", potasium: "", phosphorous: "", tempreature: "", humidity: "", ph: "", rainfall: "", moisture: "", soiltype: "" });
    let navigate = useNavigate();
    const onChange = (e) => {
        setinformation({ ...information, [e.target.name]: e.target.value })
    }
    const host = "http://localhost:5000"
    const addnote = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`${host}/api/soilprofile/addsoilprofile`, { // Ensure endpoint matches backend
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify(information), // Ensure field names match backend
            });
            const json = await response.json();
            console.log(json);
            navigate("/soilprofile")
        } catch (error) {
            console.error(error);
            // Handle errors if any occurred during the API call
        }
    };


    return (
        <div className="bg-[#C1DABB] w-full h-screen flex justify-center">
            <section className="section_form">
                <form id="consultation-form" className="feed-form" >
                    <input required="" name="name" placeholder="Location Name" onChange={onChange} type="text" />
                    <input required="" name="nitrogen" placeholder="Nitrogen" onChange={onChange} type="text" />
                    <input name="potasium" required="" placeholder="P" onChange={onChange} type="text" />
                    <input name="phosphorous" required="" placeholder="K" onChange={onChange} type="text" />
                    <input name="tempreature" required="" placeholder="Tempreature" onChange={onChange} type="text" />
                    <input name="humidity" required="" placeholder="Humidity" onChange={onChange} type="text" />
                    <input name="ph" required="" placeholder="pH" onChange={onChange} type="text" />
                    <input name="rainfall" required="" placeholder="Rainfall" onChange={onChange} type="text" />
                    <input name="moisture" required="" placeholder="Moisture" onChange={onChange} type="text" />
                    <input name="soiltype" required="" placeholder="Soil Type" onChange={onChange} type="text" />

                    <button className="button_submit" onClick={addnote}>Submit</button>
                </form>
            </section>
        </div>
    )
}

export default Newprofile
