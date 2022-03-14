import { TEST } from "../actions";

const initialState = {
    isTesting: false,
};

export const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST:
            return {
                ...state,
                isTesting: action.payload,
            }

        default:
            return state;
    }
};