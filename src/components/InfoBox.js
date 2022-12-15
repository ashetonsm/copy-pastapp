import { Accordion, Alert, Row } from "react-bootstrap"

export const InfoBox = () => {

    return (

        <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>How to Use:</Accordion.Header>
                <Accordion.Body>
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
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}