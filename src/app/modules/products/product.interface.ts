export type TProduct = {
  name: string;
  availableStock: number;
  price: number;
  taxValue: number;
  hsnCode: string;
  status? : string;
  createdAt?: Date;
  updatedAt?: Date;
};
