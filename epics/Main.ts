import { Action, AnyAction } from 'redux';
import { ActionsObservable, Epic, ofType, StateObservable } from 'redux-observable';
import { of } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { catchError, mergeMap } from 'rxjs/operators';
import {
    addProductSuccess,
    ADD_PRODUCT,
    getProductByIDSuccess,
    getProducts,
    getProductsSuccess,
    GET_PRODUCTS,
    GET_PRODUCT_BY_ID,
    setFlashMessage,
    setIdle
} from '../actions/Main';
import { AppState } from '../AppState';
import { Product } from '../models/Product';

const getProductsEpic: Epic<Action, AnyAction> = (
    action$: ActionsObservable<AnyAction>,
    state$: StateObservable<AppState>,
    { getApi },
) => {
    return action$.pipe(
        ofType(GET_PRODUCTS),
        mergeMap((action: AnyAction) => {
            return fromPromise(getApi().main.products()).pipe(
                mergeMap((result: any) => {
                    if (result.message) {
                        return of(setFlashMessage(result.message), setIdle());
                    } else {
                        return of(getProductsSuccess(result as Product[]), setIdle());
                    }
                }),
                catchError(error => {
                    return of(setFlashMessage(error.message), setIdle());
                }),
            );
        }),
    );
};

const getProductByIDEpic: Epic<Action, AnyAction> = (
    action$: ActionsObservable<AnyAction>,
    state$: StateObservable<AppState>,
    { getApi },
) => {
    return action$.pipe(
        ofType(GET_PRODUCT_BY_ID),
        mergeMap((action: AnyAction) => {
            return fromPromise(getApi().main.productByID(action.payload)).pipe(
                mergeMap((result: any) => {
                    if (result.message) {
                        return of(setFlashMessage(result.message), setIdle());
                    } else {
                        return of(getProductByIDSuccess(result as Product), setIdle());
                    }
                }),
                catchError(error => {
                    return of(setFlashMessage(error.message), setIdle());
                }),
            );
        }),
    );
};

const addProductEpic: Epic<Action, AnyAction> = (
    action$: ActionsObservable<AnyAction>,
    state$: StateObservable<AppState>,
    { getApi },
) => {
    return action$.pipe(
        ofType(ADD_PRODUCT),
        mergeMap((action: AnyAction) => {
            return fromPromise(getApi().main.addProduct(action.payload)).pipe(
                mergeMap((result: any) => {
                    if (result.message) {
                        return of(setFlashMessage(result.message), setIdle());
                    } else {
                        return of(addProductSuccess(), getProducts());
                    }
                }),
                catchError(error => {
                    return of(setFlashMessage(error.message), setIdle());
                }),
            );
        }),
    );
};

export default [
    getProductsEpic,
    getProductByIDEpic,
    addProductEpic
];