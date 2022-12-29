import {createAction, props} from "@ngrx/store";

export const SHARED_LOADING_ACTION = '[shared state] set loading spinner'
export const SET_ERROR_MESSAGE = '[shared state] set error message'
export const setLoadingSpinner = createAction(SHARED_LOADING_ACTION, props<{ status: boolean }>())
export const setErrorMessage = createAction(SET_ERROR_MESSAGE, props<{ message: string }>())
