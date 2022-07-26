import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/bigbasket/bigbasket.actions";
import { bigbasketFeatureKey } from "../../../redux/bigbasket/bigbasket.reducer";
import spinner from "../../../assets/images/spinner.gif";

let ProductList = () => {
  const dispatch = useDispatch();
  const productsInfo = useSelector((state) => {
    return state[bigbasketFeatureKey];
  });

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  let { loading, products, errorMessage } = productsInfo;

  return (
    <>
    {/* <pre>{products.length}</pre> */}
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col animated zoomIn">
              <p className="h3 text-success">Product List</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquam cum magnam maxime? Ad aliquam aspernatur autem eligendi
                error exercitationem impedit, ipsa laboriosam magnam nam
                nesciunt quam quas. Culpa, error, libero.
              </p>
            </div>
          </div>
        </div>
      </section>
      {
        loading ? <img src={spinner} alt="" className="d-block m-auto"/> : <section>
        {products.length > 0 ? (
          <>
            <div className="container animated zoomIn">
              <div className="row">
                {products.map((product) => {
                  return (
                    <div className="col-md-3" key={product._id}>
                      <div className="card mt-3">
                        <div className="card-header text-center bg-white">
                          <img
                            src={product.image}
                            alt=""
                            width="150"
                            height="150"
                          />
                        </div>
                        <div className="card-body">
                          <ul className="list-group">
                            <li className="list-group-item">
                              NAME : {product.name}
                            </li>
                            <li className="list-group-item">
                              Price : &#8377; {product.price.toFixed(2)}
                            </li>
                            <li className="list-group-item">
                              Qty : {product.quantity} Kg
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="h5 text-danger">
              ----------- NO Products Found --------
            </p>
          </>
        )}
      </section>
      }
      
    </>
  );
};
export default ProductList;
