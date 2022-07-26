import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { bigbasketFeatureKey } from "../../../redux/bigbasket/bigbasket.reducer";
import {
  getProduct,
  updateFormInput,
  updateProduct,
} from "../../../redux/bigbasket/bigbasket.actions";

let UpdateProduct = () => {
  let history = useHistory();
  let productID = useParams().productId;
  let dispatch = useDispatch();
  const productInfo = useSelector((state) => {
    return state[bigbasketFeatureKey];
  });
  let { loading, products, selectedProduct, errorMessage } = productInfo;

  useEffect(() => {
    dispatch(getProduct(productID));
  }, [productID]);

  let updateInput = (event) => {
    dispatch(updateFormInput(event.target.name, event.target.value));
  };

  // updateImage
  let updateImage = async (event) => {
    let { target } = event;
    let imageFile = target.files[0];
    let base64Image = await convertBase64String(imageFile);
    dispatch(updateFormInput(target.name, base64Image));
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

  let submitUpdateProduct = (e) => {
    e.preventDefault();
    dispatch(updateProduct(productID, selectedProduct, history));
  };

  return (
    <>
      <section className="p-3">
        <div className="container">
          <div className="row animated zoomIn">
            <div className="col">
              <p className="h3 text-secondary">Update selectedProduct</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Doloremque expedita fuga itaque modi nostrum numquam quis
                ratione repudiandae sint tempore. Alias dolor eaque error
                expedita libero nobis possimus rerum totam.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <pre>{JSON.stringify(selectedProduct)}</pre> */}
      {Object.keys(selectedProduct).length > 0 && (
        <section className="">
          <div className="container">
            <div className="row animated flipInX">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header bg-secondary text-white">
                    <p className="h4">Update selectedProduct</p>
                  </div>
                  <div className="card-body rgba-purple-light">
                    <form onSubmit={submitUpdateProduct}>
                      <div className="form-group">
                        <input
                          required
                          name="name"
                          value={selectedProduct.name}
                          onChange={updateInput}
                          type="text"
                          className="form-control"
                          placeholder="Name"
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-file">
                          <input
                            name="image"
                            onChange={updateImage}
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile"
                          >
                            {selectedProduct.image != "" ? (
                              <img
                                src={selectedProduct.image}
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
                          value={selectedProduct.price}
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
                          value={selectedProduct.quantity}
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
                          value={selectedProduct.info}
                          onChange={updateInput}
                          rows="3"
                          className="form-control"
                          placeholder="Info"
                        />
                      </div>
                      <div>
                        <input
                          type="submit"
                          className="btn btn-sm btn-secondary"
                          value="Update"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default UpdateProduct;
