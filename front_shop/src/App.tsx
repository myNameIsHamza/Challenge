import React from 'react';
import { BrowserRouter as Router,Routes, Link,Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'toastr/build/toastr.min.css'; 
import CategoryTable from './components/index.component';
function App() {
  return (
    <Router>
          <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav mr-auto">
                          <li className="nav-item">
                              <Link to={'/'} className="nav-link">Home</Link>
                          </li>
                          <li className="nav-item">
                              <Link to={'/create'} className="nav-link">Create</Link>
                          </li>
                          <li className="nav-item">
                              <Link to={'/index'} className="nav-link">Index</Link>
                          </li>
                      </ul>
                  </div>
              </nav> <br/>
         
              <Routes>
                  {/* <Route exact path='/create' component={ Create } />
                  <Route path='/edit/:id' component={ Edit } />
                  <Route path='/index' component={ Index } /> */}
                  <Route path='/' element={<CategoryTable />}  />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
