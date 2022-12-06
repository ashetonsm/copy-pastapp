const textInputReducer = (state, action) => {
    switch (action.type) {

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            }

        default:
            return state
    }
}

export default textInputReducer