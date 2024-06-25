// src/types/Item.ts
import { Category } from "./itemCategory";
export interface Item {
    id: string;
    name: string;
    description: string;
    salePrice: number;
    category: Category;
    imageUrl: string;
  }

  export default Item