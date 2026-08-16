import React from 'react'
import './Project1.scss'

const Project9 = () => {
  const pdfPath = '/images/1/DL_crack_segmentation.pdf#zoom=100'
  const projectImage = 'https://raw.githubusercontent.com/oscarpoudel/DL_VitCrackSeg/main/images/image.jpg'

  return (
    <div className="project-details-content styled-project" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2>VitCrackSeg: Crack Segmentation Using Vision Transformer</h2>

      <p>
        This project explores the use of a Vision Transformer for real-time crack detection and segmentation in civil infrastructure
        applications. The model is adapted for dense prediction by removing the classification head and attaching a segmentation
        head that converts patch embeddings back into a spatial crack map. The work compares loss functions and demonstrates how
        transformer-based segmentation can support structural health monitoring and early damage detection.
      </p>

      <p>
        The project was developed as a deep learning pipeline for identifying cracked and non-cracked regions in concrete images,
        with a focus on accurate prediction and practical deployment for structural inspection workflows.
      </p>

      <div className="image-row">
        <img src={projectImage} alt="VitCrackSeg crack segmentation output" className="scaled-image" />
      </div>

      <h4>Key Highlights</h4>
      <ul>
        <li>Vision Transformer-based segmentation architecture tailored for crack detection</li>
        <li>BCE Logit loss and jitter-based augmentation for robust generalization</li>
        <li>Evaluation using IoU and Dice metrics for segmentation quality</li>
        <li>Real-time prediction pipeline for practical structural inspection use cases</li>
      </ul>

      <h4>Project Report</h4>
      <iframe
        src={pdfPath}
        title="VitCrackSeg project report"
        style={{ width: '100%', height: 'calc(100vh - 240px)', border: 'none', background: '#fff' }}
        allow="autoplay"
      >
        <p>
          It appears your browser doesn't support embedding PDFs. You can <a href={pdfPath}>open the PDF</a> instead.
        </p>
      </iframe>
    </div>
  )
}

export default Project9

