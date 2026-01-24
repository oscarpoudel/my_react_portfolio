import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import projectData from '../../data/projects.json'
import AnimatedLetters from '../AnimatedLetters'
import useScrollNavigation from '../../hooks/useScrollNavigation'

const Projects = () => {
  const navigate = useNavigate()
  const [letterClass, setLetterClass] = useState('text-animate')
  // Next: Research, Prev: About
  useScrollNavigation('/technicalskills', '/research', true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="projects-page container">
      <h1 className="page-title">
        <AnimatedLetters
          letterClass={letterClass}
          strArray={'All Projects'.split('')}
          idx={15}
        />
      </h1>

      <div className="projects-grid">
        {projectData.projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <img src={project.image} alt={project.title} />
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
