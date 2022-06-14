import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import FormInput from '../../UI/form/FormInput';
import FormSelect from '../../UI/form/FormSelect';
import AddDeduction from './AddDeduction';

const ConfigurationComponent = (props) => {


    const addShowState = useState(false);

    const [, setShowAdd] = addShowState;

    const handleShowAdd = (e) => {
        setShowAdd(true)
    }

    

    return <React.Fragment>


        <AddDeduction addShowState={addShowState} />


        <Container>

            <h1>Configuration</h1>

            <form>

                <Row>
                    <div className='col-md-3'>

                        <FormInput type="number" label="Salary"></FormInput>


                    </div>
                    <div className='col-md-3'>
                        <FormInput type="number" label="CL Per Month"></FormInput>

                    </div>
                    <div className='col-md-3'>

                        <FormInput type="number" label="Attendance Required for CL"></FormInput>

                        
                    </div>

                    <div className='col-md-3'>
                        <FormSelect label="Seturday Off" className="form-select" aria-label="Default select example" defaultValue={2}>
                            <option value={1}>All Saturday Off</option>
                            <option value={2}>Second and fourth Saturday Off</option>
                            <option value={3}>No Off</option>
                            <option value={4}>Other</option>

                        </FormSelect>
                    </div>



                </Row>
                <Row>
                    <div className='col-md-3'>
                        <button className='btn btn-primary'>Submit</button>
                    </div>
                </Row>

            </form>
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
                            <th scope="col">Amount/Per</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>PF</td>
                            <td>3000</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Health</td>
                            <td>1000</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Security</td>
                            <td>1000</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>




        </Container>

    </React.Fragment>
}

export default ConfigurationComponent;