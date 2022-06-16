import { useCallback } from "react";
import useHttp from "../UI/http/useHttp";

const useDeduction = () => {

    const { isLoading, localId ,sendRequest: sendTaskRequest } = useHttp();

    const getList = useCallback((_result) => {

        sendTaskRequest(
            {
                url: '/deductions/' + localId + "/deductions.json",
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
        lastIndex,
        title,
        dValue,
        dType
    }, _result) =>{

        const _obj = {
            title,
            dValue,
            dType
        }

        sendTaskRequest(
            {
                url: '/deductions/' + localId + "/deductions/"+lastIndex+".json",
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

export default useDeduction;