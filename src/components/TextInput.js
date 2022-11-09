import { useState } from "react";
import { Accordion, Row, Container, Button } from "react-bootstrap";

export const TextInput = ({ updateFromPaste }) => {


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

        // console.log(input)

        var splitInput = []

        if (input.textInput.includes("\n")) {
            splitInput = input.textInput.split("\n")
        } else {
            splitInput = []
            splitInput[0] = input.textInput
        }

        updateFromPaste(input.textInput)


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