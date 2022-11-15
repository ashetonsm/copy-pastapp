import { useState } from "react"
import { Button, Modal, Row } from "react-bootstrap"


export const SaveLoad = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Row className="row justify-content-md-center">

                <Button value="save"
                    onClick={(e) => console.log("Saving...")}
                    style={{ width: 'inherit', margin: "1em" }}
                >
                    Save
                </Button>
                <Button value="load"
                    onClick={() => {
                        handleShow()
                        console.log("Loading...")
                    }}
                    style={{ width: 'inherit', margin: "1em" }}
                >
                    Load
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Row>
        </>
    )
}