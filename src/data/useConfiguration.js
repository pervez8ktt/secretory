import { useCallback } from "react";
import useHttp from "../UI/http/useHttp";

const useConfiguration = () => {

    const { isLoading, localId ,sendRequest: sendTaskRequest } = useHttp();

    const getList = useCallback((_result) => {

        sendTaskRequest(
            {
                url: '/configurations/' + localId + "/configuration.json",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                _result(response)
                
            }
        );

    },[]);

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