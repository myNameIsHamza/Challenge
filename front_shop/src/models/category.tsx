export default class Category {
    id?: number;
    name: string;
    description: string;
    price: Number;
    category: string;

    constructor(id: number,name: string, description: string, price: Number, category: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    } 
}