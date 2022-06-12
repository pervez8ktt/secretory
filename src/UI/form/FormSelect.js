import Label from "./Label";
import Select from "./Select";

const FormSelect = (props) => {



    return <>

        <Label className="form-label">{props.label}</Label>
        <Select className="form-select" {...props}>
            {props.children}

        </Select>

    </>
}

export default FormSelect;