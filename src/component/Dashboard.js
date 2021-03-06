import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
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
    const [totalWorking, setTotalworking] = useState(0);
    const [totalLeaves, setTotalLeaves] = useState(0);
    const [totalHoliday, setTotalHoliday] = useState(0);




    useEffect(() => {
        setCalanderView(<Calander configuration={configuration} setTotalworking={setTotalworking} setTotalLeaves={setTotalLeaves} setTotalHoliday={setTotalHoliday} />)
    }, [configuration])

    useEffect(() => {
        getConfigList((response) => {
            if (response == null) {
                navigation("configuration")
            } else {
                setConfiguration(response);


            }
        });
    }, [])





    return <>
        <Head title="Dashboard" />

        <br />
        <Row className="px-md-4">

            <Col className="btn btn-primary" md={2}><p>Total Working</p><p>{totalWorking}</p></Col>
            <Col className="btn btn-danger" md={2}><p>Total Leaves</p><p>{totalLeaves}</p></Col>
            <Col className="btn btn-warning" md={2}><p>Total Holiday</p><p>{totalHoliday}</p></Col>

        </Row>
        <br />
        {calanderView}



    </>
}

export default Dashboard