import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import CategoryTable from './components/categoryComponent/categoryTable.component';
import ProductTable from './components/productComponent/productTable.component';
import CreateCategory from './components/categoryComponent/create.component';
import CreateProduct from './components/productComponent/create.component';
import Tree from './components/treeComponent/tree.component'
import { RapidApi } from './api/rapidApi'


function App() {
    const [factor, setFactor]: any = useState(1);
    const [currencyName, setCurrencyName]: any = useState('EUR');
    useEffect(() => {
        RapidApi()
    }, [])
    const handleSelect = async (event: any) => {
        const data = JSON.parse(localStorage.getItem('currency') || '{}')
        switch (event.target.value) {
            case "MAD":
                setFactor(data.rates.MAD)
                break;
            case "EUR":
                setFactor(1)
                break;
            case "USD":
                setFactor(data.rates.USD)
                break;
            case "JPY":
                setFactor(data.rates.JPY)
                break;
            case "GBP":
                setFactor(data.rates.GBP)
                break;

            default:
                break;
        }
        setCurrencyName(event.target.value)


    }
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link">Categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/products'} className="nav-link">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/tree'} className="nav-link">Tree</Link>
                            </li>
                            <li className="nav-item currency">
                                <select
                                    defaultValue={'0'}
                                    onChange={handleSelect}
                                    name={'categoryId'}
                                >
                                    <option value="EUR">EUR</option>

                                    <option value="USD">USD</option>
                                    <option value="MAD">MAD</option>
                                    <option value="GBP">GBP</option>
                                    <option value="JPY">JPY</option>

                                </select>
                            </li>
                        </ul>
                    </div>
                </nav> <br />

                <Switch>
                    {/* 
                  <Route path='/editCategory/:id' element={<EditCategory /> />
                  <Route path='/editProduct/:id' element={<EditProduct />}
                  <Route path='/tree' element={<Tree />}
                  <Route path='/products' element={<ProductsTable />} */}
                    <Route path='/createProduct' component={CreateProduct} />
                    <Route path='/createCategory' component={CreateCategory} />
                    <Route
                        path="/products"
                        render={() => {
                            return <ProductTable factor={factor} currencyName={currencyName} />;
                        }} />

                    <Route
                        path="/tree"
                        render={() => {
                            return <Tree factor={factor} currencyName={currencyName} />;
                        }}
                    />
                    <Route path='/' component={CategoryTable} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

