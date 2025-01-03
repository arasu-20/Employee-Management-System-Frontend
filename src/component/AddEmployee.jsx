import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';


const AddEmployeeComponent = () => {
    const [addEmployee, setAddEmployee] = useState({
        firstName:'',
        lastName:'',
        email:''
    });
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate()
    const {id} = useParams();
    
    function pageHeader(){
        return (
        <h3 className="text-center mt-2">
            {id ? "Update Employee" : "Add Employee"}
        </h3>
    );
    }

    useEffect(()=>{
        if(id){
            getEmployee(id).then((response)=>{
                setAddEmployee(response.data)
            }).catch(error =>{
                console.error(error)
            })
        }
    },[id])
    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 3000); // 3 seconds
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

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
    
        if(/^\S+@\S+\.\S+$/.test(addEmployee.email)){
            errors.email = '';
        }else{
            errors.email = 'Email is Required';
            valid = false;
        }
    
        setValidate(errors);
        return valid;
    }

    function saveOrUpdateEmployee(event){
        event.preventDefault();
        if(validateForm()){
            if(id){
                updateEmployee(id, addEmployee).then((response)=>{
                    setShowAlert(true);
                }).catch(error=>{
                    console.error(error);
                    alert("Failed to Update!")
                })
            }else{
                createEmployee(addEmployee).then((response) =>{
                    setShowAlert(true);
                    setAddEmployee({
                        firstName:'',
                        lastName:'',
                        email:''
                    });
                }).catch(error=>{
                    console.error(error);
                    alert("Failed to Add!")
                })
            }
        }
    }


return (
    <div>
        <div className="container">
            <div className="row">
            {id?
                showAlert && <div className="alert alert-info alert-dismissible fade show" role="alert">
                    Employee Updated Successfully!
                    <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowAlert(false)}
          ></button>
          </div>: showAlert && <div className="alert alert-info alert-dismissible fade show" role="alert">
                    Employee Added Successfully!
                    <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowAlert(false)}
          ></button>
          </div>
            }
                <div className="card mt-5">
                    {
                        pageHeader()
                    }
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
                                <button className="btn btn-secondary me-2" onClick={()=>navigate('/')}>Cancel</button>
                                <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Save</button>
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
