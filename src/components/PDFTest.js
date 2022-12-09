import React, { createRef, useContext, useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/cjs/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import TextInputContext from '../context/TextInputContext';
import SampleFile from './../files/SampleFile.pdf'

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
};

export function PDFTest() {

  const { dispatch, uploadedPages } = useContext(TextInputContext)

  const [file, setFile] = useState(SampleFile);
  const [allPages, setAllPages] = useState([])

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  const docRef = createRef()

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    const pageArray =
      Array.from(new Array(nextNumPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))
    setAllPages(pageArray)
    dispatch({ type: 'SET_UPLOADED_PAGES', payload: "Loading..." })
  }

  useEffect(() => {
    if (uploadedPages.length > 0) {
      if (docRef.current.pages[0] !== undefined) {
        // Only dispatch if the text is different
        if (uploadedPages !== docRef.current.pages[0].innerText) {
          console.log(docRef.current.pages[0].innerText)
          dispatch({ type: 'SET_UPLOADED_PAGES', payload: docRef.current.pages[0].innerText })
        }
      }
    }
  }, [dispatch, docRef, uploadedPages])


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
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options} ref={docRef}>
            {allPages}
          </Document>
        </div>
      </div>
    </div>
  );
}