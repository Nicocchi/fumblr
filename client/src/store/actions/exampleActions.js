export const TEST = "TEST";

export const testFunc = (props) => {
    return async (dispatch) => {
        dispatch({ type: TEST, payload: props });
    };
};