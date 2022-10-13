export default class Category {
    id?: number;
    name: string;
    description: string;
    price: Number;

    constructor(id: number,name: string, description: string, price: Number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    } 
}