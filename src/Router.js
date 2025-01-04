import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Register/Register'
import Login from './Login/Login'
import Addproduct from './Addproduct/Addproduct'
import Addfirm from './AddFirm/Addfirm'
import WellCome from './WellCome/WellCome'
import AllProduct from './AllProduct/AllProduct'

const Router = () => {
  return (
    <Routes>
      <Route path='/Register' element={<Register />} />
      <Route path='/Login' element={<Login />} ></Route>
      <Route path='/Addproduct' element={<Addproduct />}></Route>
      <Route path='/AddFirm' element={<Addfirm />}></Route>
      <Route path='/Wellcomepage' element={<WellCome></WellCome>}></Route>
      <Route path='/AllProduct' element={<AllProduct />} ></Route>
    </Routes>
  )
}

export default Router
