import React from "react"

const AuthGoogleContext = React.createContext(
    {
        user:null,
        logoutUser:null,
        isLogin:false,
        token:null,
        role:null,
        localId:null,
        accessToken:null,
        authToken:null,
        configuration:null,
        setConfiguration:null
    }
);

export default AuthGoogleContext;
