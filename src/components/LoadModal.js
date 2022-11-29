import { Button, Modal } from "react-bootstrap"

export const LoadModal = ({ functions, showLoadModal }) => {
    return (
        <Modal show={showLoadModal} onHide={() => functions.setShowLoadModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Load a Saved List:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {functions.Saved()}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => functions.setShowLoadModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}