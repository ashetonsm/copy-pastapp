import { useState } from "react"
import { ButtonGroup, Col, ToggleButton } from "react-bootstrap"

export const CopiableText = ({ copiableText, functions, copyValue }) => {

    const [appendingValue, setAppendingValue] = useState(null)
    const [appendingText, setAppendingText] = useState("")

    const appendElement = (destinationID, appendingID) => {

        if (destinationID !== parseInt(appendingID)) {
            copiableText[destinationID].id = appendingID

            copiableText[destinationID].text = copiableText[destinationID].text.concat(" " + appendingText)

            removeElement(copiableText[appendingID])

        } else {
            return
        }
    }

    const removeElement = (oldObj) => {
        copiableText = copiableText.filter((elem) => elem !== oldObj)
        functions.setCopiableText(copiableText)
        concatLoadedInput(copiableText)
    }

    const copyText = (newText) => {
        return (
            navigator.clipboard
                .writeText(newText)
                .then(() => (document.querySelector("#currentText").innerText = newText))
        )
    }

    const concatLoadedInput = (inputList) => {
        var concatList = ""

        inputList.forEach(item => {
            concatList = concatList.concat(item.text + "\n")
        })
        functions.setLoadedInput(concatList)
    }

    function GenerateCopiables() {
        var output = copiableText.map((radio, idx) =>

            <p key={idx}
                onDragCapture={(e) => {
                    setAppendingText(radio.text)
                    setAppendingValue(parseInt(e.currentTarget.children[1].value))
                }}
                onDragOver={(e) => {
                    e.preventDefault()
                }}
                onDrop={(e) => {
                    appendElement(parseInt(e.currentTarget.children[1].value), parseInt(appendingValue))
                }}
                style={{ padding: "1em" }}
                draggable
            >
                <span className="listIcon" style={{ marginRight: "1em", cursor: "grab" }}>📄</span>

                <ToggleButton
                    id={`text-option-${idx}`}
                    type="checkbox"
                    name="radio"
                    value={idx}
                    checked={copyValue === idx}
                    onChange={(e) => {
                        functions.setCopyValue(parseInt(e.currentTarget.value))
                        copyText(radio.text)
                    }}
                >
                    {radio.text}
                </ToggleButton>
                <span onClick={(e) => {
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

    return <GenerateCopiables />

}