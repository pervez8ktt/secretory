import Input from "./Input";
import Label from "./Label";

const FormInput = (props) => {


    return <>

        <Label {...props} className='form-label'>{props.label}</Label>
        <Input {...props} className ='form-control'/>

    </>

}

export default FormInput;