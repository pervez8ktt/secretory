import { Route, Routes } from "react-router-dom";
import ConfigurationComponent from "./configuration/ConfigurationComponent";
import Dashboard from "./Dashboard";


const SecureComponent = (props) => {

    return <>

        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="configuration" element={<ConfigurationComponent />} />
        </Routes>

        

    </>

}

export default SecureComponent;