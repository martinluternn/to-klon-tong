import Redux from 'redux';
import { Product } from '../models/Product';

export const LOADING: string = 'MAIN.LOADING';
export const IDLE: string = 'MAIN.IDLE';

export const SET_FLASH_MESSAGE = 'COMMONS.SET_FLASH_MESSAGE';
export const DELETE_FLASH_MESSAGE = 'COMMONS.DELETE_FLASH_MESSAGE';

export const GET_PRODUCTS: string = 'MAIN.GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS: string = 'MAIN.GET_PRODUCTS_SUCCESS';

export const GET_PRODUCT_BY_ID: string = 'MAIN.GET_PRODUCT_BY_ID';
export const GET_PRODUCT_BY_ID_SUCCESS: string = 'MAIN.GET_PRODUCT_BY_ID_SUCCESS';

export const ADD_PRODUCT: string = 'MAIN.ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS: string = 'MAIN.ADD_PRODUCT_SUCCESS';

export const SEARCH_PRODUCT: string = 'MAIN.SEARCH_PRODUCT';

export const setLoading: Redux.ActionCreator<Redux.AnyAction> = () => {
    return { type: LOADING };
};

export const setIdle: Redux.ActionCreator<Redux.AnyAction> = () => {
    return { type: IDLE };
};

export const setFlashMessage: Redux.ActionCreator<Redux.AnyAction> = (message: string) => {
    return { type: SET_FLASH_MESSAGE, payload: message };
};

export const deleteFlashMessage: Redux.ActionCreator<Redux.AnyAction> = () => {
    return { type: DELETE_FLASH_MESSAGE };
};

export const getProducts: Redux.ActionCreator<Redux.AnyAction> = (nextLoadData: boolean) => {
    return { type: GET_PRODUCTS, payload: nextLoadData };
};

export const getProductsSuccess: Redux.ActionCreator<Redux.AnyAction> = (response: Product[]) => {
    return { type: GET_PRODUCTS_SUCCESS, payload: response };
};

export const getProductByID: Redux.ActionCreator<Redux.AnyAction> = (id: String) => {
    return { type: GET_PRODUCT_BY_ID, payload: id };
};

export const getProductByIDSuccess: Redux.ActionCreator<Redux.AnyAction> = (response: Product) => {
    return { type: GET_PRODUCT_BY_ID_SUCCESS, payload: response };
};

export const addProduct: Redux.ActionCreator<Redux.AnyAction> = (product: Product) => {
    return { type: ADD_PRODUCT, payload: product };
};

export const addProductSuccess: Redux.ActionCreator<Redux.AnyAction> = () => {
    return { type: ADD_PRODUCT_SUCCESS };
};

export const searchProduct: Redux.ActionCreator<Redux.AnyAction> = (filteredProduct: Product[], keyword: string) => {
    return {
        type: SEARCH_PRODUCT, payload: {
            products: filteredProduct,
            keyword: keyword
        }
    };
};