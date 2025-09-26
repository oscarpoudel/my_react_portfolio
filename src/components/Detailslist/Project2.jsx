import React from 'react'
// The image imports are no longer needed as we are displaying the PDF
// import metodologyImage from "../../assets/research_images/proj_1/1_methodology.png"
// import envImage from "../../assets/research_images/proj_1/2_simulation_setup.png"
// import tarImage from "../../assets/research_images/proj_1/3_target_system.png"
// import res1Image from "../../assets/research_images/proj_1/4_res1.png"
// import res2Image from "../../assets/research_images/proj_1/5_res2.png"
// import gazeImage from "../../assets/research_images/proj_1/6_gaze_pid.png"


const Project2 = () => {
  // Path to your PDF file in the public folder
  const pdfPath = '/images/1/swarm.pdf#zoom=100';

  return (
    <div className="project-details-content styled-project" style={{ width: '100%', height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      {/* <h3 style={{ textAlign: 'center', padding: '1rem 0' }}>Project Details</h3> */}
      <iframe
        src={pdfPath}
        title="Project PDF"
        style={{ width: '100%', height: '100%', border: 'none' }}
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

export default Project2

