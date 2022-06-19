import { useCallback } from "react";
import useHttp from "../UI/http/useHttp";

const useLeave = () => {

    const { isLoading, localId ,sendRequest: sendTaskRequest } = useHttp();

    const getListByYearAndMonth = useCallback(({year,month},_result) => {

        sendTaskRequest(
            {
                url: '/leaves/' + localId + "/leaves/"+year+"/"+month+".json",
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
        date,
        title,
        month,
        year,
        leaveType
    }, _result) =>{

        const _obj = {
            title,
            leaveType
        }

        sendTaskRequest(
            {
                url: '/leaves/' + localId + "/leaves/"+year+"/"+month+"/"+date+".json",
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
        getListByYearAndMonth
    }

}

export default useLeave;