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
}


export const CategoryForm: React.FunctionComponent<Props> = (props) => {


    const calculation = useMemo(async () => {
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
        calculation.then((value) => {
            setCategoriesList(value.data)
        });
    }, [calculation])

    return (
        <form>
            <h1>Add category</h1>

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
                    defaultValue={'0'}
                    onChange={props.onSelect}
                    name={'categoryId'}
                >
                    <option value="0">None</option>
                    {categoriesList.map((category, key) => {
                        return <option key={key} value={key + 1} >{(category as Category).description}</option>
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
