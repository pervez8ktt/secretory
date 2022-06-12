import { useContext, useEffect, useState } from "react";
import ValidationContext from "../validation/validation-context";
import ErrorMessage from "./ErrorMessage";

const Input = (props) => {

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

        const timmer = setTimeout(()=>{
            if(isInit){
                checkValid(value)
            }
        },100)

        return ()=>{
            clearTimeout(timmer)
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

        <input type={props.type} placeholder={props.placeholder} className={className} value={value} onChange={handleOnChange} onBlur={handleOnBlur}/>
        <ErrorMessage isValid={isValid} errorMessage={errorMessage}/>
    </>

}

export default Input;