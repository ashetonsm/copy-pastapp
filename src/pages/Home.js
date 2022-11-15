import { useState } from "react";
import { ButtonGroup, Col, Container, Row, ToggleButton } from "react-bootstrap";
import { TextInput } from "../components/TextInput";

export const Home = () => {

    const [selectedValue, setSelectedValue] = useState(0)
    const [copyValue, setCopyValue] = useState(0)
    const [appendingValue, setAppendingValue] = useState(null)
    const [appendingText, setAppendingText] = useState("")
    const [copiableText, setCopiableText] = useState([

        { text: 'Click', value: 0, bullet: false },
        { text: 'to', value: 1, bullet: false },
        { text: 'Copy', value: 2, bullet: false },

    ])

    const updateFromPaste = (inputObj) => {
        setCopyValue(0)
        setCopiableText(applyFormatting(selectedValue, inputObj))
    }

    const removeElement = (oldObj) => {
        var oldValue = oldObj.id
        var newArray = []

        // console.log(`DELETING`)
        newArray = copiableText.filter((elem) => elem !== oldObj)

        try {
            if (copiableText[oldValue].id !== undefined) {
                // console.log(copiableText[oldValue].value)
            }
        } catch (error) {
            console.log("WARNING: Undefined value for old object!")
        }

        // console.log(newArray)

        setCopiableText(newArray)
    }

    const appendElement = (destinationObj, destinationID, appendingID) => {

        if (destinationID !== parseInt(appendingID)) {
            // console.log(destinationID  + " " + appendingID)
            console.log(`Appending "${appendingText}" onto "${destinationObj.text}".`)

            copiableText[destinationID].id = appendingID

            copiableText[destinationID].text = copiableText[destinationID].text.concat(" " + appendingText)

            removeElement(copiableText[appendingID])

        } else {
            console.log("Aborting append operation.")
        }
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

            <p key={idx}
                onDragStart={(e) => {
                    setAppendingText(radio.text)
                    setAppendingValue(parseInt(e.currentTarget.children[1].value))
                    // console.log(`Dragging "${radio.text}"... Value: ${e.currentTarget.children[1].value}`)
                }}
                onDragOver={(e) => {
                    e.preventDefault()
                }}
                onDrop={(e) => {
                    // console.log(`Dropped #${appendingValue} on #${e.currentTarget.children[1].value}`)
                    appendElement(radio, parseInt(e.currentTarget.children[1].value), parseInt(appendingValue))
                }}
                style={{ padding: "1em" }}
                draggable
            >
                <span style={{ marginRight: "1em", cursor: "grab" }}>📄</span>

                <ToggleButton
                    id={`radio-${idx}`}
                    type="checkbox"
                    name="radio"
                    value={idx}
                    checked={copyValue === idx}
                    onChange={(e) => {
                        setCopyValue(parseInt(e.currentTarget.value))
                        copyText(radio.text)
                    }}
                >
                    {radio.text}
                </ToggleButton>
                <span onClick={(e) => {
                    // console.log(radio)
                    // console.log(e.target.parentNode.children[1].value)
                    removeElement(radio)
                }} style={{ marginLeft: "1em", cursor: "default" }}>❌</span>
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
                                        setSelectedValue(parseInt(e.currentTarget.value))
                                    }} />
                                <label htmlFor="original">Original/None</label>
                            </div>

                            <div>
                                <input type="radio" id="addBullets" name="formattingOption"
                                    value={1}
                                    onInput={(e) => {
                                        setSelectedValue(parseInt(e.currentTarget.value))
                                    }} />
                                <label htmlFor="addBullets">Add Bullets</label>
                            </div>

                            <div>
                                <input type="radio" id="removeBullets" name="formattingOption"
                                    value={2}
                                    onInput={(e) => {
                                        setSelectedValue(parseInt(e.currentTarget.value))
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