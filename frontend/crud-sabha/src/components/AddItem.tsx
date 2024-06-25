// src/components/AddItem.tsx
import React, { useState } from 'react';
import { createItem } from '../services/itemService';
import { Item } from '../types/Item';
import { Category } from '../types/itemCategory';

const AddItem: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [category, setCategory] = useState<Category>(Category.PORTION);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Omit<Item, 'id'> = {
      name,
      description,
      salePrice: parseFloat(salePrice),
      category,
      imageUrl,
    };
    await createItem(newItem);
    setName('');
    setDescription('');
    setSalePrice('');
    setCategory(Category.PORTION);
    setImageUrl('');
  };

  return (
    <div>
      <h1>Add Item</h1>
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
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
