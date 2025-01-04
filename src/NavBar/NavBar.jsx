import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [ShowLogOut, SetShowLogout] = useState(false);
  const [FirmName, setFirmName] = useState(localStorage.getItem('FirmName')); // Track FirmName in state
  const navigate = useNavigate();

  useEffect(() => {
    const loginToken = localStorage.getItem("LoginToken");
    if (loginToken) {
      SetShowLogout(true); // If logged in, show logout
    } else {
      SetShowLogout(false); // If not logged in, show login/register
    }
  }, []); // Only runs once on mount

  const LogoutHandler = () => {
    // Remove login-related data from localStorage
    localStorage.removeItem("LoginToken");
    localStorage.removeItem("FirmId");
    localStorage.removeItem("FirmName");

    // Update the state and navigate to login page
    SetShowLogout(false);
    setFirmName(null); // Clear FirmName in state
    navigate('/login'); // Redirect to login page

    // Force the page to refresh after logout to reflect the changes
    window.location.reload();
  };

  return (
    <section className="ContainerRegister">
      <div className="vendor">
        Vendor
      </div>
      <div>
        {FirmName && <span>Firm Name: {FirmName}</span>}
      </div>
      <div>
        {!ShowLogOut ? (
          <>
            <Link to={'/register'} className="linkk">
              <span>Register /</span>
            </Link>
            <Link to={'/login'} className="linkk">
              <span> LogIn</span>
            </Link>
          </>
        ) : (
          <button onClick={LogoutHandler} className='Log-Btn'>Logout</button>
        )}
      </div>
    </section>
  );
};

export default NavBar;
