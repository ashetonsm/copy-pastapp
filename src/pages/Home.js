import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Offcanvas } from "react-bootstrap";
import { CopiableText } from "../components/CopiableText";
import { FileUpload } from "../components/FileUpload";
import { FormattingOptions } from "../components/FormattingOptions";
import { InfoBox } from "../components/InfoBox";
import { SaveLoad } from "../components/SaveLoad";
import { TextInput } from "../components/TextInput";
import TextInputContext from "../context/TextInputContext";

export const Home = () => {

    const { dispatch } = useContext(TextInputContext)

    const [selectedValue, setSelectedValue] = useState(0)
    const [copyValue, setCopyValue] = useState(0)
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleOffcanvas = (toggle) => setShowOffcanvas(toggle);

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
            <Row className="justify-content-md-center">
                <Col className="col-auto mb-2">
                    <h1 style={{ textAlign: 'center' }}>Copy-Pastapply</h1>
                    <h4 style={{ textAlign: 'center', fontWeight: 'normal' }}>
                        (Because resume parsers aren't always accurate)
                    </h4>
                    <InfoBox />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Button
                    className="mx-auto mb-1"
                    onClick={() => handleOffcanvas(true)}
                    style={{ width: 'inherit' }}
                    variant="info"
                >
                    Show/Hide Input
                </Button>
            </Row>
            <SaveLoad />

            <hr></hr>

            {/* Results */}
            <Row className="justify-content-md-center">
                <Col className="col-lg-auto">
                    <h3 id="currentText">Copy-Pastapply</h3>
                </Col>
                <CopiableText functions={{ setCopyValue }} copyValue={copyValue} />
            </Row>

            <Offcanvas show={showOffcanvas} onHide={() => handleOffcanvas(false)}>
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* Text Input Area */}
                    <Row className="justify-content-md-center">
                        <Col className="col-lg-auto">
                            <TextInput updateFromPaste={updateFromPaste} />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col className="col-lg-auto">
                            <FileUpload />
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col className="col-lg-auto">
                            <FormattingOptions functions={{ setSelectedValue }} />
                        </Col>
                    </Row>

                </Offcanvas.Body>
            </Offcanvas>

        </Container>
    )
}