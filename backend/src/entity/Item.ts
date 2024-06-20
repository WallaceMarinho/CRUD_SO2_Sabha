import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Category {
  PORTION = 'Porção',
  DRINK = 'Bebida',
  COMBO = 'Combo',
  MISC = 'Diversos'
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  purchasePrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  salePrice: number;

  @Column('int')
  stockQuantity: number;

  @Column('int')
  minimumStock: number;

  @Column({
    type: 'enum',
    enum: Category
  })
  category: Category;

  @Column()
  stockLocation: string;

  @Column('text')
  generalInfo: string;
}
