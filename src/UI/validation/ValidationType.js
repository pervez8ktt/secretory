import { numberOnly, required } from "./ValidationDefination";

const validationType = {
    vNum: numberOnly,
    required: required
}

const ValidationType = (_type) =>{
    return validationType[_type];

}

export default ValidationType;