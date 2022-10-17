import * as React from 'react';
import Product from '../../models/product';
import FormControl from '@mui/material/FormControl';
import { Input, Button } from '../../common';

interface Props {
    product: Product;
    onChange: (fieldName: string, value: string) => void;
    onSelect: (event: any) => void;
    onSave: () => void;
}


export const ProductForm: React.FunctionComponent<Props> = (props) => {
    return (
        <form>
            <h1>Manage member</h1>

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
                label="price"
                value={props.product.price+''}
                onChange={props.onChange}
            />


            <FormControl fullWidth>
                <label>Product</label>
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
