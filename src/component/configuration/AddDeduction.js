import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useDeduction from "../../data/useDeduction";
import FormInput from "../../UI/form/FormInput";
import FormSelect from "../../UI/form/FormSelect";
import Validation from "../../UI/validation/Validation";

const _formObject = {
    isFormValid:false,
    form:{
        title:{
            isValid:false,
            value:'',
            vtype:[
                {
                    type:'required',
                    error:'Title is required'
                }
            ]
        },dValue:{
            isValid:false,
            value:0,
            vtype:[
                {
                    type:'required',
                    error:'Value is required'
                },{
                    type:'vNum',
                    error:'Value should be number only'
                }
            ]
        },dType:{
            isValid:true,
            value:'amount'
        }

    }
    
}

const AddDeduction = (props) => {


    const [formObject, setFormObject] = useState(_formObject);

    //const { , localId ,sendRequest: sendTaskRequest } = useHttp();

    const {isLoading, set} = useDeduction();

    const lastIndex = props.lastIndex+1;
    //const lastIndex = 0;

    const handleOnSubmit = (e) => {
        const _obj = {
            lastIndex,
            title: formObject.form.title.value,
            dValue: formObject.form.dValue.value,
            dType: formObject.form.dType.value
        }

        set(_obj,(result)=>{
            console.info(result);
            props.hadleDeductionList()
            handleClose();
        });
        
    }

    const [show, setShow] = props.addShowState;

    
    const handleClose = () => {
        setFormObject(_formObject)
        setShow(false);
    }
    

    return <>

        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Add Deduction</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Validation setFormObject={setFormObject} formObject={formObject}>

                    <FormInput type="text" label="Title" placeholder="Enter deduction title" name="title"/>
                    <FormSelect label="Deduction type" name="dType" value={formObject.form.dType.value}>
                        <option value="amount">Amount</option>
                        <option value="percentage">Percentage</option>
                    </FormSelect>
                    <FormInput type="number" label="Value" placeholder="Enter deduction value" name="dValue"/>
                </Validation>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button disabled={ isLoading || !formObject.isFormValid?"disabled":''} variant="primary" onClick={handleOnSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>


    </>

}

export default AddDeduction;