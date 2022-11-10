import { useState } from "react";
import { ButtonGroup, Col, Container, Row, ToggleButton } from "react-bootstrap";
import { TextInput } from "../components/TextInput";

export const Home = () => {

    const [radioValue, setRadioValue] = useState(0)
    const [copiableText, updateCopiableText] = useState([

        { text: 'Click', value: 0 },
        { text: 'to', value: 1 },
        { text: 'Copy', value: 2 },

    ])

    const updateFromPaste = (inputObj) => {
        setRadioValue(0)
        console.log(inputObj)
        console.log(inputObj.length)

        if (inputObj.length > 1) {
            console.log("Contains multiple lines")

            updateCopiableText(inputObj)

        } else {
            console.log("Does not contain multiple lines")
            updateCopiableText(inputObj)
        }
    }


    const copyText = (newText) => {

        console.log(newText)

        return (
            navigator.clipboard
                .writeText(newText)
                .then(() => (document.querySelector("#currentText").innerText = newText))
        )
    }

    function CopyOptions() {

        var output = copiableText.map((radio, idx) =>

            <p>
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="checkbox"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => {
                        setRadioValue(parseInt(e.currentTarget.value))
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

                {/* Text Input Area */}
                <Row className="row justify-content-md-center">
                    <Col className="col-lg-auto">

                        <TextInput updateFromPaste={updateFromPaste} />
                    </Col>
                </Row>
            </Container>

            {/* Results */}
            <Container fluid="lg" className="overflow-auto" style={{ height: '50vh' }}>
                <Row className="row justify-content-md-center">
                    <Col className="col-lg-auto">

                        <h3 id="currentText">This is the currently copied text...</h3>
                    </Col>
                </Row>

                <Row className="row justify-content-lg-center">
                    <CopyOptions />
                </Row>
            </Container>

        </Container>

    )
}