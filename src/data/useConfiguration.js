import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthGoogleContext from "../UI/authentication/auth-google-context";
import useHttp from "../UI/http/useHttp";

const useConfiguration = () => {

    const authGoogleContext = useContext(AuthGoogleContext);

    const navigate =  useNavigate()

    const configuration = authGoogleContext.configuration;
    const setConfiguration = authGoogleContext.setConfiguration;
    const { isLoading, localId ,sendRequest: sendTaskRequest } = useHttp();

    const getList = (_result) => {

        if(configuration!=null){
            _result(configuration)
        }else{
            sendTaskRequest(
                {
                    url: '/configurations/' + localId + "/configuration.json",
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                },
                (response) => {
                    if(response==null){
                        navigate("/configuration")
                        return;
                    }
                    console.info(response);
                    setConfiguration(response);
                    _result(response)
                    
                }
            );
        }

    };

    const set = useCallback(({
        salary,
        clPerMonth,
        attandanceReqForCl,
        saturdayOff
    }, _result) =>{

        const _obj = {
            salary,
            clPerMonth,
            attandanceReqForCl,
            saturdayOff
        }

        sendTaskRequest(
            {
                url: '/configurations/' + localId + "/configuration.json",
                method: 'PUT',
                body: _obj,
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                setConfiguration(response);
                _result(response)
                
            }
        );

    },[]);


    return {
        set,
        isLoading,
        getList
    }

}

export default useConfiguration