import React, { useState, useEffect } from 'react';
import './Sidebar.css';  // Ensure your CSS is correctly linked
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status
  const navigate = useNavigate();  // Initialize navigate for redirection

  useEffect(() => {
    const loginToken = localStorage.getItem("LoginToken");
    if (loginToken) {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []); 

  const handleRestrictedAccess = () => {
    const confirmed = window.confirm("Please log in first.");
    if (confirmed) {
      navigate('/login');
    }
  };

  return (
    <ul className="SidebarContainer">
      {/* Conditional rendering based on login status */}
      {isLoggedIn ? (
        <>
          {/* Show links only if logged in */}
          <Link to="/AddFirm" className="linkk1">
            <li>Add Firm</li>
          </Link>
          <Link to="/AddProduct" className="linkk1">
            <li>Add Product</li>
          </Link>
          <Link to="/AllProduct" className="linkk1">
            <li>All Products</li>
          </Link>
        </>
      ) : (
        <>
          <li onClick={handleRestrictedAccess}>Add Firm</li>
          <li onClick={handleRestrictedAccess}>Add Product</li>
          <li onClick={handleRestrictedAccess}>All Products</li>
        </>
      )}

      {/* Always visible link */}
      <Link to="/UserDetails" className="linkk1">
        <li>User Details</li>
      </Link>
    </ul>
  );
};

export default Sidebar;
