import { CMapCompressionType } from "pdfjs-dist"
import { useEffect, useState } from "react"
import { ButtonGroup, Col, ToggleButton } from "react-bootstrap"

export const CopiableText = ({ copiableText, functions, copyValue }) => {

    const [appendingValue, setAppendingValue] = useState(null)
    const [appendingText, setAppendingText] = useState("")

    useEffect(() => {
        document.addEventListener("touchstart", touchToMouse, true)
        document.addEventListener("touchend", touchToMouse, true)    
    }, [copiableText])
    
    const appendElement = (destinationObj, destinationID, appendingID) => {

        if (destinationID !== parseInt(appendingID)) {
            console.log(`Appending "${appendingText}" onto "${destinationObj.text}".`)

            copiableText[destinationID].id = appendingID

            copiableText[destinationID].text = copiableText[destinationID].text.concat(" " + appendingText)

            removeElement(copiableText[appendingID])

        } else {
            console.log("Aborting append operation.")
        }
    }

    const removeElement = (oldObj) => {
        var newArray = []
        newArray = copiableText.filter((elem) => elem !== oldObj)
        functions.setCopiableText(newArray)
    }

    const copyText = (newText) => {
        return (
            navigator.clipboard
                .writeText(newText)
                .then(() => (document.querySelector("#currentText").innerText = newText))
        )
    }

    const touchToMouse = (e) => {

        try {
            switch (e.type) {

                case "touchstart":

                    // console.log(e.touches)

                    if (e.touches[0].target.className === "listIcon" || e.touches[0].target.parentElement.id.includes("option-container-")) {
                        console.log("Touched a valid target")
                        // Raw text content
                        console.log(e.touches[0].target.parentElement.children[2].textContent)
                        setAppendingText(e.touches[0].target.parentElement.children[2].textContent)

                        // Value
                        console.log(e.touches[0].target.parentElement.children[1].value)
                        setAppendingValue(parseInt(e.touches[0].target.parentElement.children[1].value))
                    }

                case "touchend":
                    break;
                default:
                    break;
            }

        } catch (error) {
            console.log("No valid targets.")
        }


        /*

        var mouseEvent = new MouseEvent(mEventType, {
            view: window,
            bubbles: true,
            cancelable: true
        })
        */



    }

    function GenerateCopiables() {
        var output = copiableText.map((radio, idx) =>

            <p key={idx}
                id={`option-container-${idx}`}

                onDragCapture={(e) => {
                    setAppendingText(radio.text)
                    setAppendingValue(parseInt(e.currentTarget.children[1].value))
                }}
                onDragOver={(e) => {
                    e.preventDefault()
                }}
                onDrop={(e) => {
                    appendElement(radio, parseInt(e.currentTarget.children[1].value), parseInt(appendingValue))
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