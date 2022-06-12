import { useContext, useEffect, useState } from "react";
import ValidationContext from "../validation/validation-context";
import ErrorMessage from "./ErrorMessage";

const Select = (props) => {

    const validationContext = useContext(ValidationContext)

    var className = props.className != null ? props.className : 'form-control'
    
    const [value, setValue] = useState(props.value==null?'':props.value);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInit, setIsInit] = useState(false);
    
    const checkValid = (value) => {
        try{
            const {isValid, error} = validationContext.isValid(value, {...props})
            setIsValid(isValid);
            setErrorMessage(error);
        }catch(e){

        }
    }

    useEffect(()=>{

        if(isInit){
            checkValid(value)
        }

        
        
    },[value, isInit])

    const handleOnChange = (e) => {
        setValue(e.target.value);
        setIsInit(true);
        try{
            props.onChange(e)
        }catch(e){

        }
    }

    const handleOnBlur = (e) => {
        setIsInit(true)
        
        try{
            props.onBlur(e);
        }catch(e){

        }
    }

    const defaultValue = props.defaultValue!=null?props.defaultValue:""

    return <>
        <select className={className} defaultValue={defaultValue} onChange={handleOnChange} onBlur={handleOnBlur}>
        {props.children}
    </select>
    <ErrorMessage isValid={isValid} errorMessage={errorMessage}/>
    </>
    

}

export default Select;