import { useContext, useEffect, useState } from "react";
import ValidationContext from "../validation/validation-context";
import ErrorMessage from "./ErrorMessage";

const Select = (props) => {

    const [value, setValue] = useState('');
    const validationContext = useContext(ValidationContext)

    var className = props.className != null ? props.className : 'form-control'
    
    const _value = props.value==null?'':props.value

    useEffect(()=>{
        setValue(_value)
    },[_value])

    
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

    

    return <>
        <select className={className} value={value} onChange={handleOnChange} onBlur={handleOnBlur}>
        {props.children}
    </select>
    <ErrorMessage isValid={isValid} errorMessage={errorMessage}/>
    </>
    

}

export default Select;