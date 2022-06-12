import { useEffect, useReducer } from "react"
import ValidationContext from "./validation-context"
import ValidationType from "./ValidationType";

const checkFormReducer = (state, action) => {

    if (action.state === 'reset') {
        return createNewObj(action.obj);
    }

    var _newState = createNewObj(state);

    _newState.form[action.key].value = action.value;
    _newState.form[action.key].isValid = action.isValid;


    const _formKeys = Object.keys(_newState.form);

    _newState.isFormValid = true;
    for (var i = 0; i < _formKeys.length; i++) {
        var _key = _formKeys[i];
        var _isValid = _newState.form[_key].isValid

        if (!_isValid) {
            _newState.isFormValid = false;
        }

    }

    return _newState;

}

const createNewObj = (_formObject) => {
    var _newObj = {
        isFormValid: _formObject.isFormValid
    }

    const _formKeys = Object.keys(_formObject.form);
    var _form = {}
    for (var i = 0; i < _formKeys.length; i++) {
        var _key = _formKeys[i];
        _form[_key] = {
            value: _formObject.form[_key].value,
            isValid: _formObject.form[_key].isValid,
            vtype: _formObject.form[_key].vtype
        }
    }

    _newObj['form'] = _form;

    return _newObj;
}

const Validation = (props) => {

    if (props.formObject == null) {
        console.error("formObject props is Missing into Validation!!!")
    }

    const formObjectInit = createNewObj(props.formObject);

    const [formObject, formDispatcher] = useReducer(checkFormReducer, formObjectInit);

    useEffect(() => {
        try {
            console.info(formObject)
            props.setFormObject(formObject);
        } catch (e) {
            console.error("setFormObject props is Missing into Validation!!!")
        }

    }, [formObject])


    const reset = () => {
        formDispatcher({
            obj: formObjectInit,
            state: 'reset'
        })
    }


    const isValid = (value, props) => {
        var _isValid = true;
        var _error = "";
 
        var _key = props.name;
        try {
            const _vTypes = formObject.form[_key].vtype;

            for (var i = 0; i < _vTypes.length; i++) {
                var _vtypeObj = _vTypes[i];

                const validaitonFuntion = ValidationType(_vtypeObj.type)

                if(validaitonFuntion==null){
                    console.error(_vtypeObj.type+" is not a validation type!!!")
                }

                _isValid = validaitonFuntion(value);

                if(!_isValid){
                    _error = _vtypeObj.error
                    break;
                }

            }
        } catch (e) {
            console.error(e)
        }


        if (props.vtype === "required") {
            if (value == null || value.trim() === '') {
                _isValid = false;

                if (props.vReqMessage == null) {
                    _error = 'Required';
                } else {
                    _error = props.vReqMessage;
                }



            }
        } else {



        }

        formDispatcher({
            key: props.name,
            value,
            isValid: _isValid

        })

        return {
            isValid: _isValid,
            error: _error
        }
    }


    return <ValidationContext.Provider value={{
        isValid,
        reset
    }}>

        {props.children}

    </ValidationContext.Provider>

}

export default Validation;


