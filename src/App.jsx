import './App.css'
import './index.css'
import AddEmployeeComponent from './component/AddEmployee'
import FooterComponent from './component/Footer'
import HeaderComponent from './component/Header'
import ListOfEmployees from './component/ListOfEmployees'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
    <HeaderComponent/>
    <Routes>
    <Route path='/'></Route>
    <Route path='/employees' element={<ListOfEmployees/>}></Route>
    <Route path='/add-employee' element={<AddEmployeeComponent/>}></Route>
    <Route path='/update-employee/:id' element={<AddEmployeeComponent/>}></Route>
    </Routes>
    <FooterComponent/>
    </>
  )
}
export default App
