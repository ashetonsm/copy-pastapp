import { createContext, useReducer } from "react";
import textInputReducer from "./TextInputReducer";

const TextInputContext = createContext()

export const TextInputProvider = ({ children }) => {
    const initialState = {
        isLoading: false,
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