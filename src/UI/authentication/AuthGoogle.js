import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import SecureComponent from "../../component/SecureComponent";
import { firebaseConfigInit } from "../../firebase-config";
import AuthGoogleContext from "./auth-google-context";




const AuthGoogle = (props) => {


    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState('');

    const firebaseConfig = firebaseConfigInit

    // Initialize Firebase

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);

    const provider = new GoogleAuthProvider(auth);
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });

    useEffect(() => {

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setIsLogin(true);

                setEmail(user.email)
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
        isLogin: isLogin
    }}>

        {
            isLogin ? <SecureComponent>

            </SecureComponent> : <p>Login with Google!!!</p>
        }

    </AuthGoogleContext.Provider>

}

export default AuthGoogle;