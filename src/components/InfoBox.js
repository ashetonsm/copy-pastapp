import { Alert, Button, Modal } from "react-bootstrap"

export const InfoBox = (props) => {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    How to Use:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Text only:</p>
                <ol>
                    <li>Click "Show/Hide Input"</li>
                    <li>Type or paste into the text box</li>
                    <li>Click "Copyify!"</li>
                    <li>Click on an item to copy the text!</li>
                </ol>
                <p>File upload:</p>
                <ol>
                    <li>Click "Show/Hide Input"</li>
                    <li>Upload a .txt or .pdf file</li>
                    <li>Click "Upload"</li>
                    <li>Click "Copyify!"</li>
                    <li>Click on an item to copy the text!</li>
                </ol>
                <Alert>Tip: Drag items onto each other to combine them!</Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>


    )
}