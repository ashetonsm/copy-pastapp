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
      // Loads the unformatted text into the input box as an ugly brick as long as the document div is hidden
      formatPDF(uploadedPage.ref.current.pageElement.current.innerText)

    } catch (error) {
      console.log("Error parsing uploaded document!")
    }
  }

  const formatPDF = (rawText) => {
    // TODO: Split at Lines LikeThis so weCan DetectWhen ThereShould BeA LineBreak
    const lowercaseHighercase = new RegExp('(?=(?<=[a-z]|[0-9])[A-Z][a-z])|(?=(?<=[A-Z])[A-Z][a-z])', 'g')
    const anyLetterNum = new RegExp('\\w+', 'g')
    const bulletsNoDashes = new RegExp('(\u2022|\u2023|\u25E6|\u2043|\u2219|\u25CB|\u25CF)', 'gu')

    // An array of text split at every bullet point...
    var splitText = rawText.replace(lowercaseHighercase, "\n")
    splitText = splitText.split(bulletsNoDashes)
    // console.log(splitText)

    var splitWithBullets = []

    for (let i = 0; i < splitText.length - 1; i++) {
      if (i !== 0) {
        // If the last entry was a bullet
        if (bulletsNoDashes.test(splitText[i - 1]) === true) {
          // Push it to the new array as "bullet + current i's text"
          splitWithBullets.push(splitText[i - 1].concat(' ', splitText[i]))
        } else {
          if (splitText[i].match(anyLetterNum)) {
            // console.log(splitText[i])
            splitWithBullets.push(splitText[i])
          }
        }
      } else {
        // TODO: Make sure not checking the first one isn't an issue
        splitWithBullets.push(splitText[i])
      }
    }
    
    // console.log(splitWithBullets)
    
    var formattedText = ""
    splitWithBullets.forEach(entry => {
      formattedText = formattedText.concat(entry, "\n")
    });
    
    // console.log(formattedText)

    dispatch({ type: 'SET_LOADED_INPUT', payload: formattedText })

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