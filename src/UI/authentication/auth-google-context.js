import React from "react"

const AuthGoogleContext = React.createContext(
    {
        user:null,
        logoutUser:null,
        isLogin:false
    }
);

export default AuthGoogleContext;
