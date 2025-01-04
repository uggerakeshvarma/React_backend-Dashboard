import React, { useState } from 'react';
import './Login.css';
import { API_URL } from '../Data/Apipath';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();

    const Loginhandle = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`${API_URL}/vender/loginIn`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ Email, Password }),
            });
    
            const data = await response.json();
            console.log('Login Response:', data);  // Log the login response for debugging
    
            if (response.ok) {
                alert("Login Successfully");
                setEmail("");
                setPassword("");
                localStorage.setItem("LoginToken", data.token);
    
                const venderId = data.venderId;
                console.log('Checking venderId:', venderId);  // Log the venderId
    
                // Fetch vendor data by venderId
                const VendorResponse = await fetch(`${API_URL}/vender/Getby/${venderId}`);
                const VendorDataid = await VendorResponse.json();
                console.log('Vendor Data:', VendorDataid);  // Log the entire vendor data response
    
                if (VendorResponse.ok && VendorDataid) {
                    const VenderFirmId = VendorDataid.venderFirmId;  // Correct property for Firm ID
                    const VenderFirmName = VendorDataid.venderFirmName;  // Correct property for Firm Name
                    console.log('Checking For Firm Id:', VenderFirmId);
                    console.log('Checking For Firm Name:', VenderFirmName);
    
                    if (!VenderFirmId) {
                        console.log('No firm found for this vendor.');
                        alert('No firm associated with this vendor. Please add a firm.');
                        return; // Exit if no firm is found
                    }
    
                    // Continue with storing FirmId in localStorage
                    if (VenderFirmId) {
                        localStorage.setItem("FirmId", VenderFirmId);
                        console.log('Firm Id saved to localStorage:', VenderFirmId);
                        alert('Firm Id has been saved to localStorage.');
                    }
    
                    // Check if FirmName exists before saving it
                    if (VenderFirmName) {
                        localStorage.setItem("FirmName", VenderFirmName);
                        console.log('Firm Name saved to localStorage:', VenderFirmName);
                        alert('Firm Name has been saved to localStorage.');
                        window.location.reload()
                    } else {
                        console.log('Firm Name not found in vendor data');
                        alert('Firm Name not found for this vendor.');
                        
                    }
    
                } else {
                    console.log('Error fetching vendor data or missing venderFirmId');
                    alert('Error: Failed to fetch vendor data.');
                }
            }
        } catch (error) {
            alert('Login Failed');
            console.error(error);
        }
    };
    

    return (
        <form className='ContainerRegisterr' onSubmit={Loginhandle}>
            <h3>Login</h3>
            <label htmlFor="">Email</label><br />
            <input
                type="text"
                name="email"
                id="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please Enter Your Email"
            /> <br />
            <label htmlFor="">Password</label><br />
            <input
                type="password"
                name="password"
                id="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please Enter Your Password"
            /> <br />

            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
