import React, { lazy, Suspense } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import './projectdetail.scss'
import projectData from '../../data/projects.json'
import ProjectSummary from './ProjectSummary'

// Only projects with real, existing case studies load a custom component.
const details = {
  1: lazy(() => import('../Detailslist/Project1.jsx')),
  2: lazy(() => import('../Detailslist/Project2.jsx')),
  3: lazy(() => import('../Detailslist/Project3.jsx')),
  4: lazy(() => import('../Detailslist/Project4.jsx')),
  5: lazy(() => import('../Detailslist/Project5.jsx')),
  6: lazy(() => import('../Detailslist/Project6.jsx')),
  7: lazy(() => import('../Detailslist/Project7.jsx')),
  8: lazy(() => import('../Detailslist/Project8.jsx')),
  9: lazy(() => import('../Detailslist/Project9.jsx')),
  10: lazy(() => import('../Detailslist/Project10.jsx')),
  11: lazy(() => import('../Detailslist/Project11.jsx')),
  12: lazy(() => import('../Detailslist/Project12.jsx')),
  13: lazy(() => import('../Detailslist/Project13.jsx')),
}
export default function ProjectDetail() {
  const { id } = useParams()
  const location = useLocation()
  const back = location.state?.from || '/projects'
  const project = projectData.projects.find((item) => item.id.toString() === id)
  const Component = project?.detailComponent ? details[id] : null
  if (!project) return <main className="container project-summary-page"><h1>Project not found</h1><Link to="/projects">Back to projects</Link></main>
  return <ProjectSummary key={project.id} project={project} back={back}>
    {Component && <Suspense fallback={<div>Loading project…</div>}><Component /></Suspense>}
  </ProjectSummary>
}
