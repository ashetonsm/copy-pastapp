import React, { useContext, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Document, Page } from 'react-pdf/dist/cjs/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import TextInputContext from '../context/TextInputContext';

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
};

export function PDFTest() {

  const { dispatch, uploadedPage } = useContext(TextInputContext)

  const pageRef = useRef()
  const [file, setFile] = useState(null);
  const [allPages, setAllPages] = useState([])
  const [, setNumPages] = useState(null);

  function onFileChange(event) {
    if (event.target.files.length < 1) {
      return console.log("No file was selected.")
    } else {
      setFile(event.target.files[0]);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
    const newPage = <Page key={`page_${1}`} pageNumber={1} ref={pageRef} />
    setAllPages(newPage)
    dispatch({ type: 'SET_UPLOADED_PAGE', payload: newPage })
  }

  const onDocumentLoadError = () => {
    console.log("Wrong file type!")
  }

  const parseDoc = (e) => {
    try {
      console.log(uploadedPage.ref.current.pageElement.current.innerText)
    } catch (error) {
      console.log("Error parsing uploaded document!")
    }
  }

  return (
    <div className="PDF__Upload">
      <Form.Group>
        <Form.Label htmlFor='file'>Load from file (limit 1 page):</Form.Label>
        <Form.Control type="file" onChange={onFileChange} />
      </Form.Group>

      <div className="PDF__container__document" hidden>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          options={options}>
          {allPages}
        </Document>
      </div>
      <Button onClick={parseDoc}>Upload</Button>
    </div>
  );
}