import Label from "./Label";
import Select from "./Select";

const FormSelect = ({label,...props}) => {



    return <>

        <Label className="form-label">{label}</Label>
        <Select className="form-select" {...props}>
            {props.children}

        </Select>

    </>
}

export default FormSelect;