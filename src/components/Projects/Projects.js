import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import './Projects.scss';
import projectData from '../../data/projects.json';
import ProjectVisual from './ProjectVisual';
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters';
import useScrollNavigation from '../../hooks/useScrollNavigation';

const categories = projectData.categories;
const projects = projectData.projects.filter((project) => project.status !== 'Under review').sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || (b.year || 0) - (a.year || 0) || b.id - a.id);
const shuffleProjects = () => {
  const result = [...projects];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
};

export default function Projects() {
  const [letterClass, setLetterClass] = useState('text-animate');
  const [allProjects] = useState(shuffleProjects);
  const [params, setParams] = useSearchParams();
  const topic = params.get('topic') || 'all';
  useScrollNavigation('/technicalskills', '/research', true);
  useEffect(() => { const timer = setTimeout(() => setLetterClass('text-animate-hover'), 4000); return () => clearTimeout(timer); }, []);
  const change = (value) => setParams(value === 'all' ? {} : { topic: value }, { replace: true });
  const visible = topic === 'all' ? allProjects : projects.filter((project) => project.categories.includes(topic));
  const returnTo = topic === 'all' ? '/projects' : `/projects?${new URLSearchParams({ topic })}`;
  const filtered = topic !== 'all';
  return <main className="projects-page container">
    <header className="projects-header">
      <div><h1 className="page-title"><AnimatedLetters letterClass={letterClass} strArray={'Projects & research'.split('')} idx={5} /></h1><p className="projects-intro">Robots, intelligent systems, and the engineering tools I build.</p></div>
      <a className="projects-github" href="https://github.com/oscarpoudel" target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" /> My GitHub <span aria-hidden="true">↗</span></a>
    </header>
    <section className="project-filters" aria-label="Project filters">
      <div className="project-topics" aria-label="Filter by expertise">
        <button aria-pressed={topic === 'all'} onClick={() => change('all')}>All areas <span>{projects.length}</span></button>
        {categories.map((category) => <button key={category.id} style={{ '--topic-accent': category.color }} aria-pressed={topic === category.id} onClick={() => change(category.id)}>{category.label}<span>{projects.filter((project) => project.categories.includes(category.id)).length}</span></button>)}
      </div>
    </section>
    <div className="project-results"><span role="status">{visible.length} {visible.length === 1 ? 'project' : 'projects'}{topic !== 'all' ? ` in ${categories.find((category) => category.id === topic)?.label || topic}` : ' to explore'}</span>{filtered && <button onClick={() => setParams({}, { replace: true })}>Clear filters ×</button>}</div>
    <div className="projects-grid">
      {visible.map((project) => {
        const primary = categories.find((category) => category.id === project.categories[0]);
        const destination = `/projects/${project.id}`;
        const github = project.links?.find((link) => link.label === 'GitHub');
        const paper = project.publications?.find((publication) => publication.url);
        return <article className="project-card" key={project.id} style={{ '--project-accent': primary.color }}>
          <div className="project-card-media">
            <Link className="project-cover-link" to={destination} state={{ from: returnTo }} tabIndex={-1} aria-hidden="true"><ProjectVisual project={project} /></Link>
            <span className="project-type-badge">{project.origin === 'research' ? 'Research system' : 'Build & tool'}</span>
          </div>
          <div className="project-card-content">
            <div className="project-card-meta"><span>{primary.label}</span><span>{project.yearLabel || project.year || (project.featured ? 'Featured build' : 'Build & tool')}</span></div>
            <h2><Link to={destination} state={{ from: returnTo }} title={project.title}><span className="project-card-title">{project.title}</span><span aria-hidden="true">↗</span></Link></h2>
            <p>{project.description}</p>
            <div className="project-tags">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="project-card-footer"><Link to={destination} state={{ from: returnTo }}>Explore project <span aria-hidden="true">→</span></Link>{github ? <a href={github.url} target="_blank" rel="noopener noreferrer" aria-label={`GitHub source for ${project.title}`}><FaGithub aria-hidden="true" /> Code ↗</a> : paper ? <a href={paper.url} target="_blank" rel="noopener noreferrer">Related paper ↗</a> : <span>{project.platforms[0]}</span>}</div>
          </div>
        </article>;
      })}
    </div>
    {!visible.length && <div className="projects-empty"><h2>No matching projects yet.</h2><p>Try a different expertise area.</p><button onClick={() => setParams({}, { replace: true })}>Show all projects</button></div>}
  </main>;
}
