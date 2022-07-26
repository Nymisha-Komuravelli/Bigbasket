import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import ProductAdmin from "./components/products/admin/ProductAdmin";
import CreateProduct from "./components/products/create/CreateProduct";
import ProductList from "./components/products/list/ProductList";
import UpdateProduct from "./components/products/update/UpdateProduct";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { store } from "./redux/store";

let App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products/list" exact component={ProductList} />
            <Route path="/products/admin" exact component={ProductAdmin} />
            <Route path="/products/create" exact component={CreateProduct} />
            <Route
              path="/products/:productId"
              exact
              component={UpdateProduct}
            />
          </Switch>
        </Router>
      </Provider>
    </>
  );
};

export default App;
