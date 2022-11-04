import { useState } from "react";

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
        <div className="TextInput">
            <h3>Paste Your Resume Text</h3>
            <form>
                <textarea
                    onChange={handleChange}
                    id="textInput"
                    name="textInput"
                    rows="5"
                    cols="50"
                    placeholder="Paste your resume here."></textarea>
                <p>
                    <input type="submit" value="Copyify!" onClick={(e) => handleSubmit(e)} />
                </p>
            </form>
        </div>

    )
}