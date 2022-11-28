import { useEffect, useState } from "react"
import { Button, Modal, Row } from "react-bootstrap"


export const SaveLoad = ({ currentList, functions }) => {

    const [showLoadModal, setShowLoadModal] = useState(false)
    const [showNameModal, setShowNameModal] = useState(false)
    const [nameInUse, setNameInUse] = useState(false)
    var savedLists = []

    const [input, setInput] = useState({
        textInput: "",
    });

    // The name of the master list in localStorage
    const masterList = "Copy-Pastapp"

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

    const concatLoadedInput = (inputList) => {
        var concatList = ""

        inputList.forEach(item => {
            concatList = concatList.concat(item.text + "\n")
        })
        functions.setLoadedInput(concatList)
    }

    const saveToLocalStorage = (paramOverwrite) => {
        console.log("Saving...")

        // Create our new string object
        var newItem = { name: input.textInput, content: currentList }

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
                    return console.log("Name already used!")
                } else {
                    console.log("Name is free.")
                    setNameInUse(false)
                    setShowNameModal(false)
                }
            }

            if (!nameInUse) {
                mlObj.push(newItem)
                window.localStorage.setItem(masterList, JSON.stringify(mlObj))
                setNameInUse(false)
                setShowNameModal(false)
            }

            if (paramOverwrite === true) {
                mlObj = mlObj.filter(e => e.name !== newItem.name)
                mlObj.push(newItem)
                window.localStorage.setItem(masterList, JSON.stringify(mlObj))
                setNameInUse(false)
                setShowNameModal(false)
            }
        } else {
            // List is blank, add the new item
            window.localStorage.setItem(masterList, JSON.stringify(newItem))
            setShowNameModal(false)
        }
    }

    const removeSaved = (oldObj) => {

        console.log("Checking localStorage...")
        savedLists = []

        var lists = JSON.parse(window.localStorage.getItem(masterList))

        if (lists.length > 1) {
            lists.forEach(list => {
                if (!savedLists.includes(list)) {
                    savedLists.push({ name: list.name, content: list.content })
                }
            })
        } else {
            savedLists.push({ name: lists.name, content: lists.content })
        }

        // Mutate savedLists, filtering out the old object by name
        savedLists = savedLists.filter((elem) => elem.name !== oldObj.name)

        // More than one list object, stringify them all
        if (savedLists.length > 1) {
            window.localStorage.setItem(masterList, JSON.stringify(savedLists))
        }
        // Just one list object, stringify the first one
        if (savedLists.length === 1) {
            window.localStorage.setItem(masterList, JSON.stringify(savedLists[0]))
        }
        // No more list objects, delete the localStorage entry
        if (savedLists.length === 0) {
            window.localStorage.removeItem(masterList)
        }
    }

    const loadFromLocalStorage = () => {
        console.log("Loading from localStorage...")

        var ml = window.localStorage.getItem(masterList)

        if (ml !== null) {
            savedLists = []
            var lists = JSON.parse(ml)

            if (lists.length > 1) {
                lists.forEach(list => {

                    if (!savedLists.includes(list)) {
                        savedLists.push({ name: list.name, content: list.content })
                    }
                })
            } else {
                savedLists.push({ name: lists.name, content: lists.content })
            }

            console.log("Loading complete.")
        } else {
            console.log("No lists to load!")
        }
    }

    function Saved() {
        var data = window.localStorage.getItem(masterList)
        var output

        if (data !== null) {
            output = JSON.parse(data)

            if (output.length > 1) {

                output = output.map((list, idx) =>

                    <li key={idx}>
                        <Button
                            value={JSON.stringify(list.content)}
                            onClick={(e) => {
                                var newList = JSON.parse(e.currentTarget.value)
                                functions.setCopiableText(newList)
                                concatLoadedInput(list.content)
                                setShowLoadModal(false)
                            }}>
                            {list.name}
                        </Button>
                        <span onClick={() => {
                            removeSaved(list)
                            setShowLoadModal(false)
                        }} style={{ marginLeft: "1em", cursor: "default" }}>❌</span>
                    </li>
                )
            } else {
                // Output for a singular list from master list
                const list = JSON.parse(data)
                output = (
                    <li>
                        <Button
                            value={JSON.stringify(list.content)}
                            onClick={(e) => {
                                var newList = JSON.parse(e.currentTarget.value)
                                functions.setCopiableText(newList)
                                concatLoadedInput(list.content)
                                setShowLoadModal(false)
                            }}>
                            {list.name}
                        </Button>
                        <span onClick={() => {
                            removeSaved(list)
                            setShowLoadModal(false)
                        }} style={{ marginLeft: "1em", cursor: "default" }}>❌</span>
                    </li>
                )
            }
        }

        return (
            <ol>
                {data !== null ? output : <p>No saved lists found!</p>}
            </ol>
        )
    }

    return (
        <Row className="row justify-content-md-center">
            <Button value="save"
                onClick={(e) => {
                    setShowNameModal(true)
                }}
                style={{ width: 'inherit', margin: "1em" }}
            >
                Save
            </Button>
            <Button value="load"
                onClick={() => {
                    setShowLoadModal(true)
                    loadFromLocalStorage()
                }}
                style={{ width: 'inherit', margin: "1em" }}
            >
                Load
            </Button>

            <Modal show={showLoadModal} onHide={() => setShowLoadModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Load a Saved List:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Saved />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLoadModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showNameModal} onHide={() => setShowNameModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Please Name Your List:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text"
                        id="textInput"
                        onChange={handleChange} />
                    <p style={{ visibility: nameInUse ? 'visible' : 'hidden' }}>
                        Click "Overwrite" to overwrite your existing list.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{ visibility: nameInUse ? 'visible' : 'hidden' }}
                        variant="danger"
                        onClick={() => {
                            saveToLocalStorage(true)
                        }}>
                        Overwite
                    </Button>
                    <Button
                        style={{ display: !nameInUse ? 'block' : 'none' }}
                        variant="primary" onClick={() => {
                            saveToLocalStorage()
                        }}>
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={() => {
                        setNameInUse(false)
                        setShowNameModal(false)
                    }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Row>
    )
}