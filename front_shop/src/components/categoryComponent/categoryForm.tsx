import React, { useState, useEffect, useMemo } from 'react';
import Category from '../../models/category';
import FormControl from '@mui/material/FormControl';
import { Input, Button } from '../../common';
import CategoryTable from './categoryTable.component';

interface Props {
    category: Category;
    onChange: (fieldName: string, value: string) => void;
    onSelect: (event: any) => void;
    onSave: () => void;
    action:string
}


export const CategoryForm: React.FunctionComponent<Props> = (props) => {


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
            <h1>{props.action==="modification"?'Modify category':'Add category'} </h1>

            <Input
                name="name"
                label="name"
                value={props.category.name}
                onChange={props.onChange}
            />

            <Input
                name="description"
                label="description"
                value={props.category.description}
                onChange={props.onChange}
            />


            <FormControl fullWidth>
                <label>Category</label>
                <select
                    value={props.category.categoryId+''}
                    onChange={props.onSelect}
                    name={'categoryId'}
                >
                    <option value="0">None</option>
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
