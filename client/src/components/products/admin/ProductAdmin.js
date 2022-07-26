import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { bigbasketFeatureKey } from "../../../redux/bigbasket/bigbasket.reducer";
import { deleteProduct, getAllProducts } from "../../../redux/bigbasket/bigbasket.actions";
import spinner from "../../../assets/images/spinner.gif";

let ProductAdmin = () => {
  const dispatch = useDispatch();
  const productsInfo = useSelector((state) => {
    return state[bigbasketFeatureKey];
  });

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  let { loading, products, errorMessage } = productsInfo;

  let clickDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
    /* let dataURL = `http://127.0.0.1:5000/api/products/${productId}`;
    Axios.delete(dataURL)
      .then((response) => {
        //getAllProducts();
      })
      .catch((error) => {
        console.error(error);
      }); */
  };

  return (
    <>
      <section className="p-3">
        <div className="container">
          <div className="row animated zoomIn">
            <div className="col">
              <p className="h3 text-success">Product Admin</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                aspernatur beatae deserunt earum eius et fugiat hic, incidunt
                inventore iusto molestiae odio omnis perferendis provident
                quisquam sapiente soluta, sunt veniam!
              </p>
              <Link to="/products/create" className="btn btn-success btn-sm">
                Create New
              </Link>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <img src={spinner} alt="" className="d-block m-auto" />
      ) : (
        <section>
          <div className="container">
            <div className="row animated zoomIn">
              <div className="col">
                <table className="table table-hover text-center table-striped table-success">
                  <thead className="bg-dark text-success">
                    <tr>
                      <th>SNO</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {products.length > 0 ? (
                    <tbody>
                      {products.map((product) => {
                        return (
                          <tr key={product._id}>
                            <td>
                              {product._id.substr(product._id.length - 5)}
                            </td>
                            <td>
                              <img
                                src={product.image}
                                alt=""
                                width="50"
                                height="50"
                              />
                            </td>
                            <td>{product.name}</td>
                            <td>&#8377; {product.price.toFixed(2)}</td>
                            <td>{product.quantity} Kg</td>
                            <td width="20%">
                              <Link
                                to={`/products/${product._id}`}
                                className="btn btn-secondary btn-sm"
                              >
                                Update
                              </Link>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={clickDeleteProduct.bind(
                                  this,
                                  product._id
                                )}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="6" className="text-danger">
                          ------ NO Products Found ---------
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default ProductAdmin;
