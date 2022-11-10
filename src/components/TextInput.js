import { useState } from "react";
import { Accordion, Row, Container, Button } from "react-bootstrap";

export const TextInput = ({ updateFromPaste }) => {

    const whitespace = new RegExp('\\S+', 'g')
    const [input, setInput] = useState({
        textInput: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target
        setInput((input) => ({
            ...input,
            [id]: value,
        }))

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        var splitInput = []

        // Check if there are multiple lines of text
        if (input.textInput.includes("\n")) {
            // If so, split them and assign to splitInput
            splitInput = input.textInput.split("\n")
        } else {
            // Single line, blank input
            if (!input.textInput.match(whitespace)) {
                return alert("Blank input!")
            } else {
                splitInput[0] = input.textInput
            }
        }

        // Remove all blank lines
        splitInput = splitInput.filter(line => line.match(whitespace))

        const objInput = []
        var id = 0

        splitInput.forEach(text => {
            objInput.push({text: text, value: id++})
        });

        updateFromPaste(objInput)
    }

    return (

        <Accordion defaultActiveKey={['0']} alwaysOpen >
            <Accordion.Item eventKey="0" style={{ width: '55vw' }}>
                <Accordion.Header >
                    Resume Text
                </Accordion.Header>
                <Accordion.Body>
                    <Container>

                        <Row className="row justify-content-lg-center">
                            <form>
                                <textarea
                                    onChange={handleChange}
                                    id="textInput"
                                    name="textInput"
                                    placeholder="Paste your resume here."
                                    style={{ height: '50vh', width: 'inherit' }}
                                >
                                </textarea>
                                <Row className="row justify-content-md-center">

                                    <Button type="submit" value="Copyify!"
                                        onClick={(e) => handleSubmit(e)}
                                        style={{ width: 'inherit' }}
                                    >
                                        Copyify!
                                    </Button>
                                </Row>
                            </form>

                        </Row>
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

    )
}