import { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
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
    const [showInfoBox, setShowInfoBox] = useState(false)

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
        <>
            <span onClick={() => setShowInfoBox(true)}
                style={{
                    cursor: 'help',
                    position: 'sticky',
                    top: '2vh',
                    left: '95vw'
                }}>❔</span>
            <Container>
                <Row className="justify-content-center gap-3">
                    <div className="flex-grow-1 mb-2">
                        <h1 className="text-center display-6">Copy-Pastapply</h1>
                        <div className="text-center lead"
                            id="currentText"
                            style={{
                                height: '3em',
                                overflowY: 'auto',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex'
                            }}>
                            Click to copy!
                        </div>
                        <InfoBox show={showInfoBox} onHide={() => setShowInfoBox(false)} />
                    </div>
                    <SaveLoad />
                    <hr />
                </Row>
                <div className="d-flex flex-wrap">
                    {/* Left Column (upload and instructions) */}
                    <div className="flex-grow-1 px-2">
                        {/* Text Input Area */}
                        <FileUpload />
                        <TextInput updateFromPaste={updateFromPaste} />
                        <FormattingOptions functions={{ setSelectedValue }} />
                    </div>

                    {/* Right Column (results) */}
                    <div className="flex-shrink-1 w-50 px-2">
                        <CopiableText functions={{ setCopyValue }} copyValue={copyValue} />
                    </div>
                </div>
            </Container>
        </>

    )
}