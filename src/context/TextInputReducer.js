const textInputReducer = (state, action) => {
    switch (action.type) {

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            }
        case 'SET_COPIABLE_TEXT':
            return {
                ...state,
                copiableText: action.payload,
            }
        case 'SET_LOADED_INPUT':
            return {
                ...state,
                loadedInput: action.payload,
            }

        default:
            return state
    }
}

export default textInputReducer