import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import CategoryTable from './components/categoryComponent/categoryTable.component';
import ProductTable from './components/productComponent/productTable.component';
import CreateCategory from './components/categoryComponent/create.component';
import CreateProduct from './components/productComponent/create.component';
function App() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                        </ul>
                    </div>
                </nav> <br />

                <Switch>
                    {/* 
                  <Route path='/editCategory/:id' element={<EditCategory /> />
                  <Route path='/editProduct/:id' element={<EditProduct />}
                  <Route path='/tree' element={<Tree />}
                  <Route path='/products' element={<ProductsTable />} */}
                    <Route exact path='/createProduct' component={CreateProduct} />
                    <Route exact path='/createCategory' component={CreateCategory} />
                    <Route path='/products' component={ProductTable} />
                    <Route path='/' component={CategoryTable} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
