import { useContext, useEffect } from 'react'

import TextInputContext from "../context/TextInputContext"

export const ReadTXT = ({ file }) => {

    const { dispatch } = useContext(TextInputContext)

    useEffect(() => {
        const fileReader = new FileReader()
        fileReader.readAsText(file)
        fileReader.onload = () => {
            var rawText = fileReader.result
            return dispatch({ type: 'SET_LOADED_INPUT', payload: rawText })
        }

    }, [file, dispatch])
}