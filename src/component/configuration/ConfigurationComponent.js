import React from 'react';

const ConfigurationComponent = (props) => {

    return <React.Fragment>

        <div className='container'>

            <h1>Configuration</h1>

            <form>

                <div className='row mb-2'>
                    <div className='col-md-3'>
                        <label for="salaryInput" className="form-label">Salary</label>
                        <input type="number" className="form-control"/>
                    </div>
                    <div className='col-md-3'>
                        <label for="salaryInput" className="form-label">CL Per Month</label>
                        <input type="number" className="form-control"/>
                    </div>
                    <div className='col-md-3'>
                        <label for="salaryInput" className="form-label">Attendance Required for CL</label>
                        <input type="number" className="form-control"/>
                    </div>

                    <div className='col-md-3'>
                    <label for="salaryInput" className="form-label">Seturday Off</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>All Saturday Off</option>
                            <option value="1">Second and third Saturday Off</option>
                            <option value="1">No Off</option>
                            <option value="2">Other</option>
                            
                        </select>
                    </div>

                    

                </div>
                <div className='row'>
                        <div className='col-md-3'>
                        <button className='btn btn-primary'>Submit</button>
                        </div>
                    </div>
                
            </form>
            <br/>
            <br/>
            
            <div className='position-relative mt-1'>
                <h2 className='position-absolute start-0'>Deductions</h2>
                <button className='btn btn-primary position-absolute end-0'>Add</button>
            </div>
            
            <div className='mt-5'>
            <table class="table">
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
            

        

        </div>

    </React.Fragment>
}

export default ConfigurationComponent;