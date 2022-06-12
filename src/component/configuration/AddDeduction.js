import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import FormInput from "../../UI/form/FormInput";
import FormSelect from "../../UI/form/FormSelect";
import Validation from "../../UI/validation/Validation";

const AddDeduction = (props) => {


    var _formObject = {
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


    
    const [formObject, setFormObject] = useState(_formObject);

    console.info(formObject)
    
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
                    <FormSelect label="Deduction type" name="dType">
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
                <Button disabled={!formObject.isFormValid?"disabled":''} variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>


    </>

}

export default AddDeduction;