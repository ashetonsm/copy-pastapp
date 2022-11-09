import { useState } from "react";
import { Accordion } from "react-bootstrap";

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

        <Accordion defaultActiveKey={0}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    Resume Text
                </Accordion.Header>
                <Accordion.Body>

                    <form>
                        <textarea
                            onChange={handleChange}
                            id="textInput"
                            name="textInput"
                            placeholder="Paste your resume here."
                            style={{ height: '100px' }}>
                            </textarea>
                        <p>
                            <input type="submit" value="Copyify!" onClick={(e) => handleSubmit(e)} />
                        </p>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

    )
}