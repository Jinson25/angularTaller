import { CategoryModel } from "./category.model";

interface ProductModel{
    id: number;
    Title: string;
    price: number;
    description: string;
    category: CategoryModel

}