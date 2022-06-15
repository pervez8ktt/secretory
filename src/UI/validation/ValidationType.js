import { decimalOnly, numberOnly, required } from "./ValidationDefination";

const validationType = {
    vNum: numberOnly,
    required: required,
    vDec: decimalOnly
}

const ValidationType = (_type) =>{
    return validationType[_type];

}

export default ValidationType;