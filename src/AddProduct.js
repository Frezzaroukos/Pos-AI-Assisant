// src/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            name,
            price,
            stock
        };

        try {
            const response = await axios.post('http://localhost:5000/api/products/add', productData);
            setMessage(response.data.message);
            setName('');
            setPrice('');
            setStock('');
        } catch (error) {
            setMessage('Error adding product');
        }
    };

    return (
        <div>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <label>
                    Price:
                    <input 
                        type="number" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <label>
                    Stock:
                    <input 
                        type="number" 
                        value={stock} 
                        onChange={(e) => setStock(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <button type="submit">Add Product</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddProduct;