import { useContext, useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { CopiableText } from "../components/CopiableText";
import { FileUpload } from "../components/FileUpload";
import { FormattingOptions } from "../components/FormattingOptions";
import { SaveLoad } from "../components/SaveLoad";
import { TextInput } from "../components/TextInput";
import TextInputContext from "../context/TextInputContext";

export const Home = () => {

    const { dispatch } = useContext(TextInputContext)

    const [selectedValue, setSelectedValue] = useState(0)
    const [copyValue, setCopyValue] = useState(0)

    // For testing purposes
    useEffect(() => {

        dispatch({ type: 'SET_LOADING', payload: true })

    }, [dispatch])


    const updateFromPaste = (inputObj) => {
        setCopyValue(0)
        dispatch({ type: 'SET_COPIABLE_TEXT', payload: applyFormatting(selectedValue, inputObj) })
    }

    const applyFormatting = (optionNum, inputObj) => {

        switch (optionNum) {
            case 0:
                return inputObj;

            case 1:
                const bullet = "•	"

                inputObj.forEach(element => {
                    if (element.bullet === false) {
                        const newText = bullet.concat(element.text)
                        element.text = newText
                        element.bullet = true
                    }
                })

                return inputObj;

            case 2:
                const bullets = new RegExp('(?:^(o|\u2022|\u2023|\u25E6|\u2043|\u2219|\u25CB|\u25CF|\u002D|\u2013)\\s)', 'gu')

                inputObj.forEach(element => {
                    if (element.bullet === true) {
                        const newText = element.text.split(bullets)[2]
                        element.text = newText
                        element.bullet = false
                    }
                })

                return inputObj;

            default:
                return inputObj;
        }
    }

    return (
        <Container>
            {/* Centered title */}
            <Row className="row justify-content-md-center">
                <Col className="col-lg-auto">
                    <h1 style={{ textAlign: 'center' }}>Copy-Pastapply</h1>
                    <h4 style={{ textAlign: 'center', fontWeight: 'normal' }}>
                        (Because resume parsers aren't always accurate)
                    </h4>
                    <p style={{ fontWeight: 'bold' }}>How to use:</p>
                    <ol>
                        <li>Paste your resume into the text box</li>
                        <li>Click "Copyify!"</li>
                        <li>Click on an item to copy the text!</li>
                    </ol>
                    <Alert>Tip: Drag items onto each other to combine them!</Alert>
                </Col>
            </Row>

            <SaveLoad />

            <hr></hr>

            <Row className="row justify-content-md-center">
                <Col className="col-lg-auto">
                    <FormattingOptions functions={{ setSelectedValue }} />
                </Col>
            </Row>

            {/* Text Input Area */}
            <Row className="row justify-content-md-center">
                <Col className="col-lg-auto">
                    <TextInput updateFromPaste={updateFromPaste} />
                    <FileUpload />
                </Col>
            </Row>
            <Row className="row justify-content-md-center">
                <Col className="col-lg-auto">
                    <h3 id="currentText">Copy-Pastapply</h3>
                </Col>
            </Row>

            {/* Results */}
            <CopiableText functions={{ setCopyValue }} copyValue={copyValue} />
        </Container>
    )
}