import { useEffect, useState } from "react";
import { Accordion, Row, Button } from "react-bootstrap";

export const TextInput = ({ updateFromPaste, loadedInput }) => {

    const whitespace = new RegExp('\\S+', 'g')
    const bullets = new RegExp('(?:^(o|\u2022|\u2023|\u25E6|\u2043|\u2219|\u25CB|\u25CF|\u002D|\u2013)\\s)', 'gu')

    const [input, setInput] = useState({
        textInput: "",
    });

    useEffect(() => {
        setInput((input) => ({
            ...input,
            textInput: loadedInput,
        }))

    }, [loadedInput])


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

            var containsBullet = false

            if (text.match(bullets)) {
                containsBullet = true
            }

            objInput.push({ text: text, id: id++, bullet: containsBullet })
        });

        updateFromPaste(objInput)
    }

    return (

        <Accordion defaultActiveKey={['0']} alwaysOpen style={{ width: '55vw' }}>
            <form>
                <Accordion.Item eventKey="0" style={{ width: 'inherit' }}>
                    <Accordion.Header style={{ width: 'inherit' }}>Resume Text</Accordion.Header>
                    <Accordion.Body>
                        <Row className="row justify-content-lg-center">
                            <textarea
                                onChange={handleChange}
                                id="textInput"
                                name="textInput"
                                placeholder="Paste your resume here."
                                style={{ height: '50vh' }}
                                value={input.textInput}
                            >
                            </textarea>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
                <Row className="row justify-content-md-center">

                    <Button type="submit" value="Copyify!"
                        onClick={(e) => handleSubmit(e)}
                        style={{ width: 'inherit' }}
                    >
                        Copyify!
                    </Button>
                </Row>
            </form>
        </Accordion>

    )
}