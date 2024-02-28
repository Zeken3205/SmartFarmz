import { useState } from "react";
import TogoContext from "./TogoContext";

const TogoState = (props) => {
    const [wheretogo, setwheretogo] = useState("");
    return (
        <TogoContext.Provider value={{ wheretogo, setwheretogo }}>
            {props.children}
        </TogoContext.Provider>
    )
}
export default TogoState;