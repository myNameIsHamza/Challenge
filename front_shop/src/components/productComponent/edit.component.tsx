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


class EditProduct extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            product: {
                uid: 0,
                name: '',
                description: '',
                price: 0,
                categoryId: 0,
            },
            action: "modification"
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

    public componentDidMount() {
        BaseService.get<Product>('/product/', this.props.match.params.id).then(
            (rp) => {
                if (rp.status === 200) {

                    const product = rp.data;
                    this.setState({ product: new Product(product.uid, product.name, product.description, product.price, product.categoryId) });
                } else {
                    toastr.error(rp.Messages);
                    console.log("Messages: " + rp.Messages);
                    console.log("Exception: " + rp.Exception);
                }
            }

        );
    }

    private onSave = () => {
        BaseService.update<Product>("/product/", this.props.match.params.id, this.state.product).then(
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
export default EditProduct;