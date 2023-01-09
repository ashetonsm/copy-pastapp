import { Button, Modal } from "react-bootstrap"

export const NameModal = ({ functions, handleChange, saveToLocalStorage, showNameModal, nameInUse }) => {
    return (
        <Modal show={showNameModal} onHide={() => functions.setShowNameModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Please Name Your List:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-wrap">
                    <input type="text"
                        id="textInput"
                        onChange={handleChange}
                        className="flex-grow-1 px-2" />
                    <p style={{ visibility: nameInUse ? 'visible' : 'hidden' }}
                        className="flex-grow-1 px-1 mt-2">
                        Click "Overwrite" to overwrite your existing list.
                    </p>
                </div>
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
                    functions.setNameInUse(false)
                    functions.setShowNameModal(false)
                }}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}