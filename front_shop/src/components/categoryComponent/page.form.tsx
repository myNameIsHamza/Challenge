import * as React from 'react';
import Category from '../../models/category';
import { CategoryForm } from './categoryForm';

interface IProps {
    category: Category;
    onChange: (fieldName: string, value: string) => void;
    onSelect: (event: any) => void;
    onSave: () => void;
    action:string;
}

export const CategoryPage: React.FunctionComponent<IProps> = (props: IProps) => {
    return (
        <CategoryForm
            category={props.category}
            onChange={props.onChange}
            onSave={props.onSave}
            onSelect={props.onSelect}
            action={props.action}
        />
    );
}
