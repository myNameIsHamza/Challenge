import React, { useState, useEffect, useMemo } from 'react';
import Product from '../../models/product';
import FormControl from '@mui/material/FormControl';
import { Input, Button } from '../../common';
import CategoryTable from '../categoryComponent/categoryTable.component';
import Category from '../../models/category';

interface Props {
    product: Product;
    onChange: (fieldName: string, value: string) => void;
    onSelect: (event: any) => void;
    onSave: () => void;
    action: string;
}


export const ProductForm: React.FunctionComponent<Props> = (props) => {

    const fetchCategoriesData = useMemo(async () => {
        //instance of categoryTableClass
        const categoryTable: CategoryTable = new CategoryTable({
            isReady: false,
            listCategories: Array<Category>(),
            hasError: false,
        });
        return await categoryTable.fetchCategories()
    }, []);
    const [categoriesList, setCategoriesList] = useState([])

    useEffect(() => {
        fetchCategoriesData.then((value) => {
            setCategoriesList(value.data)
        });
    }, [fetchCategoriesData])

    return (
        <form>
            <h1>{props.action === "modification" ? "Modify product" : "Add product"}</h1>

            <Input
                name="name"
                label="name"
                value={props.product.name}
                onChange={props.onChange}
            />

            <Input
                name="description"
                label="description"
                value={props.product.description}
                onChange={props.onChange}
            />

            <Input
                name="price"
                label="price (EUR)"
                placeholder='EUR'
                value={props.product.price + ''}
                onChange={props.onChange}
            />


            <FormControl fullWidth>
                <label>Category</label>
                <select
                    value={props.product.categoryId + ''}
                    onChange={props.onSelect}
                    name={'categoryId'}
                    required
                >
                    <option disabled value="0">Choose a category</option>
                    {categoriesList.map((category, key) => {
                        return <option key={key} value={(category as Category).uid+''} >{(category as Category).description}</option>
                    })}
                </select>
            </FormControl>

            <Button
                label="Save"
                className="btn btn-success mt-2"
                onClick={props.onSave}
            />
        </form>
    );
};
