import React, { useState } from 'react';
import './Addproduct.css';
import { API_URL } from '../Data/Apipath';

const Addproduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [catagory, setCatagory] = useState([]); // category state
  const [bestSeller, setBestSeller] = useState(true);
  const [description, setDescription] = useState('');
  const [imaged, setImage] = useState(null);

  // Handle category checkbox changes
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (catagory.includes(value)) {
      setCatagory(catagory.filter((item) => item !== value)); // Uncheck
    } else {
      setCatagory([...catagory, value]); // Check
    }
  }; 

 
  // Handle best seller radio button changes
  const handleBestSellerChange = (e) => {
    const value = e.target.value === "true";
    setBestSeller(value);
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle form submission
  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!productName || !price || !description || catagory.length === 0) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      const loginToken = localStorage.getItem('LoginToken');
      const FirmId = localStorage.getItem('FirmId');

      if (!loginToken || !FirmId) {
        console.error('User Not Authenticated');
        alert('User Not Authenticated');
        return;
      }

      const productData = new FormData();
      productData.append('productName', productName);
      productData.append('price', price);
      productData.append('description', description);

      // Append categories as separate fields in FormData
    
      catagory.forEach((value) => {
        productData.append('catagory', value); // Using 'catagory' instead of 'category'
      });
    
      // Sending bestSeller as Boolean
      productData.append('bestSeller', bestSeller.toString()); // Convert to string for consistency

      // Append the image file if it exists
      if (imaged) {
        productData.append('Image', imaged);
      }

      const response = await fetch(`${API_URL}/Product/add-product/${FirmId}`, {
        method: 'POST',
        body: productData,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Reset the form fields after successful submission
        setProductName('');
        setPrice('');
        setCatagory([]);
        setBestSeller(false);
        setImage(null);
        setDescription('');
        alert('Product Added Successfully');
      } else {
        alert('Failed to Add Product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to Add Product');
    }
  };

  return (
    <form className="ContainerAddproduct" onSubmit={handleSubmitProduct}>
      <h3>Add Product</h3>

      {/* Product Name */}
      <label htmlFor="productName">Product Name</label><br />
      <input
        type="text"
        name="productName"
        id="productName"
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Enter product name"
        value={productName}
      /><br />

      {/* Product Price */}
      <label htmlFor="price">Price</label><br />
      <input
        type="number"
        name="price"
        id="price"
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter product price"
        value={price}
      /><br />

      {/* Category Selection */}
      <div className="checkinp">
        <label>Category</label>
        <div className="inboxcheckbox">
          <div className="checkboxcontainer">
            <label>Veg</label>
            <input
              type="checkbox"
              onChange={handleCategoryChange}
              checked={catagory.includes('Veg')}
              value="Veg"
            />
          </div>
          <div className="checkboxcontainer">
            <label>Non-Veg</label>
            <input
              type="checkbox"
              onChange={handleCategoryChange}
              checked={catagory.includes('Non-Veg')}
              value="Non-Veg"
            />
          </div>
        </div>
      </div>

      {/* Best Seller Selection */}
      <div className="checkinp">
        <label>Best Seller</label>
        <div className="inboxcheckbox">
          <div className="checkboxcontainer">
            <label>Yes</label>
            <input
              type="radio"
              value="true"
              checked={bestSeller === true}
              onChange={handleBestSellerChange}
            />
          </div>
          <div className="checkboxcontainer">
            <label>No</label>
            <input
              type="radio"
              value="false"
              checked={bestSeller === false}
              onChange={handleBestSellerChange}
            />
          </div>
        </div>
      </div><br />

      {/* Product Description */}
      <label htmlFor="description">Description</label><br />
      <input
        type="text"
        name="description"
        id="description"
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter product description"
        value={description}
      /><br />

      {/* Product Image */}
      <label htmlFor="Image">Product Image</label><br />
      <input
        type="file"
        name="Image"
        id="Image"
        onChange={handleImageChange}
      /><br />

      <button type="submit">Add Product</button>
    </form>
  );
};

export default Addproduct;
