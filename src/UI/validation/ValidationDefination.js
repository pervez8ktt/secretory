export const numberOnly = (_value) =>{

    if(/\D/.test(_value)){
       return false; 
    }else{
        return true;
    }

}

export const decimalOnly = (_value) =>{

    if(/^\d+(\.\d+)?$/.test(_value)){
       return true; 
    }else{
        return false;
    }

}

export const required = (_value) => {
    if(_value==null || _value.trim()===''){
        return false;
    }else{
        return true;
    }
}


// var regPhone = /^[+][1-9]\d*$/;
// const regPhone = /^[1-9]\d*$/;
// const regPhone = /^.{0}[+]?.{9,14}$/;
//const regPhone = /^.{0}[+]?\d{8}$/
//const regPhone = /^[0-9]?\d{8}$/
//const regNumber = /^[0-9]\d*$/;
//const regAlphabet = /^[a-zA-ZÀ-ÿ-.' ]*$/;
// const regAlphabet = /^[a-zA-ZÀ-ÿ-. ]*$/;
//const regDecimal = /^\d+(\.\d+)?$/;
//const regReq = /^\s*$/;
//const regUsername = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
//const regUsername = /^[a-zA-Z]+([._|.-]?[a-zA-Z0-9\s])*$/;
// const regEmail =
// /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//const regEmail = /^[^\.][a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
//const regEmail = /^.+@.+\..+$/
// var regPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,15})/;
// const regPassword =
// /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;
//const regPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{6,15}$/;
// var regPassword = /^[a-zA-Z0-9!@#$&*]{6,}$/;
//const regNegPosNum = /^-?\d+(\.\d{1,2})?$/;
// const regLandline = /^.{0}[+]?.{9,14}$/;
//const regLandline = /^.{0}[+]?\d{9,14}$/;
