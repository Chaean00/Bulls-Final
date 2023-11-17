import LoginContext from "./LoginContext";
import {useState} from "react";
const LoginProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </LoginContext.Provider>
    )

}

export default LoginProvider