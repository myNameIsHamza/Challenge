import React from 'react';
import * as toastr from 'toastr';
import Product from "../../models/product";
import BaseService from '../../service/base.service';
import { ProductPage } from './page.form';
import { History } from 'history';


interface IProps {
    history: History;
    //Map properties match
    match: {
        isExact: boolean
        params: {
            id: string
        },
        path: string,
        url: string,
    }
}
interface IState {
    product: Product,
    action: string
}


class CreateProduct extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            product: {
                name: '',
                description: '',
                price: 0,
                categoryId: 0,
            },
            action: "creation"
        }
        this.onFieldValueChange = this.onFieldValueChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    private onSelect(event: any) {
        const nextState = {
            ...this.state,
            product: {
                ...this.state.product,
                [event.target.name]: event.target.value,
            }
        };

        this.setState(nextState);
    }

    private onFieldValueChange(fieldName: string, value: string) {
        const nextState = {
            ...this.state,
            product: {
                ...this.state.product,
                [fieldName]: value,
            }
        };

        this.setState(nextState);
    }
    private onSave = () => {
        BaseService.create<Product>("/product", this.state.product).then(
            (rp) => {
                if (rp.status === 200) {
                    toastr.success('Member saved.');
                    this.setState({
                        product: {
                            name: '',
                            description: '',
                            price: 0,
                            categoryId: 0,
                            uid: undefined,
                        }
                    });
                    this.props.history.goBack();
                } else {
                    toastr.error(rp.message);
                }
            }
        );

    }

    render() {
        return (
            <ProductPage
                product={this.state.product}
                onChange={this.onFieldValueChange}
                onSave={this.onSave}
                onSelect={this.onSelect}
                action={this.state.action}
            />
        );
    }

}
export default CreateProduct;