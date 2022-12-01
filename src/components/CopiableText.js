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
            console.log("Error appending")
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
                        // if (e.target.innerText === "❌") {
                        //      console.log("Deletey")
                        // } else {
                            setAppendingText(radio.text)
                            setAppendingValue(parseInt(e.target.parentElement.children[1].value))
                        // }
                        console.log("touch")
                    }
                }}
                onTouchEnd={(e) => {
                    e.preventDefault()

                    try {
                        // console.log(e.changedTouches[0])
                        const elementUnderTouch = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)

                        console.log(elementUnderTouch.innerText)
                        // if (elementUnderTouch.innerText === "❌") {
                        //      console.log("Delete it")
                        // } else {
                            // Not clicking the p tag or the X button
                            if (elementUnderTouch.parentElement.children[1].localName === "input") {
                                // Replace with what we'll find under the click
                                appendElement(parseInt(elementUnderTouch.parentElement.children[1].value), parseInt(appendingValue))
                            }
                        // }


                    } catch (error) {
                        return console.log("Invalid drop item!")
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