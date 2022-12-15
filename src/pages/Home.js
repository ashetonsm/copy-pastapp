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
            <Row className="justify-content-center gap-3">
                <Col className="col-auto mb-2">
                    <h1 className="text-center">Copy-Pastapply</h1>
                    <InfoBox />
                </Col>
                <SaveLoad />
                <hr />
            </Row>
            <Row className="justify-content-center">
                {/* Left Column (upload and instructions) */}
                <Col className="col-auto">
                    {/* Text Input Area */}
                    <Row>
                        <TextInput updateFromPaste={updateFromPaste} />
                    </Row>
                    <Row>
                        <FileUpload />
                    </Row>
                    <Row>
                        <FormattingOptions functions={{ setSelectedValue }} />
                    </Row>
                </Col>

                {/* Right Column (results) */}
                <Col className="col-sm">
                    <CopiableText functions={{ setCopyValue }} copyValue={copyValue} />
                </Col>
            </Row>
        </Container>
    )
}