import { ReducerWrapper } from 'redux-wrapper-extended';
import {
    LOADING, IDLE,
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    GET_PRODUCT_BY_ID,
    GET_PRODUCT_BY_ID_SUCCESS,
    SET_FLASH_MESSAGE,
    DELETE_FLASH_MESSAGE,
    SEARCH_PRODUCT,
} from '../actions/Main';
import { Product } from '../models/Product';

export interface MainState {
    isLoading: boolean;
    flashMessage: string;
    products: Product[];
    selectedProduct: Product | undefined;
    selectedID: string,
    addedProduct: Product | undefined;
    keyword: string;
    defaultProducts: Product[]
}

const initialState: MainState = {
    isLoading: false,
    flashMessage: '',
    products: [],
    defaultProducts: [],
    selectedProduct: undefined,
    selectedID: "",
    addedProduct: undefined,
    keyword: ''
};

const mainReducerWrapper = new ReducerWrapper<MainState>(initialState)
    .addHandler(LOADING, (state: MainState) => {
        return {
            ...state,
            isLoading: true,
        };
    })
    .addHandler(IDLE, (state: MainState) => {
        return {
            ...state,
            isLoading: false,
        };
    })
    .addHandler(SET_FLASH_MESSAGE, (state: MainState, message: string) => {
        return {
            ...state,
            flashMessage: message,
        };
    })
    .addHandler(DELETE_FLASH_MESSAGE, (state: MainState) => {
        return {
            ...state,
            flashMessage: '',
        };
    })
    .addHandler(GET_PRODUCTS_SUCCESS, (state: MainState, payload) => {
        return {
            ...state,
            isLoading: false,
            defaultProducts: [
                ...state.defaultProducts.slice(0, 0),
                ...payload,
            ],
            products: [
                ...state.products.slice(0, 0),
                ...payload,
            ],
        };
    })
    .addHandler(GET_PRODUCTS, (state: MainState, payload) => {
        return {
            ...state,
            isLoading: true,
        };
    })
    .addHandler(GET_PRODUCT_BY_ID_SUCCESS, (state: MainState, payload) => {
        return {
            ...state,
            isLoading: false,
            selectedProduct: payload,
        };
    })
    .addHandler(GET_PRODUCT_BY_ID, (state: MainState, payload) => {
        return {
            ...state,
            isLoading: true,
            selectedID: payload
        };
    })
    .addHandler(ADD_PRODUCT_SUCCESS, (state: MainState) => {
        return {
            ...state,
            isLoading: false,
        };
    })
    .addHandler(ADD_PRODUCT, (state: MainState, payload) => {
        return {
            ...state,
            isLoading: true,
            addedProduct: payload
        };
    })
    .addHandler(SEARCH_PRODUCT, (state: MainState, payload) => {
        return {
            ...state,
            isLoading: false,
            products: [
                ...state.products.slice(0, 0),
                ...payload.products,
            ],
            keyword: payload.keyword
        };
    });

export default mainReducerWrapper.getReducer();
