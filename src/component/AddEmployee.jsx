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

        const [validate, setValidate] = useState({
            firstName:'',
            lastName:'',
            email:''
        });
    

    function handleAll(event){
        const {name, value} = event.target;
        setAddEmployee({
            ...addEmployee,
            [name]: value
        })
    }

    function saveEmployee(event){
        event.preventDefault();
        if(validateForm()){
            createEmployee(addEmployee).then((response) =>{
                console.log(response.data);
                navigate('/employees')
            })
        }
    }

    function validateForm(){
        let valid = true;
        const errors = {...validate};
        if(addEmployee.firstName.trim()){
            errors.firstName = '';
        }else{
            errors.firstName = 'First Name is Required';
            valid = false;
        }
    
        if(addEmployee.lastName.trim()){
            errors.lastName = '';
        }else{
            errors.lastName = 'Last Name is Required';
            valid = false;
        }
    
        if(addEmployee.email.trim()){
            errors.email = '';
        }else{
            errors.email = 'Email is Required';
            valid = false;
        }
    
        setValidate(errors);
        return valid;
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
                                className={`form-control ${validate.firstName ? 'is-invalid' : ''}`}
                                onChange={handleAll}/>{
                                    validate.firstName && <div className='invalid-feedback'>{validate.firstName}</div>
                                }
                            </div>
                            <div className="form-group mb-2">
                                <label className='form-label' htmlFor="">Last Name:</label>
                                <input type="text"
                                placeholder='Enter Your Last Name'
                                name='lastName'
                                value={addEmployee.lastName}
                                className={`form-control ${validate.lastName ? 'is-invalid' : ''}`}
                                onChange={handleAll}/>
                                {
                                    validate.lastName && <div className='invalid-feedback'>{validate.lastName}</div>
                                }
                            </div>
                            <div className="form-group mb-2">
                                <label className='form-label' htmlFor="">Email:</label>
                                <input type="email"
                                placeholder='Enter Your Email'
                                name='email'
                                value={addEmployee.email}
                                className={`form-control ${validate.email ? 'is-invalid' : ''}`}
                                onChange={handleAll}/>
                                {
                                    validate.email && <div className='invalid-feedback'>{validate.email}</div>
                                }
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
