// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import itemService, { ItemForm } from '../services/itemService';
import ItemServices from '../services/itemService'; // Importa ItemServices corretamente
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Import the CSS file


const Home: React.FC = () => {
    const [busca, setBusca] = useState('')
    const [items, setItems] = useState<ItemForm[]>([]);
    const navigate = useNavigate();

    async function fetchData() {
        try {
            const items = await ItemServices.getItems(); // Chama a função getItems
            setItems(items);
        } catch (error) {
            navigate('/login');
        }
    }
    const testaBusca = (title: string) => {
        const regex = new RegExp(busca, 'i');
        return regex.test(title);
    };

    const editRoute = (id: string) => {
        navigate(`/edit-item/${id}`);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await itemService.deleteItem(id);
                setItems(items.filter(item => item.id !== id));
            } catch (error) {
                console.error('Failed to delete user:', error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="home-container">
            <h1>Items</h1>
            <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Busca"
            />
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Sale Price</th>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items.filter(item => testaBusca(item.name)).map((item) => (
                        <tr key={item.id}>
                            <td><img src={item.imageUrl} alt={item.name} className="item-image" /></td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{parseFloat(item.salePrice.toString()).toFixed(2)}</td>
                            <td>{item.category}</td>
                            <td>
                                <button className="delete-button" onClick={() => editRoute(item.id)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(item.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
