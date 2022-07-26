import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../redux/bigbasket/bigbasket.actions";

let CreateProduct = () => {
  let history = useHistory();
  let dispatch = useDispatch();

  let [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    quantity: "",
    info: "",
  });

  let updateInput = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // updateImage
  let updateImage = async (event) => {
    let imageFile = event.target.files[0];
    let base64Image = await convertBase64String(imageFile);
    setProduct({
      ...product,
      image: base64Image,
    });
  };

  let convertBase64String = (imageFile) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.addEventListener("load", () => {
        if (fileReader.result) {
          resolve(fileReader.result);
        } else {
          reject("Error Occurred");
        }
      });
    });
  };

  let submitCreateProduct = (e) => {
    e.preventDefault();
    dispatch(createProduct(product, history));
  };
  /* 
  useEffect(() => {
      if(isSubmitted){
          history.push("/products/admin")
      }
  }, [isSubmitted]) */

  return (
    <>
      <>
        <section className="p-3">
          <div className="container">
            <div className="row animated zoomIn">
              <div className="col">
                <p className="h3 text-success">Create a Product</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consequuntur deserunt doloremque facilis laudantium minima nam
                  sunt, veritatis. Accusamus, architecto consectetur doloremque
                  ex facilis, numquam placeat, possimus repellendus soluta
                  voluptate voluptatum.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/*      <pre>{JSON.stringify(product)}</pre>*/}
        <section>
          <div className="container">
            <div className="row animated flipInX">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header bg-success text-white">
                    <p className="h4">Create Product</p>
                  </div>
                  <div className="card-body rgba-green-light">
                    <form onSubmit={submitCreateProduct}>
                      <div className="form-group">
                        <input
                          required
                          name="name"
                          value={product.name}
                          onChange={updateInput}
                          type="text"
                          className="form-control"
                          placeholder="Name"
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-file">
                          <input
                            required
                            onChange={updateImage}
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            {product.image.length > 0 ? (
                              <img
                                src={product.image}
                                alt=""
                                width="25"
                                height="25"
                              />
                            ) : (
                              "Product Image"
                            )}
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          required
                          name="price"
                          value={product.price}
                          onChange={updateInput}
                          type="text"
                          className="form-control"
                          placeholder="Price"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required
                          name="quantity"
                          value={product.quantity}
                          onChange={updateInput}
                          type="text"
                          className="form-control"
                          placeholder="Quantity"
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          required
                          name="info"
                          value={product.info}
                          onChange={updateInput}
                          rows="3"
                          className="form-control"
                          placeholder="Info"
                        />
                      </div>
                      <div>
                        <input
                          type="submit"
                          className="btn btn-sm btn-success"
                          value="Create"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
};
export default CreateProduct;
