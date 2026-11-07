import React, { createContext, useContext } from 'react';
import legacy from '../../data/projectMedia.json';
import { resolveMedia, useMediaLibrary } from '../../media/mediaLibrary';

export const ProjectMediaContext = createContext(null);

// Keep the existing case-study prose and layouts while delivering its images
// from the same ImageKit assets as the header carousel.
export default function ProjectCaseImage(props) {
  const id = useContext(ProjectMediaContext);
  const media = useMediaLibrary();
  const original = legacy[id]?.find((figure) => figure.source === props.src || figure.title === props.alt);
  const current = original && media.projects[id]?.find((figure) => figure.src === original.src);
  if (original && !current) return null;
  return <img {...props} alt={props.alt || ''} src={current ? resolveMedia(current.src, 1800) : props.src} />;
}
