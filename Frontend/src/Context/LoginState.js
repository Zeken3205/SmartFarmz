import React, { useState } from "react";
import Logincontext from "./Logincontext";

function LoginState(props) { // Define 'props' as a parameter
    const [logincheck, setlogincheck] = useState(false);
    return (
        <Logincontext.Provider value={{ logincheck, setlogincheck }}>
            {props.children}
        </Logincontext.Provider>
    );
}

export default LoginState;
