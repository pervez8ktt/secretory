import Input from "./Input";
import Label from "./Label";

const FormInput = ({label ,...props}) => {


    return <>

        <Label {...props} className='form-label'>{label}</Label>
        <Input {...props} className ='form-control'/>

    </>

}

export default FormInput;