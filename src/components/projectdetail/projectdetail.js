import React, { lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import './projectdetail.scss'
import projectData from '../../data/projects.json'

// Dynamic import function
const loadComponent = (id) => {
  try {
    return lazy(() => import(`../Detailslist/Project${id}.jsx`))
  } catch (error) {
    console.error(`Project component for ID ${id} not found`, error)
    return null
  }
}

const ProjectDetail = () => {
  const { id } = useParams()
  const project = projectData.projects.find((p) => p.id.toString() === id)
  const Component = project ? loadComponent(id) : null

  if (!project || !Component) return <div>Project not found</div>

  return (
    <div className="container project-detail-page">
      <div className="project-header">
        <h1 className="project_detail-title">{project.title}</h1>
        <h3 className="project-subtitle">{project.description}</h3>
        <h3 className="Project-url">
          Project-URL:{" "}
          <a href={project.URL} target="_blank" rel="noopener noreferrer">
            {project.URL}
          </a>
        </h3>
      </div>

      <div className="divider" />

      <div className="project-body">
        <main className="project-content">
          <Suspense fallback={<div>Loading project...</div>}>
            <Component />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export default ProjectDetail
