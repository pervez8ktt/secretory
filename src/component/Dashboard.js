import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useConfiguration from "../data/useConfiguration"
import useHoliday from "../data/useHoliday";
import FormInput from "../UI/form/FormInput";
import FormSelect from "../UI/form/FormSelect";
import Calander from "./calander/Calander";
import Head from "./head/Head"
import Holiday from "./holiday/Holiday";


const Dashboard = (props) => {

    const { getList: getConfigList } = useConfiguration();

    const [calanderView, setCalanderView] = useState(<p>Please wait!!!</p>);

    const navigation = useNavigate();

    const [configuration, setConfiguration] = useState();

    

    useEffect(()=>{
        setCalanderView(<Calander configuration={configuration} />)
    }, [configuration])

    useEffect(() => {
        getConfigList((response) => {
            if (response == null) {
                navigation("configuration")
            }else{
                setConfiguration(response);
                
                
            }
        });
    },[])

    
    
    

    return <>
        <Head title="Dashboard" />
        

        {calanderView}
        

    </>
}

export default Dashboard