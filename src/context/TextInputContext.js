import { createContext, useReducer } from "react";
import textInputReducer from "./TextInputReducer";

const TextInputContext = createContext()

export const TextInputProvider = ({ children }) => {
    const initialState = {
        isLoading: false,
        copiableText: [
            { text: 'Click', id: 0, bullet: false },
            { text: 'to', id: 1, bullet: false },
            { text: 'Copy', id: 2, bullet: false },
        ],
        loadedInput: "",
        savedLists: [],
        uploadedPage: {},
    }
    const [state, dispatch] = useReducer(textInputReducer, initialState)

    return (
        <TextInputContext.Provider
            value ={{
                ...state,
                dispatch,
            }}
            >
                {children}
            </TextInputContext.Provider>
    )
}

export default TextInputContext