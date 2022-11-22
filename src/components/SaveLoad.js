import { useEffect, useState } from "react"
import { Button, Modal, Row } from "react-bootstrap"


export const SaveLoad = ({ currentList, functions }) => {

    const [showLoadModal, setShowLoadModal] = useState(false);
    const [showNameModal, setShowNameModal] = useState(false);
    var savedLists = []

    const [input, setInput] = useState({
        textInput: "",
    });

    // The name of the master list in localStorage
    const masterList = "Copy-Pastapp"

    useEffect(() => {
        loadFromLocalStorage()
        console.log("Current lists:")
        console.log(savedLists)
    }, [])


    const handleChange = (e) => {
        const { id, value } = e.target
        setInput((input) => ({
            ...input,
            [id]: value,
        }))
    }

    const saveToLocalStorage = () => {
        console.log("Saving...")

        // Create our new string object
        var newItem = { name: input.textInput, content: currentList }

        // Get the master list
        var ml = window.localStorage.getItem(masterList)

        // Create an obj for storing master list
        var mlObj = []

        // Use the ml string as the base if it exists
        if (ml !== null) {
            console.log("Something is the master list:")
            console.log(JSON.parse(ml))

            // More than one item
            if (JSON.parse(ml).length > 1) {
                JSON.parse(ml).forEach(item => {
                    mlObj.push(item)
                });
            } else {
                // Just one item
                mlObj.push(JSON.parse(ml))
            }
            
            console.log("After pushing existing ml, this is mlObj:")
            console.log(mlObj)

            mlObj.push(newItem)

            console.log("After pushing newItem, this is mlObj:")
            console.log(mlObj)

            window.localStorage.setItem(masterList, JSON.stringify(mlObj))
        } else {
            // List is blank, add the new item
            console.log("Nothing on the master list")
            window.localStorage.setItem(masterList, JSON.stringify(newItem))
        }
    }

    const loadFromLocalStorage = () => {
        console.log("Loading from localStorage...")
        savedLists = []

        var ml = window.localStorage.getItem(masterList)

        if (ml !== null) {
            var lists = JSON.parse(ml)

            if (lists.length > 1) {
                lists.forEach(list => {
                    if (!savedLists.includes(list)) {
                        savedLists.push({ name: list.name, content: list.content })
                    }
                })
            } else {
                savedLists.push({ name: lists.name, content: lists.content })
                console.log(savedLists)

            }

            console.log("Loading complete.")
        } else {
            console.log("No lists to load!")
        }

    }

    function Saved() {
        var output = window.localStorage.getItem(masterList)

        if (output !== null) {
            output = JSON.parse(output)

            if (output.length > 1) {

                output = output.map((list, idx) =>

                    <li key={idx}>
                        <Button
                            value={JSON.stringify(list.content)}
                            onClick={(e) => {
                                var newList = JSON.parse(e.currentTarget.value)
                                functions.setCopiableText(newList)
                                setShowLoadModal(false)

                                var concatList = ""

                                list.content.forEach(item => {
                                    concatList = concatList.concat(item.text + "\n")
                                });
                                functions.setLoadedInput(concatList)
                            }}>
                            {list.name}
                        </Button>
                    </li>
                )
            } else {
                output = (

                    <li>
                        <Button
                            value={JSON.stringify(output.content)}
                            onClick={(e) => {
                                var newList = JSON.parse(e.currentTarget.value)
                                functions.setCopiableText(newList)
                                setShowLoadModal(false)
                            }}>
                            {output.name}
                        </Button>
                    </li>
                )
            }

        }


        return (
            <ol>
                {output !== null ? output : <p>No saved lists found!</p>}
            </ol>
        )
    }

    return (
        <>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            saveToLocalStorage()
                            setShowNameModal(false)
                        }}>
                            Submit
                        </Button>
                        <Button variant="secondary" onClick={() => setShowNameModal(false)}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Row>
        </>
    )
}