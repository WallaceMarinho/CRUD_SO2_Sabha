import React, { useEffect, useState } from 'react';
import itemService, { ItemForm } from '../services/itemService';
import { Category } from '../types/itemCategory';
import { useNavigate, useParams } from 'react-router-dom';

const EditItem: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [category, setCategory] = useState<Category>(Category.PORTION);
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [purchasePrice, setPurchasePrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [minimumStock, setMinimumStock] = useState('');
    const [stockLocation, setStockLocation] = useState('');
    const [generalInfo, setGeneralInfo] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await itemService.update({
                name,
                description,
                salePrice: parseFloat(salePrice),
                category,
                imageFile: imageFile as File,
                purchasePrice: parseFloat(purchasePrice),
                stockQuantity: parseInt(stockQuantity),
                minimumStock: parseInt(minimumStock),
                stockLocation,
                generalInfo,
                imageUrl: '',
                id: id as string
            },id as string)


            // Limpa os campos após o envio
            setName('');
            setDescription('');
            setSalePrice('');
            setCategory(Category.PORTION);
            setImageFile(null);
            setPurchasePrice('');
            setStockQuantity('');
            setMinimumStock('');
            setStockLocation('');
            setGeneralInfo('');
            navigate('/')
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
            // Lógica para tratamento de erro, se necessário
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        try {
        itemService.getByID(id as string)
            .then((res) => {
                setName(res.name);
                setDescription(res.description);
                setSalePrice(`${res.salePrice}`);
                setCategory(Category.PORTION);
                setImageFile(null);
                setPurchasePrice(`${res.purchasePrice}`);
                setStockQuantity(`${res.stockQuantity}`);
                setMinimumStock(`${res.minimumStock}`);
                setStockLocation(res.stockLocation);
                setGeneralInfo(res.generalInfo);
                setImageUrl(res.imageUrl)
            }).catch((error) =>  {
                console.log(error)
                navigate ('/login')
            })}
            catch(error) {
                console.log(error)
                navigate ('/login')
            }
    }, [id]

    )
    return (
        <div>
            <h1>Edit Item</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <input
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="Sale Price"
                    required
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    required
                >
                    {Object.values(Category).map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                />
                {imageUrl && (
                    <img src={imageUrl} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                )}
                <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder="Purchase Price"
                    required
                />
                <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    placeholder="Stock Quantity"
                    required
                />
                <input
                    type="number"
                    value={minimumStock}
                    onChange={(e) => setMinimumStock(e.target.value)}
                    placeholder="Minimum Stock"
                    required
                />
                <input
                    type="text"
                    value={stockLocation}
                    onChange={(e) => setStockLocation(e.target.value)}
                    placeholder="Stock Location"
                    required
                />
                <input
                    type="text"
                    value={generalInfo}
                    onChange={(e) => setGeneralInfo(e.target.value)}
                    placeholder="General Info"
                    required
                />
                <button type="submit">Edit Item</button>
            </form>
        </div>
    );
};

export default EditItem;
