import React from 'react'
import './Login.css';
const Login = () => {
    return (
        <div className='LogSection'>
            <form action="" className='AutoFirm'>
                <h3>Vender LogIn</h3>
                <label htmlFor="">Email</label><br />
                <input type="text" name="Email" id="Email" placeholder='Enter Your Email' /> <br />
                <label htmlFor="">Password</label><br />
                <input type="text" name="Password" id="Password" placeholder=' Enter Your Password' /><br />
                <div className="btnSubmit">
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login
