import React, { useContext } from 'react';
import ProfileidContext from '../Context/ProfileidContext';
import TogoContext from '../Context/TogoContext';
import "../css files/profilecard.css"
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
const Profileitem = ({ profile, onProfileClick }) => {
    if (!profile) {
        // Optionally handle the scenario where profile is not available
        console.log("Profile data not available")
    }
    const togocontext = useContext(TogoContext);
    const profileidcontext = useContext(ProfileidContext)
    let navigate = useNavigate();
    const handleClick = () => {
        onProfileClick(profile._id); // Call the passed function with the profile's _id
        profileidcontext.setprofileid(profile._id)

        navigate(togocontext.wheretogo)
    }

    const deleteprofile = async (e) => {
        onProfileClick(profile._id); // Call the passed function with the profile's _id
        profileidcontext.setprofileid(profile._id)

    }

    //const context = useContext(ProfileContext);
    return (

        <div className="card" onClick={handleClick}>
            <div>
                <div onClick={deleteprofile}>
                    <button className="btn cardBtn">
                        <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
                            <path d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                        </svg>
                    </button>

                </div>
                <a className="card1" >
                    <p>{profile.name}</p>
                    <p className="small">Card description with lots of great facts and interesting details.</p>
                    <div className="go-corner">
                        <div className="go-arrow">
                            →
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Profileitem