export default class Category {
    id?: number;
    name: string;
    description: string;
    categoryId: Number;

    constructor(id: number,name: string, description: string, categoryId: Number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
    } 
}