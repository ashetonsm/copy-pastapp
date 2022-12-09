import React, { useContext, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
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

  const { dispatch, uploadedPages } = useContext(TextInputContext)

  const pageRef = useRef()
  const [file, setFile] = useState(null);
  const [allPages, setAllPages] = useState([])
  const [, setNumPages] = useState(null);

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
    const pageArray =
      Array.from(new Array(nextNumPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} ref={pageRef} />
      ))
    setAllPages(pageArray)
    dispatch({ type: 'SET_UPLOADED_PAGES', payload: pageArray })
  }

  const parseDoc = (e) => {
    try {
      uploadedPages.forEach(page => {
        console.log(page.ref.current.pageElement.current.innerText)
      })
    } catch (error) {
      console.log("Error parsing uploaded document!")
    }
  }

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
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options} scale={0.5}>
            {allPages}
          </Document>
        </div>
        <Button onClick={parseDoc}>Upload</Button>
      </div>
    </div>
  );
}