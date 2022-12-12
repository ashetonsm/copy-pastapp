import { useState } from "react";
import { Form } from "react-bootstrap"
import { ReadPDF } from "./ReadPDF"

export const FileUpload = () => {

    const [file, setFile] = useState(null);
  
    function onFileChange(event) {
      if (event.target.files.length < 1) {
        return console.log("No file was selected.")
      } else {
        setFile(event.target.files[0]);
      }
    }

    return (
        <>
            <Form.Group>
                <Form.Label htmlFor='file'>Load from file (limit 1 page):</Form.Label>
                <Form.Control type="file" onChange={onFileChange} />
            </Form.Group>

            <ReadPDF file={file}/>
        </>
    )
}