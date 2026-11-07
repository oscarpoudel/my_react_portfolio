import React from 'react';
import { Link } from 'react-router-dom';
import projectData from '../../data/projects.json';
import ProjectVisual from '../Projects/ProjectVisual';
import projectShowcases from '../../data/projectShowcases.json';
import projectMedia from '../../data/projectMedia.json';
import ProjectFigures from './ProjectFigures';
import './ProjectSummary.scss';
import { useMediaLibrary } from '../../media/mediaLibrary';
import { ProjectMediaContext } from './ProjectCaseImage';

export default function ProjectSummary({ project, back, children }) {
  const showcase = projectShowcases[project.id];
  const media = useMediaLibrary();
  const figures = media.projects[project.id] || (showcase ? [showcase.cover, ...showcase.figures] : projectMedia[project.id] || []);
  const publications = project.publications?.map((publication, index) => <div className="summary-publication" key={index}><p>{publication.citation}</p>{publication.url && <a href={publication.url} target="_blank" rel="noopener noreferrer">Read the paper</a>}</div>);
  return <main className={`container project-summary-page${figures.length ? ' has-showcase' : ''}`}>
    <Link className="summary-back" to={back}>← Back to projects</Link>
    <div className="summary-grid">
      <div><div className="summary-categories">{project.categories.map((id) => <Link key={id} to={`/projects?topic=${id}`}>{projectData.categories.find((category) => category.id === id)?.label}</Link>)}</div>
        <h1>{project.title}</h1>
        {project.status === 'Under review' && <span className="summary-review">Related research manuscript under review</span>}
        <p className="summary-intro">{project.description}</p>
        <div className="summary-actions">{project.links.map((link, index) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}{project.links.length > 1 && link.label !== 'GitHub' ? ` ${index + 1}` : ''} ↗</a>)}</div>
        {figures.length > 0 && <div className="summary-hero-focus"><div className="summary-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><p className="summary-platform">{project.platforms.join(' · ')}</p></div>}
      </div>
      {figures.length ? <ProjectFigures key={project.id} figures={figures} /> : <ProjectVisual project={project} />}
    </div>
    {!figures.length && <section className="summary-section"><h2>Project focus</h2><div className="summary-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><p><strong>Platform / environment:</strong> {project.platforms.join(' · ')}</p></section>}
    {showcase && <>
      <section className="summary-section"><h2>Engineering approach</h2>
        <ol className="summary-methods">{showcase.methodology.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
      </section>
      <section className="summary-section"><h2>Skills in practice</h2>
        <div className="summary-skill-groups">{showcase.skills.map((group) => <div key={group.area}><h3>{group.area}</h3><ul>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}</div>
      </section>
      {showcase.implementation?.length > 0 && <section className="summary-section"><h2>Implementation & technology</h2><div className="summary-implementation">{showcase.implementation.map((part) => <div key={part.title}><h3>{part.title}</h3><p>{part.description}</p></div>)}</div></section>}
    </>}
    {children && <section className="summary-section summary-case-study" aria-label="Project case study"><h2>Inside the project</h2><ProjectMediaContext.Provider value={project.id}>{children}</ProjectMediaContext.Provider></section>}
    {project.overview?.length > 0 && <section className="summary-section"><h2>Inside the project</h2>{project.overview.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>}
    {project.highlights?.length > 0 && <section className="summary-section"><h2>What I built</h2><ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></section>}
    {project.publications?.length > 0 && <section className="summary-section"><h2>Related research</h2>{publications}</section>}
  </main>;
}
