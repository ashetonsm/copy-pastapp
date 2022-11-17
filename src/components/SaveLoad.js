import { useState } from "react"
import { Button, Modal, Row } from "react-bootstrap"


export const SaveLoad = ({ currentList, functions }) => {

    const [showLoadModal, setShowLoadModal] = useState(false);
    const [showNameModal, setShowNameModal] = useState(false);
    const [savedLists, setSavedLists] = useState([])

    const [input, setInput] = useState({
        textInput: "",
    });

    // The name of the master list in localStorage
    const masterList = "Copy-Pastapp"


    const handleChange = (e) => {
        const { id, value } = e.target
        setInput((input) => ({
            ...input,
            [id]: value,
        }))
    }

    const saveToLocalStorage = () => {
        console.log("Saving...")
        savedLists.push({ name: input.textInput, content: currentList })
        // setSavedLists(lists => [...lists, { name: input.textInput, content: currentList }])

        window.localStorage.setItem(masterList, JSON.stringify(savedLists))
        console.log(savedLists)
    }

    const loadFromLocalStorage = () => {
        console.log("Loading...")

        var ml = window.localStorage.getItem(masterList)

        if (ml !== null) {
            console.log("Loading complete.")
        } else {
            console.log("No lists to load!")
        }

    }

    function Saved() {
        var output = window.localStorage.getItem(masterList)

        if (output !== null) {
            output = JSON.parse(output)
            output = output.map((list, idx) =>

                <li key={idx}>
                    <Button
                        value={JSON.stringify(list.content)}
                        onClick={(e) => {
                            var newList = JSON.parse(e.currentTarget.value)
                            functions.setCopiableText(newList)
                            setShowLoadModal(false)
                        }}>
                        {list.name}
                    </Button>
                </li>
            )
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