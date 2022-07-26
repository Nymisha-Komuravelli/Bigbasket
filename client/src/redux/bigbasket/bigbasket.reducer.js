import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_INPUT
} from "./bigbasket.actions";

export const bigbasketFeatureKey = "big-basket";

let initialState = {
  loading: false,
  products: [],
  selectedProduct: {},
  errorMessage: "",
};

export const bigbasketReducer = (state = initialState, action) => {
  let { type, payload } = action;
  let { loading, products, selectedProduct, errorMessage } = state;
  switch (type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload,
      };
    case GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    case GET_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProduct: payload
      };
    case GET_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        // selectedProduct: payload
      };
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        // selectedProduct: payload
      };
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    case UPDATE_INPUT: 
      return {
        ...state,
        selectedProduct: {
          ...selectedProduct,
          [payload.key]: payload.value
        }
      }
    default:
      return initialState;
  }
};
