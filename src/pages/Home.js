import { useState } from "react";
import { ButtonGroup, Col, Container, Row, ToggleButton } from "react-bootstrap";
import { TextInput } from "../components/TextInput";

export const Home = () => {

    const [radioValue, setRadioValue] = useState(0)
    const [copyValue, setCopyValue] = useState(0)
    const [copiableText, updateCopiableText] = useState([

        { text: 'Click', value: 0, bullet: false },
        { text: 'to', value: 1, bullet: false },
        { text: 'Copy', value: 2, bullet: false },

    ])

    const updateFromPaste = (inputObj) => {
        setCopyValue(0)
        updateCopiableText(applyFormatting(radioValue, inputObj))
    }

    const removeElement = (elementValue) => {
        const newArray = copiableText.filter((elem) => elem.value !== parseInt(elementValue))
        updateCopiableText(newArray)
    }

    const copyText = (newText) => {
        return (
            navigator.clipboard
                .writeText(newText)
                .then(() => (document.querySelector("#currentText").innerText = newText))
        )
    }

    function CopyOptions() {
        var output = copiableText.map((radio, idx) =>

            <p key={radio.value}>
                <span onClick={() => removeElement(radio.value)}>❌</span>
                <ToggleButton
                    id={`radio-${idx}`}
                    type="checkbox"
                    name="radio"
                    value={radio.value}
                    checked={copyValue === radio.value}
                    onChange={(e) => {
                        setCopyValue(parseInt(e.currentTarget.value))
                        copyText(radio.text)
                    }}
                >
                    {radio.text}
                </ToggleButton>
            </p>
        )
        return (
            <Col>
                <ButtonGroup vertical>
                    {output}
                </ButtonGroup>
            </Col>
        )
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

            <Container>
                {/* Centered title */}
                <Row className="row justify-content-md-center">
                    <Col className="col-lg-auto">
                        <h1 style={{ textAlign: 'center' }}>Copy-Pastapp</h1>
                        <h2 style={{ textAlign: 'center' }}>(Because resume parsers aren't always accurate)</h2>
                    </Col>
                </Row>

                <hr></hr>

                <Row className="row justify-content-md-center">
                    <Col className="col-lg-auto">
                        <fieldset>
                            <legend>Formatting Options:</legend>

                            <div>
                                <input type="radio" id="original" name="formattingOption"
                                    value={0}
                                    onInput={(e) => {
                                        setRadioValue(parseInt(e.currentTarget.value))
                                    }} />
                                <label htmlFor="original">Original/None</label>
                            </div>

                            <div>
                                <input type="radio" id="addBullets" name="formattingOption"
                                    value={1}
                                    onInput={(e) => {
                                        setRadioValue(parseInt(e.currentTarget.value))
                                    }} />
                                <label htmlFor="addBullets">Add Bullets</label>
                            </div>

                            <div>
                                <input type="radio" id="removeBullets" name="formattingOption"
                                    value={2}
                                    onInput={(e) => {
                                        setRadioValue(parseInt(e.currentTarget.value))
                                    }} />
                                <label htmlFor="removeBullets">Remove Bullets</label>
                            </div>
                        </fieldset>
                    </Col>
                </Row>

                {/* Text Input Area */}
                <Row className="row justify-content-md-center">
                    <Col className="col-lg-auto">

                        <TextInput updateFromPaste={updateFromPaste} />
                    </Col>
                </Row>
                <Row className="row justify-content-md-center">
                    <Col className="col-lg-auto">

                        <h3 id="currentText">This is the currently copied text...</h3>
                    </Col>
                </Row>
            </Container>

            {/* Results */}
            <Container fluid="lg" className="overflow-auto" style={{ height: '50vh' }}>

                <Row className="row justify-content-lg-center">
                    <CopyOptions />
                </Row>
            </Container>

        </Container>
    )
}