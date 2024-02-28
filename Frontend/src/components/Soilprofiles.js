import React, { useContext, useEffect, useRef, useState } from 'react'
import ProfileContext from '../Context/ProfileContext'
import Profileitem from './Profileitem'
import { useNavigate } from 'react-router-dom';
import "../css files/soilprofile.css"

function Soilprofiles() {
    const context = useContext(ProfileContext);
    const { profiles, getProfiles } = context;

    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getProfiles()
        }
        else {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [])

    const handleProfileClick = (profileId) => {
        console.log("Profile ID clicked:", profileId);
        // Implement what should happen when a profile is clicked
        // For example, navigate to a detail page or send the ID to an API
    };

    return (
        <>
            <div className='flex mx-9 my-3 max-w-full flex-wrap'>
                {profiles.map((profile) => {
                    return (
                        <div className="mx-3 my-3" key={profile._id}>
                            <Profileitem profile={profile} onProfileClick={handleProfileClick} />
                        </div>
                    )
                })}
            </div>
            <div className='container'>
                <button className='button bottom-right-button' onClick={() => { navigate("/newprofile") }}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg> Create
                    </span>
                </button>
            </div>
        </>
    )
}



export default Soilprofiles
