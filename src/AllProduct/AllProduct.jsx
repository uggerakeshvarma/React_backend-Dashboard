import React, { useEffect, useState } from 'react';
import { API_URL } from '../Data/Apipath';
import './AllProduct.css';

const AllProduct = () => {
    const [Products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const productHandler = async () => {
        const FirmId = localStorage.getItem('FirmId');
        if (!FirmId) {
            setError("Firm ID is missing or invalid.");
            setLoading(false);
            return;
        }
        setLoading(true); // Set loading to true before fetching
        try {
            const response = await fetch(`${API_URL}/Product/${FirmId}/products`);
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const NewProductData = await response.json();
            setProducts(NewProductData.product);
        } catch (error) {
            setError("Failed to fetch data");
            console.error("Error fetching data:", error);  // This will now just log the error for debugging purposes.
        } finally {
            setLoading(false); // Ensure loading is false after the request completes
        }
    };

    useEffect(() => {
        productHandler();
    }, []);

    // Delete Function
    const DeleteItemID = async (productId) => {
        // Show confirmation dialog to the user
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    
        // If user confirms, proceed with deletion
        if (isConfirmed) {
            try {
                const response = await fetch(`${API_URL}/Product/${productId}`, {
                    method: 'DELETE',
                });
    
                if (response.ok) {
                    // Correct the filter condition to compare the product's _id field
                    setProducts(Products.filter(product => product._id !== productId));
                    alert("Product deleted successfully");
                } else {
                    alert("Failed to delete the product.");
                }
            } catch (error) {
                setError("Error occurred while deleting the product.");
                console.error("Failed to delete item:", error);  // Log error for debugging
            }
        } else {
            // If the user cancels, just log a message (optional)
            console.log("Product deletion was canceled by the user.");
        }
    };
    

    return (
        <div>
            {/* Display loading state */}
            {loading && <p>Loading products...</p>}

            {/* Display error message if there's an error */}
            {error && <p className="error">{error}</p>}

            {/* Handle the case when Products is an empty array */}
            {!Products ? (
                <p>No products available.</p>
            ) : (
                <table className="Product-Table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Products.map((item) => (
                            <tr key={item._id}> {/* Use _id as the key */}
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>
                                    {item.Image && (
                                        <img
                                            src={`${API_URL}/uploads/${item.Image}`}
                                            alt={item.productName}
                                            style={{ width: '100px', height: 'auto' }} // Adjust image size
                                        />
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => DeleteItemID(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllProduct;
