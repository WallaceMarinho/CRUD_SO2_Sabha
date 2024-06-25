// src/services/itemService.ts
import api from './api';

import { Category } from "../types/itemCategory";


export interface ItemForm {
    id: string;
    name: string;
    description: string;
    salePrice: number;
    category: Category;
    imageFile: File;
    imageUrl: string;
    purchasePrice: number;
    stockQuantity: number;
    minimumStock: number;
    stockLocation: string;
    generalInfo: string;
  }

class ItemServices {

  async getItems(): Promise<ItemForm[]> {
    const response = await api.apiFormdata.get<ItemForm[]>('/items');
    return response.data;
  };

async new(item: ItemForm): Promise<{id: string}> {
     const formData = new FormData();
     formData.append('name', item.name);
     formData.append('description', item.description);
     formData.append('purchasePrice', `${item.purchasePrice}`);
     formData.append('salePrice', `${item.salePrice}`);
     formData.append('stockQuantity', `${item.stockQuantity}`);
     formData.append('minimumStock', `${item.minimumStock}`);
     formData.append('category', item.category);
     formData.append('stockLocation', item.stockLocation);
     formData.append('generalInfo', item.generalInfo);
     formData.append('img', item.imageFile);

     const {data} = await api.apiFormdata.post('/items', formData);
     return data;
    
 }
}

export default new ItemServices();
