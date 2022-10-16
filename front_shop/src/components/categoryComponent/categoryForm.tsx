import * as React from 'react';
import Category from '../../models/category';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Input, Button } from '../../common';

interface Props {
    category: Category;
    onChange: (fieldName: string, value: string) => void;
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
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Caregory    
                </InputLabel>
                <NativeSelect
                    defaultValue={1}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={1}>Clothes</option>
                    <option value={2}>Shoes</option>
                    <option value={3}>Men clothes</option>
                    <option value={4}>Women clothes</option>
                    <option value={5}>Men shoes</option>
                    <option value={6}>Men shoes</option>
                </NativeSelect>
            </FormControl>

            <Button
                label="Save"
                className="btn btn-success mt-2"
                onClick={props.onSave}
            />
        </form>
    );
};
