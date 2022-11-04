import { FileUpload } from "../components/FileUpload"
import { TextToCopy } from "../components/TextToCopy";

export const Home = () => {

    return (
        <>
            <div id="sampleText">I will change</div>
            <hr></hr>
            
            <TextToCopy>
                Goodbye, world!
            </TextToCopy>

            <TextToCopy>
                Hello, world!
            </TextToCopy>

            <FileUpload />
        </>
    )
}