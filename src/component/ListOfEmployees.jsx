import React, { useEffect, useState } from 'react'
import { listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListOfEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        listEmployees().then((response) =>{
            setEmployees(response.data);
        }).catch(error =>{
            console.log(error);
        })
},[])

function addNewEmployee(event){
    event.preventDefault();
    navigate('/add-employee');
}

return (
    <div className='container'>
        <div className='mt-2 d-flex justify-content-between align-items-center mb-2'>
        <h3>List of Employees</h3>
        <button type='button=' className='btn btn-primary add-button' onClick={addNewEmployee}>Add Employee</button>
        </div>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee=>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
)
}

export default ListOfEmployees
