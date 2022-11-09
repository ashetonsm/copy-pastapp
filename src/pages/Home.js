import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TextInput } from "../components/TextInput";
import { TextToCopy } from "../components/TextToCopy";

export const Home = () => {

    const [copiableText, updateCopiableText] = useState(["Click", "to", "copy"])

    const updateFromPaste = (inputArray) => {

        console.log(inputArray.length)

        if (inputArray.length > 1) {
            console.log("Contains multiple lines")

            updateCopiableText(inputArray)

        } else {
            console.log("Does not contain multiple lines")
            updateCopiableText(inputArray)
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
        console.log("Toasty")
    }

    return (
        <Container>

            {/* Centered title */}
            <Row className="row justify-content-md-center">
                <Col className="col-lg-auto">
                    <h1>Copy-Pastapp</h1>
                    <h2>(Because auto-fill isn't always accurate)</h2>
                </Col>
            </Row>

            <hr></hr>

            {/* Text Input Area */}
            <Row className="row justify-content-md-center">
                <Col className="col-lg-auto">

                    <TextInput updateFromPaste={updateFromPaste} />
                </Col>
            </Row>

            {/* Results */}
            <Row className="row justify-content-md-center">
                <Col>
                    <div id="currentText">I will change</div>

                    <div className="h-20 overflow-auto" style={{ height: '50vh' }}>
                        <CopyOptions />
                    </div>
                </Col>
            </Row>

        </Container>
    )
}