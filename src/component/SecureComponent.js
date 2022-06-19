import { Route, Routes } from "react-router-dom";
import ConfigurationComponent from "./configuration/ConfigurationComponent";
import Dashboard from "./Dashboard";
import Holiday from "./holiday/Holiday";


const SecureComponent = (props) => {

    return <>

        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="configuration" element={<ConfigurationComponent />} />
            <Route path="holiday" element={<Holiday/>}/>
        </Routes>

        

    </>

}

export default SecureComponent;