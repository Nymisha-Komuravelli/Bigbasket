import Axios from "axios";

export const GET_ALL_PRODUCTS_REQUEST = "GET_ALL_PRODUCTS_REQUEST";
export const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS";
export const GET_ALL_PRODUCTS_FAILURE = "GET_ALL_PRODUCTS_FAILURE";

export const GET_PRODUCT_REQUEST = "GET_PRODUCT_REQUEST";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_FAILURE = "GET_PRODUCT_FAILURE";

export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";

export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

export const UPDATE_INPUT = "UPDATE_INPUT";

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
      let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/products`;
      let response = await Axios.get(dataURL);
      dispatch({
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: response.data.products,
      });
    } catch (err) {
      dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: err });
    }
  };
};
export const createProduct = (product, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_PRODUCT_REQUEST });
      let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/products`;
      let response = await Axios.post(dataURL, product);
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: response.data });
      history.push("/products/admin");
    } catch (err) {
      dispatch({ type: CREATE_PRODUCT_FAILURE, payload: err });
    }
  };
};
export const getProduct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCT_REQUEST });
      let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/products/${productId}`;
      let response = await Axios.get(dataURL);
      dispatch({ type: GET_PRODUCT_SUCCESS, payload: response.data.product });
    } catch (err) {
      dispatch({ type: GET_PRODUCT_FAILURE, payload: err });
    }
  };
};
export const updateProduct = (productId, product, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
      let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/products/${productId}`;
      let response = await Axios.put(dataURL, product);
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: response.data.product,
      });
      history.push("/products/admin");
    } catch (err) {
      dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: err });
    }
  };
};
export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
      let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/products/${productId}`;
      let response = await Axios.delete(dataURL);
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: response.data });
      dispatch(getAllProducts());
    } catch (err) {
      dispatch({ type: DELETE_PRODUCT_FAILURE, payload: err });
    }
  };
};
export const updateFormInput = (key, value) => {
  return {
    type: UPDATE_INPUT,
    payload: { key, value },
  };
};
