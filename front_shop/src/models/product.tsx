export default class Product {
    id?: number;
    name: string;
    description: string;
    price: Number;
    category: Number;

    constructor(id: number,name: string, description: string, price: Number,category : Number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    } 
}