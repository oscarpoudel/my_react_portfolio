import React from 'react'
import "./Project1.scss" 
const Project9 = () => {
  // Path to your PDF file in the public folder
  const pdfPath = '/images/1/llm_e_project.pdf#zoom=100';

  return (
    <div className="project-details-content styled-project" style={{ width: '100%', height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      {/* <h3 style={{ textAlign: 'center', padding: '1rem 0' }}>Project Details</h3> */}
      <iframe
        src={pdfPath}
        title="Project PDF"
        style={{ width: '90%', height: '100%', border: 'none' }}
        allow="autoplay"
      >
        <p>
          It appears your browser doesn't support embedding PDFs.
          You can <a href={pdfPath}>download the PDF</a> instead.
        </p>
      </iframe>
    </div>
  )
}

export default Project9

