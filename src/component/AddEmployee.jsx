import React, { useState } from 'react'
import { createEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';


const AddEmployeeComponent = () => {
    const [addEmployee, setAddEmployee] = useState({
        firstName:'',
        lastName:'',
        email:''
    });
    const navigate = useNavigate()

    function handleAll(event){
        const {name, value} = event.target;
        setAddEmployee({
            ...addEmployee,
            [name]: value
        })
    }

    function saveEmployee(event){
        event.preventDefault();
        createEmployee(addEmployee).then((response) =>{
            console.log(response.data);
            navigate('/employees')
        })
    }

return (
    <div>
        <div className="container">
            <div className="row">
                <div className="card mt-5">
                    <h3 className='text-center mt-2'>Add Employee</h3>
                    <div className="card-body">
                        <form action="">
                            <div className="form-group mb-2">
                                <label className='form-label' htmlFor="">First Name:</label>
                                <input type="text"
                                placeholder='Enter Your First Name'
                                name='firstName'
                                value={addEmployee.firstName}
                                className='form-control'
                                onChange={handleAll}/>
                            </div>
                            <div className="form-group mb-2">
                                <label className='form-label' htmlFor="">Last Name:</label>
                                <input type="text"
                                placeholder='Enter Your Last Name'
                                name='lastName'
                                value={addEmployee.lastName}
                                className='form-control'
                                onChange={handleAll}/>
                            </div>
                            <div className="form-group mb-2">
                                <label className='form-label' htmlFor="">Email:</label>
                                <input type="email"
                                placeholder='Enter Your Email'
                                name='email'
                                value={addEmployee.email}
                                className='form-control'
                                onChange={handleAll}/>
                            </div>
                            <div className="form-group d-flex justify-content-end text-align-center">
                                <button className="btn btn-secondary me-2">Cancel</button>
                                <button className="btn btn-success" onClick={saveEmployee}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default AddEmployeeComponent;
