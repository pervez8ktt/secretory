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
        authToken:null
    }
);

export default AuthGoogleContext;
