import { useState } from "react";
import ProfileContext from "./ProfileContext";

const Profilestate = (props) => {
    const host = "http://localhost:5000"
    const profileInitial = []
    const [profiles, setprofile] = useState(profileInitial);

    const getProfiles = async () => {
        //API call
        const response = await fetch(`${host}/api/soilprofile/soilprofiles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setprofile(json)
    }
    return (
        <ProfileContext.Provider value={{ profiles, getProfiles }}>
            {props.children}
        </ProfileContext.Provider>
    )
}
export default Profilestate;