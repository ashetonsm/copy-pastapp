import React, { createRef, useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/cjs/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import SampleFile from './../files/SampleFile.pdf'

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
};

export function PDFTest() {
  const [file, setFile] = useState(SampleFile);
  const [numPages, setNumPages] = useState(null)
  const [allPages, setAllPages] = useState([])

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }
  const pageRef = createRef()

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages)
    const pageArray =
      Array.from(new Array(nextNumPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} ref={pageRef} />
      ))
    setAllPages(pageArray)
  }

  useEffect(() => {
    if (allPages.length !== 0) {
      if (allPages[0].ref.current.pageElement.current.innerText !== "Loading page…") {
        // console.log(document.querySelectorAll('div.textLayer'))

        return console.log(allPages[0].ref.current.pageElement.current.innerText.substring(0, 10))
      } else {
        allPages.forEach(page => {
          // console.log(document.querySelector('div.react-pdf__Page'))
          // console.log(page.ref.current.pageElement.current.innerText)
          console.log("Did not load")
        });
      }
    }
  }, [allPages])


  return (
    <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{' '}
          <input onChange={onFileChange} type="file" />
        </div>
        <div className="Example__container__document">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {allPages}
          </Document>
        </div>
      </div>
    </div>
  );
}