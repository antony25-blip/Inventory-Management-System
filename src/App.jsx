import './App.css'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './Pages/AddProduct'
import Product from './Pages/Product'
import { ToastContainer} from 'react-toastify';
import Home from './Pages/Home';
import Sale from './Pages/Sale'
import Report from './Pages/Report';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin/product' element={<Product/>}/>
        <Route path='/admin/addproduct' element={<AddProduct/>}/>
        <Route path='/sale' element={<Sale/>}/>
        <Route path='/admin/report' element={<Report/>}/> 

        
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} theme="light"/>
    </>
  )
}

export default App
