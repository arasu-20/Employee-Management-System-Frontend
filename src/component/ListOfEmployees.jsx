import React, { useEffect, useState } from 'react'
import { listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

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

return (
    <div className='container'>
        <div className='mt-2 d-flex justify-content-between align-items-center mb-2'>
        <h3>List of Employees</h3>
        <button type='button' className='btn btn-close' onClick={()=>navigate('/')}></button>
        </div>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr className='text-center align-middle'>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee=>
                        <tr className='text-center align-middle' key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-outline-primary m-2' onClick={()=>updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-outline-danger m-2' onClick={()=>deleteEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
)
}

export default ListOfEmployees
