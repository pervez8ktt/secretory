import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import useDeduction from '../../data/useDeduction';
import AuthGoogleContext from '../../UI/authentication/auth-google-context';
import FormInput from '../../UI/form/FormInput';
import FormSelect from '../../UI/form/FormSelect';
import useHttp from '../../UI/http/useHttp';
import Validation from '../../UI/validation/Validation';
import Head from '../head/Head';
import AddDeduction from './AddDeduction';
import DeductionItem from './DeductionItem';

const _configFormObj = {

    isFormValid: false,
    form: {
        salary: {
            isValid: false,
            value: '',
            vtype: [
                {
                    type: 'required',
                    error: 'Salary is required'
                }, {
                    type: 'vDec',
                    error: 'Salary should be in decimal'
                }
            ]
        },
        clPerMonth: {
            isValid: false,
            value: 0,
            vtype: [
                {
                    type: 'required',
                    error: 'CL Per Month is required'
                }, {
                    type: 'vDec',
                    error: 'CL Per Month should be number only'
                }
            ]
        },
        attandanceReqForCl: {
            isValid: false,
            value: 0,
            vtype: [
                {
                    type: 'required',
                    error: 'Attendance Required for CL is required'
                }, {
                    type: 'vDec',
                    error: 'Attendance Required for CL should be number only'
                }
            ]
        },
        saturdayOff: {
            isValid: true,
            value: 2,
            vtype: [
                {
                    type: 'required',
                    error: 'Saturday off is required'
                }
            ]
        }

    }

}

const ConfigurationComponent = (props) => {

    const { getList } = useDeduction();

    

    const [configFormObj, setConfigFormObj] = useState(_configFormObj);
    const addShowState = useState(false);

    const { isLoading, localId, sendRequest: sendTaskRequest } = useHttp();

    const [, setShowAdd] = addShowState;

    const [lastIndexDeduction, setLastIndexDeduction] = useState(-1);

    const [deductionList, setDeductionList] = useState([]);

    const hadleDeductionList=()=>{
        getList((_result) => {
            
            const _l = _result.length-1;
            setLastIndexDeduction(_l);



            setDeductionList(_result)
        });
    }

    useEffect(() => {

        hadleDeductionList();

        sendTaskRequest(
            {
                url: '/configurations/' + localId + "/configuration.json",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            },
            (response) => {
                console.info(response);
                if (response != null) {
                    setConfigFormObj((_obj) => {
                        _obj.isFormValid = true
                        _obj.form.salary.value = response.salary
                        _obj.form.salary.isValid = true
                        _obj.form.clPerMonth.value = response.clPerMonth
                        _obj.form.clPerMonth.isValid = true
                        _obj.form.attandanceReqForCl.value = response.attandanceReqForCl
                        _obj.form.attandanceReqForCl.isValid = true
                        _obj.form.saturdayOff.value = response.saturdayOff
                        _obj.form.saturdayOff.isValid = true
                        return _obj;
                    })
                }

            }
        );
    }, [])

    const handleShowAdd = (e) => {
        setShowAdd(true)
    }

    const submitConfig = (e) => {
        const _obj = {
            salary: configFormObj.form.salary.value,
            clPerMonth: configFormObj.form.clPerMonth.value,
            attandanceReqForCl: configFormObj.form.attandanceReqForCl.value,
            saturdayOff: configFormObj.form.saturdayOff.value
        }

        sendTaskRequest(
            {
                url: '/configurations/' + localId + "/configuration.json",
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: _obj,
            },
            (response) => {
                
            }
        );
    }

    const _deductionJsx = deductionList.map((_d,index)=>{
        return <DeductionItem key={index} index={index} data={_d}></DeductionItem>
    });

    return <React.Fragment>

        <Head title="Configuration" />
        <AddDeduction lastIndex={lastIndexDeduction} addShowState={addShowState} hadleDeductionList={hadleDeductionList}/>


        <Container>

            <h1>Configuration</h1>
            <Validation setFormObject={setConfigFormObj} formObject={configFormObj}>

                <Row>
                    <div className='col-md-3'>

                        <FormInput name="salary" type="number" label="Salary" value={configFormObj.form.salary.value}></FormInput>


                    </div>
                    <div className='col-md-3'>
                        <FormInput name="clPerMonth" type="number" label="CL Per Month" value={configFormObj.form.clPerMonth.value}></FormInput>

                    </div>
                    <div className='col-md-3'>

                        <FormInput name="attandanceReqForCl" type="number" label="Attendance Required for CL" value={configFormObj.form.attandanceReqForCl.value}></FormInput>


                    </div>

                    <div className='col-md-3'>
                        <FormSelect name="saturdayOff" label="Seturday Off" className="form-select" aria-label="Default select example" value={configFormObj.form.saturdayOff.value}>
                            <option value={1}>All Saturday Off</option>
                            <option value={2}>Second and fourth Saturday Off</option>
                            <option value={3}>No Off</option>
                            <option value={4}>Other</option>

                        </FormSelect>
                    </div>



                </Row>
                <Row>
                    <div className='col-md-3'>
                        <button disabled={isLoading || !configFormObj.isFormValid ? "disabled" : ""} className='btn btn-primary' onClick={submitConfig}>Submit</button>
                    </div>
                </Row>


            </Validation>
            <br />
            <br />


            <h2>Deductions</h2>
            <Button className='btn-primary' onClick={handleShowAdd}>
                Add Deductions
            </Button>



            <div className='mt-5'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Particular</th>
                            <th scope="col">Type</th>
                            <th scope="col">Amount/Per</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {_deductionJsx}

                        
                    </tbody>
                </table>
            </div>




        </Container>

    </React.Fragment>
}

export default ConfigurationComponent;