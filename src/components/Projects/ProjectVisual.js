import React, { useState } from 'react';
import { FaBrain, FaBuilding, FaCity, FaDog, FaEye, FaHelicopter, FaMicrochip, FaRobot } from 'react-icons/fa';
import projectData from '../../data/projects.json';
import projectShowcases from '../../data/projectShowcases.json';
import { resolveMedia, useMediaLibrary } from '../../media/mediaLibrary';

const icons = { robotics: FaRobot, ai: FaBrain, bim: FaBuilding, vision: FaEye, sensing: FaMicrochip, buildings: FaCity };

export default function ProjectVisual({ project }) {
  const [failed, setFailed] = useState(false);
  const media = useMediaLibrary();
  const category = projectData.categories.find((item) => item.id === project.categories?.[0]) || projectData.categories[0];
  const Icon = project.platforms?.includes('Quadruped') ? FaDog : project.platforms?.includes('UAV') ? FaHelicopter : icons[category.id];
  const cover = media.projects[project.id]?.[0] || projectShowcases[project.id]?.cover;
  const image = cover?.src || project.image;
  const source = image && resolveMedia(image, 900);
  return <div className={`project-visual ${source && !failed ? 'has-image' : 'is-illustrated'}`} style={{ '--project-accent': category.color }} aria-hidden={!cover ? true : undefined}>
    {source && !failed ? <img src={source} alt={cover?.title || ''} loading="lazy" onError={() => setFailed(true)} /> : <>
      <svg className="project-visual-lines" viewBox="0 0 400 220" preserveAspectRatio="none"><path d="M0 45H90L150 110H250L310 45H400M0 175H90L150 110M250 110L310 175H400M200 0V70M200 150V220" /><circle cx="150" cy="110" r="5" /><circle cx="250" cy="110" r="5" /></svg>
      <span className="project-visual-icon"><Icon /></span><span className="project-visual-label">{project.platforms?.[0] || category.label}</span>
    </>}
  </div>;
}
