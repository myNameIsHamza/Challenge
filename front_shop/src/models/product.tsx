export default class Product {
    uid?: number;
    name: string;
    description: string;
    price: Number;
    categoryId: Number;

    constructor(uid: number,name: string, description: string, price: Number,categoryId : Number) {
        this.uid = uid;
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
    } 
}