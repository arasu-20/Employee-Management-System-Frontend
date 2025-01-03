import React from 'react'
import { useNavigate } from 'react-router-dom';



const HeaderComponent = () => {

    const navigate = useNavigate();

    function addNewEmployee(event){
        event.preventDefault();
        navigate('/add-employee');
    }

    function showEmployee(event){
        event.preventDefault();
        navigate('/employees');
    }
return (
    <div>
        <header>
            <nav className='navbar navbar-dark bg-dark'>
                        <a className='navbar-brand ps-3' href="#">Employee Management System</a>
                    <div>
                    <button type='button' className='btn btn-success add-button' onClick={addNewEmployee}>Add Employee</button>
                    <button type='button' className='btn btn-primary m-2' onClick={showEmployee}>Show Employees</button>
                    </div>
            </nav>
            </header>
    </div>
)
}

export default HeaderComponent;
