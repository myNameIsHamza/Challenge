import * as React from 'react';
import Product from '../../models/product';
import { ProductForm } from './productForm';

interface IProps {
    product: Product;
    onChange: (fieldName: string, value: string) => void;
    onSelect: (event: any) => void;
    onSave: () => void;
    action:string;
}

export const ProductPage: React.FunctionComponent<IProps> = (props: IProps) => {
    return (
        <ProductForm
            product={props.product}
            onChange={props.onChange}
            onSave={props.onSave}
            onSelect={props.onSelect}
            action={props.action}
        />
    );
}
