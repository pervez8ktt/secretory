export const numberOnly = (_value) =>{

    if(/\D/.test(_value)){
       return false; 
    }else{
        return true;
    }

}

export const required = (_value) => {
    if(_value==null || _value.trim()===''){
        return false;
    }else{
        return true;
    }
}