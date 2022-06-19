import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import SecureComponent from "../../component/SecureComponent";
import { firebaseConfigInit } from "../../firebase-config";
import useHttp from "../http/useHttp";
import AuthGoogleContext from "./auth-google-context";




const AuthGoogle = (props) => {

    const [configuration, setConfiguration] =  useState(null)

    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [token, setToken] = useState('');
    const [localId, setLocalId] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [authToken, setAuthToken] = useState('');
    const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

    const firebaseConfig = firebaseConfigInit

    // Initialize Firebase

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);

    const handleSetConfig = (_response) =>{
        setConfiguration(_response)
    }

    const provider = new GoogleAuthProvider(auth);
    //provider.addScope('https://www.googleapis.com/auth/firebase.database');

    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });


    useEffect(() => {



        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                setToken(token)
                // The signed-in user info.
                const user = result.user;
                const localId = user.reloadUserInfo.localId

                const _userObj = { role: 'user', ...user.reloadUserInfo }

                sendTaskRequest(
                    {
                        url: "/users/" + localId + "/user.json?access_token=" + token + "&auth=" + auth.currentUser.accessToken,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    },
                    (response) => {
                        console.info(response);
                        if (response == null) {
                            sendTaskRequest(
                                {
                                    url: '/users/' + localId + "/user.json?access_token=" + token + "&auth=" + auth.currentUser.accessToken,
                                    
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: _userObj,
                                },
                                (response) => {
                                    console.info(response);
                                    setIsLogin(true);
                                    setRole('user')
                                    setEmail(user.email)
                                    setAccessToken(token)
                                    setLocalId(localId)
                                    setAuthToken(auth.currentUser.accessToken)
                                }
                            );
                        } else {
                            setIsLogin(true);
                            setEmail(user.email)
                            setToken(token)
                            setRole(response.role)
                            setAccessToken(token)
                            setLocalId(localId)
                            setAuthToken(auth.currentUser.accessToken)
                        }

                    }
                );


                /**/



                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                setIsLogin(false);
                // ...
            });

    }, [])




    const logoutHandler = () => {
        setIsLogin(false);
        setEmail('');
    }

    return <AuthGoogleContext.Provider value={{
        user: email,
        logoutUser: logoutHandler,
        isLogin: isLogin,
        token: token,
        role: role,
        localId: localId,
        accessToken: accessToken,
        authToken: authToken,
        configuration:configuration,
        setConfiguration:handleSetConfig
    }}>

        {
            isLogin ? <SecureComponent>

            </SecureComponent> : <p>Login with Google!!!</p>
        }

    </AuthGoogleContext.Provider>

}

export default AuthGoogle;