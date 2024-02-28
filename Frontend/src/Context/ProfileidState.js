import { useState } from "react";
import ProfileidContext from "./ProfileidContext";

const ProfileidState = (props) => {
    const [profileid, setprofileid] = useState("");
    return (
        <ProfileidContext.Provider value={{ profileid, setprofileid }}>
            {props.children}
        </ProfileidContext.Provider>
    )
}
export default ProfileidState;