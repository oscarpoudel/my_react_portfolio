import React from 'react'
import { useParams } from 'react-router-dom'
import './ProjectDetails.scss'
import projectData from '../../data/projects.json'
import Project1 from '../Detailslist/Project1'  // example dynamic project

const componentMap = {
  '1': Project1,
  // Add more mappings
}

const ProjectDetail = () => {
  const { id } = useParams()
  const project = projectData.projects.find((p) => p.id.toString() === id)
  const Component = componentMap[id]

  if (!project || !Component) return <div>Project not found</div>

  return (
    <div className="project-detail-page">
      {/* <button onClick={() => navigate(-1)} className="back-button">← Back</button> */}
    
      <div className="project-header">
        <h1 className="project-title">{project.title}</h1>
        <h3 className="project-subtitle">{project.description}</h3>
      </div>

      <div className="project-body">
        {/* <aside className="sidebar">
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </aside> */}
        <main className="project-content">
          <Component />
        </main>
      </div>
    </div>
  )
}

export default ProjectDetail
