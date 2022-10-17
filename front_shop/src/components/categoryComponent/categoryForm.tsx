import * as React from 'react';
import Category from '../../models/category';
import FormControl from '@mui/material/FormControl';
import { Input, Button } from '../../common';

interface Props {
    category: Category;
    onChange: (fieldName: string, value: string) => void;
    onSelect: (event: any) => void;
    onSave: () => void;
}


export const CategoryForm: React.FunctionComponent<Props> = (props) => {
    return (
        <form>
            <h1>Manage member</h1>

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

                    <option value="1">Clothes</option>
                    <option value="2">Shoes</option>
                    <option value="3">Men clothes</option>
                    <option value="4">Women clothes</option>
                    <option value="5">Men shoes</option>
                    <option value="6">Men shoes</option>
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
