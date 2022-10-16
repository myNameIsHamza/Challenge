import React from 'react';
import * as toastr from 'toastr';
import Category from "../../models/category";
import BaseService from '../../service/base.service';
import { CategoryPage } from './page.form';
 import { History } from 'history';


interface IProps { 
    history: History;
    //Map properties match
    match:{ 
        isExact: boolean
        params: {
            id:string
        },
        path: string,
        url: string,
    }
}
interface IState {
    category: Category
}


 class CreateCategory extends  React.Component<IProps, IState> {
    constructor(props:IProps) {
        super(props);
         
        this.state = {
            category: {
                name: '',
                description: '',
                categoryId: 0,
            }
        }
        this.onFieldValueChange = this.onFieldValueChange.bind(this);
    }

    private onFieldValueChange(fieldName: string, value: string) { 
        const nextState = {
            ...this.state,
            person: {
                ...this.state.category,
                [fieldName]: value,
            }
        };

        this.setState(nextState);
    }
    private onSave = () => { 
        BaseService.create<Category>("/employees", this.state.category).then(
            (rp) => {
                if (rp.Status) {
                    toastr.success('Member saved.'); 
                    this.setState({
                        category: {
                            name: '',
                            description: '',
                            categoryId: 0,
                            id: undefined,
                        }
                    });
                     this.props.history.goBack();
                } else {
                    toastr.error("Error");
                }
            }
        );

    } 
     
    render() {
        return (
            <CategoryPage
                category={this.state.category}
                onChange={this.onFieldValueChange}
                onSave={this.onSave}
            />
        );
    }     
     
}
export default CreateCategory;