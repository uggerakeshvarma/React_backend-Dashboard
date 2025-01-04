import React, { useState } from 'react'
import './Register.css';
import { API_URL } from '../Data/Apipath';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [UserName, setusername] = useState('');
  const [Email, setemail] = useState('');
  const [Password, setPassword] = useState('')
  const [error, seterror] = useState('');
  const [loadind, setloading] = useState(true)

  const navgate = useNavigate()

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch(`${API_URL}/vender/register`, {
        method: "POST",
        headers: {
          'Content-type': "application/json"
        },
        body: JSON.stringify({ UserName, Email, Password })
      })
      const data = await responce.json()
      if (responce.ok) {
        console.log(data);
        alert('Vender Register Sucsessfully')
        navgate('/Login')
      }
    } catch (error) {
      console.error("Register  Failed", error)
      alert('Register Failed')
    }
  }

  return (
    <form className='ContainerRegisterr' onSubmit={HandleSubmit}>
      {/* UserName, Email, Password */}
      <h3>Vendar User</h3>
      <label htmlFor="">UserName</label><br />
      <input type="text" name="UserName" id="UserName" value={UserName} onChange={(e) => setusername(e.target.value)} placeholder='Please Enter Your UserName' /> <br />

      <label htmlFor="">Email</label><br />
      <input type="text" name="Email" id="Email"  value={Email} onChange={(e) => setemail(e.target.value)} placeholder='Please Enter Your Mail' /> <br />

      <label htmlFor="">Password</label><br />
      <input type="text" name="Password" id="Password" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder='Please Enter Your Password' /> <br />

      <button type='Submit'>Register</button>
    </form>
  )
}

export default Register
