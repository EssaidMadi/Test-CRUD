import {
    PRODUCTS_CREATE_FAIL,
    PRODUCTS_CREATE_REQUEST,
    PRODUCTS_CREATE_SUCCESS,
    PRODUCTS_DELETE_FAIL,
    PRODUCTS_DELETE_REQUEST,
    PRODUCTS_DELETE_SUCCESS,
    PRODUCTS_LIST_FAIL,
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_UPDATE_FAIL,
    PRODUCTS_UPDATE_REQUEST,
    PRODUCTS_UPDATE_SUCCESS,
  } from "../constants/productsConstants";
  import axios from "axios";
  
  export const listProducts = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCTS_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "x-auth-token": userInfo,
        },
      };
    console.log(config)
  
      const { data } = await axios.get(`/api/phones`, config);
  
      dispatch({
        type: PRODUCTS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PRODUCTS_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  export const createProductAction = (name, type, price, rating, warranty_years, available) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: PRODUCTS_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          'x-auth-token': userInfo,
        },
      };
  
      const { data } = await axios.post(
        `/api/phone`,
        { name, type, price, rating, warranty_years, available },
        config
      );
  
      dispatch({
        type: PRODUCTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PRODUCTS_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  export const deleteProductAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCTS_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'x-auth-token': userInfo,
        },
      };
  
      const { data } = await axios.delete(`/api/phone/${id}`, config);
  
      dispatch({
        type: PRODUCTS_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PRODUCTS_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const updateProductAction = (id, name, type, price, rating, warranty_years, available) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: PRODUCTS_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          'x-auth-token': userInfo,
        },
      };
  
      const { data } = await axios.put(
        `/api/phone/${id}`,
        { name, type, price, rating, warranty_years, available },
        config
      );
  
      dispatch({
        type: PRODUCTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PRODUCTS_UPDATE_FAIL,
        payload: message,
      });
    }
  };