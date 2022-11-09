import { useState } from "react";
import { TextInput } from "../components/TextInput";
import { TextToCopy } from "../components/TextToCopy";

export const Home = () => {

    const [copiableText, updateCopiableText] = useState(["Click", "to", "copy"])

    const updateFromPaste = (rawText) => {

        console.log(rawText)

        if (rawText.includes("\n")) {
            console.log("Contains newlines")

            const splitText = rawText.split("\n")

            console.log(splitText)
            updateCopiableText(splitText)

        } else {
            console.log("Does not contain newlines")
            const singleLine = []
            singleLine.push(rawText)
            updateCopiableText(singleLine)
        }
    }

    function CopyOptions() {

        var id = 0
        var output = copiableText.map((props) =>
            <TextToCopy key={id++}>{props}</TextToCopy>
        )
        return output
    }

    return (
        <>
            <div id="sampleText">I will change</div>
            <hr></hr>

            <div className="center">
                <CopyOptions />
            </div>
            <hr></hr>

            <TextInput updateFromPaste={updateFromPaste} />
        </>
    )
}