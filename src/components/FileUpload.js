import { useState } from "react"
import { Alert, Form } from "react-bootstrap"
import { ReadPDF } from "./ReadPDF"
import { ReadTXT } from "./ReadTXT"

export const FileUpload = () => {

  const [file, setFile] = useState(null)

  const onFileChange = (event) => {
    if (event.target.files.length < 1) {
      return console.log("No file was selected.")
    } else {
      setFile(event.target.files[0])
    }
  }

  const chooseReader = (fileType) => {
    switch (fileType) {
      case "application/pdf":
        return <ReadPDF file={file} />
      case "text/plain":
        return <ReadTXT file={file} />
      default:
        return <Alert variant="danger" style={{marginTop: "1rem"}}>ERROR: Invalid file type!</Alert>
    }
  }

  return (
    <>
      <Form.Group style={{marginTop: "1rem", marginBottom: "1rem"}}>
        <Form.Label htmlFor='file'>Load from file (limit 1 page):</Form.Label>
        <Form.Control type="file" onChange={onFileChange} />
      </Form.Group>

      {file !== null ? chooseReader(file.type) : null}
    </>
  )
}