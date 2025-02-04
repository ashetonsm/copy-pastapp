import { useContext, useEffect, useState } from "react"
import { Button, Row } from "react-bootstrap"
import TextInputContext from "../context/TextInputContext"
import { ConcatArray } from "../utilities/ConcatArray"
import { LoadModal } from "./LoadModal"
import { NameModal } from "./NameModal"


export const SaveLoad = () => {

    // Where "currentList" is now copiableText
    const { dispatch, savedLists, copiableText } = useContext(TextInputContext)

    const [showLoadModal, setShowLoadModal] = useState(false)
    const [showNameModal, setShowNameModal] = useState(false)
    const [nameInUse, setNameInUse] = useState(false)

    const [input, setInput] = useState({
        textInput: "",
    });

    // The name of the master list in localStorage
    const masterList = "Copy-Pastapply"

    useEffect(() => {
        loadFromLocalStorage()
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        const { id, value } = e.target
        setInput((input) => ({
            ...input,
            [id]: value,
        }))
    }

    const saveToLocalStorage = (paramOverwrite) => {
        const whitespace = new RegExp('\\S+', 'g')

        if (!input.textInput.match(whitespace)) {
            return alert("Name cannot be blank.")
        } else {
            // Create our new string object
            var newItem = { name: input.textInput, content: copiableText }

            // Get the master list
            var ml = window.localStorage.getItem(masterList)

            // Create an obj for storing master list
            var mlObj = []

            // Use the ml string as the base if it exists
            if (ml !== null) {

                // More than one item
                if (JSON.parse(ml).length > 1) {
                    JSON.parse(ml).forEach(item => {
                        mlObj.push(item)
                    });
                } else {
                    // Just one item
                    mlObj.push(JSON.parse(ml))
                }

                if (paramOverwrite !== true) {
                    // Check if the name exists if we haven't already done so and given permission to overwrite
                    var checkObj = mlObj
                    if (checkObj.filter(e => e.name === newItem.name).length > 0) {
                        setNameInUse(true)
                        return console.log("Name is in use!")
                    } else {
                        setNameInUse(false)
                        setShowNameModal(false)
                    }
                }

                if (!nameInUse) {
                    mlObj.push(newItem)
                    window.localStorage.setItem(masterList, JSON.stringify(mlObj))
                    dispatch({ type: 'SET_SAVED_LISTS', payload: mlObj })
                    setNameInUse(false)
                    setShowNameModal(false)
                }

                if (paramOverwrite === true) {
                    if (JSON.parse(ml).length > 1) {
                        mlObj = mlObj.filter(e => e.name !== newItem.name)
                        mlObj.push(newItem)
                        window.localStorage.setItem(masterList, JSON.stringify(mlObj))
                        dispatch({ type: 'SET_SAVED_LISTS', payload: mlObj })
                    } else {
                        window.localStorage.setItem(masterList, JSON.stringify(newItem))
                        dispatch({ type: 'SET_SAVED_LISTS', payload: newItem })
                    }
                    setNameInUse(false)
                    setShowNameModal(false)
                }

            } else {
                // List is blank, add the new item
                window.localStorage.setItem(masterList, JSON.stringify(newItem))
                dispatch({ type: 'SET_SAVED_LISTS', payload: newItem })
                setShowNameModal(false)
            }
        }
    }

    const removeSaved = (oldObj) => {
        // Mutate savedLists, filtering out the old object by name
        var newlist = Array.from(savedLists).filter((elem) => elem.name !== oldObj.name)
        dispatch({ type: 'SET_SAVED_LISTS', payload: newlist })

        // More than one list object, stringify them all
        if (newlist.length > 1) {
            window.localStorage.setItem(masterList, JSON.stringify(newlist))
        }
        // Just one list object, stringify the first one
        if (newlist.length === 1) {
            window.localStorage.setItem(masterList, JSON.stringify(newlist[0]))
        }
        // No more list objects, delete the localStorage entry
        if (newlist.length === 0) {
            window.localStorage.removeItem(masterList)
        }
    }

    const loadFromLocalStorage = () => {
        var ml = window.localStorage.getItem(masterList)

        if (ml !== null) {
            var lists = JSON.parse(ml)

            if (lists.length > 1) {
                dispatch({ type: 'SET_SAVED_LISTS', payload: lists })
            } else {
                dispatch({ type: 'SET_SAVED_LISTS', payload: { name: lists.name, content: lists.content } })
            }
        }
    }

    function Saved() {
        var data = window.localStorage.getItem(masterList)
        var output

        if (data !== null) {
            output = JSON.parse(data)

            if (output.length > 1) {

                output = output.map((list, idx) =>

                    <li key={idx} className="mb-2 flex-grow-1">
                        <Button
                            value={JSON.stringify(list.content)}
                            onClick={(e) => {
                                var newList = JSON.parse(e.currentTarget.value)
                                dispatch({ type: 'SET_COPIABLE_TEXT', payload: newList })
                                dispatch({ type: 'SET_LOADED_INPUT', payload: ConcatArray(list.content) })
                                setShowLoadModal(false)
                            }}
                            style={{ maxWidth: '85%' }}>
                            {list.name}
                        </Button>
                        <span onClick={() => {
                            removeSaved(list)
                            setShowLoadModal(false)
                        }} style={{ marginLeft: "1em", cursor: 'pointer' }}>❌</span>
                    </li>
                )
            } else {
                // Output for a singular list from master list
                const list = JSON.parse(data)
                output = (
                    <li className="mb-2 flex-grow-1">
                        <Button
                            value={JSON.stringify(list.content)}
                            onClick={(e) => {
                                var newList = JSON.parse(e.currentTarget.value)
                                dispatch({ type: 'SET_COPIABLE_TEXT', payload: newList })
                                dispatch({ type: 'SET_LOADED_INPUT', payload: ConcatArray(list.content) })
                                setShowLoadModal(false)
                            }}
                            style={{ maxWidth: '85%' }}>
                            {list.name}
                        </Button>
                        <span onClick={() => {
                            removeSaved(list)
                            setShowLoadModal(false)
                        }} style={{ marginLeft: "1em", cursor: 'pointer' }}>❌</span>
                    </li>
                )
            }
        }

        return (
            <ol>
                {data !== null ? <div className="d-flex flex-column">{output}</div> : <p>No saved lists found!</p>}
            </ol>
        )
    }

    return (
        <>
            <Row className="justify-content-md-center gap-3">
                <Button value="save"
                    className="col-md-2"
                    onClick={(e) => {
                        setShowNameModal(true)
                    }}
                >
                    Save
                </Button>
                <Button value="load"
                    className="col-md-2"
                    onClick={() => {
                        setShowLoadModal(true)
                        loadFromLocalStorage()
                    }}
                >
                    Load
                </Button>
            </Row>

            <LoadModal
                functions={{ setShowLoadModal, Saved }}
                showLoadModal={showLoadModal} />

            <NameModal
                functions={{ setShowNameModal, setNameInUse }}
                saveToLocalStorage={saveToLocalStorage}
                nameInUse={nameInUse}
                showNameModal={showNameModal}
                handleChange={handleChange}
            />
        </>
    )
}