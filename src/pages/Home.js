import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { TextInput } from "../components/TextInput";
import { TextToCopy } from "../components/TextToCopy";
import "react-toastify/dist/ReactToastify.css"

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
            <TextToCopy key={id++} notify={notify}>{props}</TextToCopy>
        )
        return output
    }

    const notify = () => {
        toast("Copied to clipboard!", {
            position: toast.POSITION.TOP_RIGHT
          });
      };

    return (
        <>
        <h1>Copy-Pastapp</h1>
        <h2>Because auto-fill isn't always accurate</h2>
            <hr></hr>
            <TextInput updateFromPaste={updateFromPaste} />
            <div id="sampleText">I will change</div>
            <hr></hr>

            <div className="center">
                <CopyOptions />
            </div>
            <hr></hr>


            <ToastContainer autoClose={2000} />
        </>
    )
}