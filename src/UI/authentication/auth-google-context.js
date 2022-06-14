import React from "react"

const AuthGoogleContext = React.createContext(
    {
        user:null,
        logoutUser:null,
        isLogin:false,
        token:null,
        role:null
    }
);

export default AuthGoogleContext;
