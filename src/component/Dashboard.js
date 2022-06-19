import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useConfiguration from "../data/useConfiguration"
import Head from "./head/Head"

const Dashboard = (props) => {

    const {getList: getConfigList}= useConfiguration();

    const navigation = useNavigate();

    useEffect(()=>{
        getConfigList((response)=>{
            if(response==null){
                navigation("configuration")
            }
        });
    })

    return <>
        <Head title="Dashboard" />

    </>
}

export default Dashboard