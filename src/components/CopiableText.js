import { useState } from "react"
import { ButtonGroup, Col, ToggleButton } from "react-bootstrap"
import { ConcatArray } from "../utilities/ConcatArray"

export const CopiableText = ({ copiableText, functions, copyValue }) => {

    const [appendingValue, setAppendingValue] = useState(null)
    const [appendingText, setAppendingText] = useState("")

    const appendElement = (destinationID, appendingID) => {

        if (destinationID !== parseInt(appendingID)) {
            copiableText[destinationID].id = appendingID
            copiableText[destinationID].text = copiableText[destinationID].text.concat(" " + appendingText)
            removeElement(copiableText[appendingID])
        } else {
            console.log("Error appending.")
            return
        }
    }

    const removeElement = (oldObj) => {
        copiableText = copiableText.filter((elem) => elem !== oldObj)
        functions.setCopiableText(copiableText)
        functions.setLoadedInput(ConcatArray(copiableText))
    }

    const copyText = (newText) => {
        return (
            navigator.clipboard
                .writeText(newText)
                .then(() => (document.querySelector("#currentText").innerText = newText))
        )
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
                onTouchStartCapture={(e) => {
                    if (e.target.localName !== "p") {
                        setAppendingText(radio.text)
                        setAppendingValue(parseInt(e.target.parentElement.children[1].value))
                    }
                }}
                onTouchEnd={(e) => {
                    e.preventDefault()

                    try {
                        const elementUnderTouch =
                            document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)

                        // Make sure it's not a p
                        if (elementUnderTouch.localName !== "p") {

                            // Make sure it's not an X
                            if (elementUnderTouch.parentElement.children[1].localName === "input"
                                && elementUnderTouch.innerText !== "❌") {

                                // Make sure the values aren't the same
                                if (parseInt(elementUnderTouch.parentElement.children[1].value) !== parseInt(appendingValue)) {
                                    appendElement(parseInt(elementUnderTouch.parentElement.children[1].value), parseInt(appendingValue))
                                } else {
                                    // User is dragging an item over itself
                                    // console.log("Values are equal, cannot append to self!")
                                }

                            } else {
                                // User is clicking an X
                                removeElement(radio)
                            }
                        }
                    } catch (error) {
                        return console.log("Invalid touch-drop item!")
                    }
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
                <span onClick={() => {
                    removeElement(radio)
                }} style={{ marginLeft: "1em", cursor: "default" }}>❌</span>
            </p >
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