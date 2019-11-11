import { SET_AUTH, SET_USER, LOADING_USER, SIGNUP_USER, CLEAR_USER, FORGOT_USER } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    signup: {
        isConfirmPage: false
    },
    forgot: {
        isConfirmPage: false
    }
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case SET_AUTH:
            return {
                ...state,
                authenticated: true,
                loading: false
            };
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case SIGNUP_USER:
            return {
                ...state,
                signup: {
                    isConfirmPage: true
                }
            };
        case FORGOT_USER:
            return {
                ...state,
                forgot: {
                    isConfirmPage: true
                }
            };
        case CLEAR_USER:
            return initialState;
        default:
            return state;
    }
}