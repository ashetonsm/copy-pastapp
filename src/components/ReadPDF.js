import { useContext, useRef, useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import { Document, Page, pdfjs } from 'react-pdf/dist/cjs/entry.webpack'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import TextInputContext from '../context/TextInputContext'
const url = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
pdfjs.GlobalWorkerOptions.workerSrc = url

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
}

export const ReadPDF = ({ file }) => {

  const { dispatch, uploadedPage } = useContext(TextInputContext)

  const pageRef = useRef()
  const [allPages, setAllPages] = useState([])
  const [, setNumPages] = useState(null)

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages)
    const newPage = <Page key={`page_${1}`} pageNumber={1} ref={pageRef} />
    setAllPages(newPage)
    dispatch({ type: 'SET_UPLOADED_PAGE', payload: newPage })
  }

  const onDocumentLoadError = () => {
    return console.log("Something went wrong!")
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
    // Catches: senTence (where Tense is not "Script", "Hub", or "SQL"), senTEN, myEXERIENCEIn, You andI, ILOctober, 
    const lowercaseHighercase = new RegExp(
      '(?=(?<=[a-z0-9])(?!Script|Hub|SQL)[A-Z][a-z])|(?=(?<=[a-z0-9])(?!Script|Hub|SQL)[A-Z]{3,})|(?<=[a-z0-9])(?=I)|(?=(?<=(?!API)[A-Z]{2,})[A-Z][a-z])|(?=(?<=[a-z]+)[A-Z]{4,})', 'g'
    )
    const anyLetterNum = new RegExp('\\w+', 'g')
    const bulletsNoDashes = new RegExp('(\u2022|\u2023|\u25E6|\u2043|\u2219|\u25CB|\u25CF)', 'gu')

    // An array of text split at every bullet point...
    var splitText = rawText.replace(lowercaseHighercase, "\n")
    splitText = splitText.split(bulletsNoDashes)
    var formattedText = ""

    if (splitText.length > 1) {
      var splitWithBullets = []

      for (let i = 0; i < splitText.length - 1; i++) {
        if (i !== 0) {
          // If the last entry was a bullet
          if (bulletsNoDashes.test(splitText[i - 1]) === true) {
            // Push it to the new array as "bullet + current i's text"
            splitWithBullets.push(splitText[i - 1].concat(' ', splitText[i]))
          } else {
            if (splitText[i].match(anyLetterNum)) {
              splitWithBullets.push(splitText[i])
            }
          }
        } else {
          splitWithBullets.push(splitText[i])
        }
      }
      splitWithBullets.forEach(entry => {
        formattedText = formattedText.concat(entry, "\n")
      })

    } else {
      formattedText = splitText
    }

    dispatch({ type: 'SET_LOADED_INPUT', payload: formattedText.toString() })
  }


  return (
    <div className="PDF__Upload">
      <div className="PDF__container__document" hidden>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          options={options}>
          {allPages}
        </Document>
      </div>
      <Row className="justify-content-center mb-2 mt-2">
        <Button onClick={parseDoc} className="col-md-4 w-50">Upload</Button>
      </Row>
    </div>
  )
}