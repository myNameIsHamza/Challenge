export default class Category {
    uid?: number;
    name: string;
    description: string;
    categoryId: Number | null;

    constructor(uid: number,name: string, description: string, categoryId: Number) {
        this.uid = uid;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
    } 
}