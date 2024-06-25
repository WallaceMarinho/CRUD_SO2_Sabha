// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import { getItems } from '../services/itemService';
import { Item } from '../types/Item';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Import the CSS file

const Home: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const navigate = useNavigate();

    async function fetchData() {
        try {
            const items = await getItems();
            setItems(items);
        } catch (error) {
            navigate('/login');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="home-container">
            <h1>Items</h1>
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Sale Price</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td><img src={item.imageUrl} alt={item.name} className="item-image" /></td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{parseFloat(item.salePrice.toString()).toFixed(2)}</td>
                            <td>{item.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
