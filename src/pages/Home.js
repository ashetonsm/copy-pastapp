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
        console.log(inputObj)

        updateCopiableText(applyFormatting(radioValue, inputObj))

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
                console.log("No additional formatting")
                return inputObj;

            case 1:
                console.log("Add bullets")

                const bullet = "•	"

                const bulletedArray = []

                inputObj.forEach(element => {
                    if (element.bullet === false) {
                        const newText = bullet.concat(element.text)
                        element.text = newText
                        element.bullet = true
                    }

                    bulletedArray.push(element)
                })

                return bulletedArray;

            case 2:
                console.log("Remove bullets")
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
                        <h2 style={{ textAlign: 'center' }}>(Because auto-fill isn't always accurate)</h2>
                    </Col>
                </Row>

                <hr></hr>
                <Row className="row justify-content-md-center">
                    <Col className="col-lg-auto">
                        <fieldset>
                            <legend>Formatting Options:</legend>

                            <div>
                                <input type="radio" id="none" name="formattingOption"
                                    value={0}
                                    onInput={(e) => {
                                        setRadioValue(parseInt(e.currentTarget.value))
                                    }} />
                                <label htmlFor="none">None</label>
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