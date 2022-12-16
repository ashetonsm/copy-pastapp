import { useContext, useState } from "react"
import { ToggleButton } from "react-bootstrap"
import TextInputContext from "../context/TextInputContext"
import { ConcatArray } from "../utilities/ConcatArray"
import { Timeout } from "../utilities/Timeout"

export const CopiableText = ({ functions, copyValue }) => {

    const { dispatch, copiableText } = useContext(TextInputContext)

    const [appendingValue, setAppendingValue] = useState(null)
    const [appendingText, setAppendingText] = useState("")

    const appendElement = (destinationID, appendingID) => {

        if (destinationID !== parseInt(appendingID)) {
            copiableText[destinationID].id = appendingID
            copiableText[destinationID].text = copiableText[destinationID].text.concat(" " + appendingText)
            applyDeleted(copiableText[appendingID])
            removeElement(copiableText[appendingID])
        } else {
            console.log("Error appending.")
            return
        }
    }

    /**
     * Updates copiableText by applying the "deleted: true" field to an object.
     * This field is used to apply the "deleted" class, which lowers opacity to 0%.
     * @param {Object} deletedObj 
     */
    const applyDeleted = (deletedObj) => {
        const changedCopiableText = copiableText.map(radio => {
            if (radio === deletedObj) {
                radio.deleted = true
                return radio
            } else {
                return radio
            }
        })
        dispatch({ type: 'SET_COPIABLE_TEXT', payload: changedCopiableText })
    }

    /**
     * Removes an object after a 600ms timeout.
     * @param {Object} oldObj 
     */
    const removeElement = async (oldObj) => {
        await Timeout(600)
        var newText = copiableText.filter((elem) => elem !== oldObj)
        dispatch({ type: 'SET_COPIABLE_TEXT', payload: newText })
        dispatch({ type: 'SET_LOADED_INPUT', payload: ConcatArray(newText) })
    }

    const copyText = (newText) => {
        return (
            navigator.clipboard
                .writeText(newText)
            // .then(() => (document.querySelector("#currentText").innerText = newText))
        )
    }

    return (
        copiableText.map((radio, idx) =>

            <p key={idx}
                className={radio.deleted ? "deleted" : null}
                onDragCapture={(e) => {
                    setAppendingText(radio.text)
                    setAppendingValue(parseInt(e.currentTarget.children[0].value))
                }}
                onDragOver={(e) => {
                    e.preventDefault()
                }}
                onDrop={(e) => {
                    appendElement(parseInt(e.currentTarget.children[0].value), parseInt(appendingValue))
                }}
                onTouchStartCapture={(e) => {
                    if (e.target.localName !== "p") {
                        setAppendingText(radio.text)
                        setAppendingValue(parseInt(e.target.parentElement.children[0].value))
                    }
                }}
                onTouchEnd={(e) => {
                    e.preventDefault()

                    try {
                        const elementUnderTouch =
                            document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)

                        switch (elementUnderTouch.localName) {
                            case "label":
                                // Make sure the values aren't the same
                                // Otherwise, the user is dragging an item over itself
                                if (parseInt(elementUnderTouch.parentElement.children[0].value) !== parseInt(appendingValue)) {
                                    appendElement(
                                        parseInt(elementUnderTouch.parentElement.children[0].value), parseInt(appendingValue)
                                    )
                                }
                                break;
                            case "span":
                                // User is clicking an X
                                applyDeleted(radio)
                                removeElement(radio)
                                break;

                            default:
                                break;
                        }

                    } catch (error) {
                        return console.log("Invalid touch-drop item!")
                    }
                }}
                style={{ padding: "1em" }}
                draggable
            >
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
                    onTouchStartCapture={(e) => {
                        functions.setCopyValue(parseInt(e.target.parentElement.children[0].value))
                        copyText(radio.text)
                    }}
                    style={{ maxWidth: '35vw', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                >
                    {radio.text}
                </ToggleButton>
                <span onClick={() => {
                    applyDeleted(radio)
                    removeElement(radio)
                }} style={{ marginLeft: "1em", cursor: "default" }}>❌</span>
            </p >
        )
    )
}