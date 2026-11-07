import React, { useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiPause, FiPlay, FiMaximize2 } from 'react-icons/fi';
import { resolveMedia } from '../../media/mediaLibrary';

const assetUrl = resolveMedia;
const transitions = ['drift-left', 'soft-focus', 'drift-right'];
const borderColors = ['#efc36a', '#73bab0', '#df947d', '#b5a0d2', '#a9c47b', '#91b4d5', '#d7a4b8', '#dba85e', '#91c2a1', '#c8b1d6'];

export default function ProjectFigures({ figures }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const engaged = hovered || focused;
  const [visible, setVisible] = useState(() => !document.hidden);
  const dialogRef = useRef(null);
  const railRef = useRef(null);
  const workspaceRef = useRef(null);
  const touchStart = useRef(null);
  const [workspace, setWorkspace] = useState({ width: 600, height: window.innerHeight, mobile: window.innerWidth <= 600 });
  const [dimensions, setDimensions] = useState({});
  const figure = figures[Math.min(activeIndex, figures.length - 1)];
  const imageSize = dimensions[figure.src] || figure;
  const ratio = imageSize.width && imageSize.height ? imageSize.width / imageSize.height : 1.5;
  const portrait = ratio < .9 && figures.length > 1;
  const availableWidth = Math.max(100, workspace.width * (portrait ? .64 : 1) - (portrait ? 14 : 6));
  const maxHeight = Math.min(380, Math.max(215, workspace.height * (workspace.mobile ? .31 : .34)));
  const frameHeight = Math.min(maxHeight, availableWidth / ratio);
  const frameWidth = frameHeight * ratio;
  const move = (direction) => setActiveIndex((index) => (index + direction + figures.length) % figures.length);

  useEffect(() => { setActiveIndex((index) => Math.min(index, figures.length - 1)); }, [figures.length]);

  useEffect(() => {
    const element = workspaceRef.current;
    const resize = () => setWorkspace((current) => {
      const next = { width: element.clientWidth, height: window.innerHeight, mobile: window.innerWidth <= 600 };
      return current.width === next.width && current.height === next.height && current.mobile === next.mobile ? current : next;
    });
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    window.addEventListener('resize', resize);
    resize();
    return () => { observer.disconnect(); window.removeEventListener('resize', resize); };
  }, []);

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (!playing || engaged || isOpen || !visible || figures.length < 2) return undefined;
    const timer = setTimeout(() => setActiveIndex((index) => (index + 1) % figures.length), 8000);
    return () => clearTimeout(timer);
  }, [playing, engaged, isOpen, visible, activeIndex, figures.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    const rail = railRef.current;
    const thumbnail = rail?.children[activeIndex];
    if (thumbnail) rail.scrollTo({ left: portrait ? 0 : thumbnail.offsetLeft - rail.clientWidth / 2 + thumbnail.clientWidth / 2, top: portrait ? thumbnail.offsetTop - rail.clientHeight / 2 + thumbnail.clientHeight / 2 : 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, [activeIndex, portrait]);

  const arrowKeys = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  };

  return <div className="project-carousel" data-orientation={portrait ? 'portrait' : 'landscape'} style={{ '--image-accent': borderColors[activeIndex % borderColors.length], '--frame-height': `${frameHeight + 6}px` }} role="region" aria-roledescription="carousel" aria-label="Project images"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onKeyDown={arrowKeys}>
    <div className="project-carousel-controls">
      <span className="project-carousel-count"><strong>{String(activeIndex + 1).padStart(2, '0')}</strong><span>/ {String(figures.length).padStart(2, '0')}</span></span>
      {figures.length > 1 && <div><button className="project-carousel-play" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}>{playing ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}{playing ? 'Pause' : 'Play'}</button>
        <button className="project-carousel-arrow" onClick={() => move(-1)} aria-label="Previous image"><FiArrowLeft aria-hidden="true" /></button><button className="project-carousel-arrow" onClick={() => move(1)} aria-label="Next image"><FiArrowRight aria-hidden="true" /></button></div>}
    </div>
    <div className="project-carousel-workspace" ref={workspaceRef}>
    <button className="project-carousel-stage" style={{ width: frameWidth, height: frameHeight }} onClick={() => setIsOpen(true)} aria-label={`Enlarge: ${figure.title}`}
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current !== null) {
          const distance = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(distance) > 45) { event.preventDefault(); move(distance < 0 ? 1 : -1); }
          touchStart.current = null;
        }
      }}>
      <img key={figure.src} className={`project-carousel-image ${transitions[activeIndex % transitions.length]}`} src={assetUrl(figure.src, 1600)} alt={figure.title} onLoad={(event) => {
        const { naturalWidth, naturalHeight } = event.currentTarget;
        setDimensions((current) => current[figure.src]?.width === naturalWidth && current[figure.src]?.height === naturalHeight ? current : { ...current, [figure.src]: { width: naturalWidth, height: naturalHeight } });
      }} />
      <span className="project-carousel-enlarge" aria-hidden="true"><FiMaximize2 /> Expand</span>
    </button>
    {figures.length > 1 && <div className="project-carousel-thumbnails" ref={railRef} aria-label="Choose a project image">
      {figures.map((item, index) => <button key={item.src} onClick={() => setActiveIndex(index)} aria-label={`Image ${index + 1}: ${item.title}`} aria-current={activeIndex === index ? 'true' : undefined}>
        <img src={assetUrl(item.src, 240)} alt="" loading="lazy" /><span aria-hidden="true">{index + 1}</span>
      </button>)}
    </div>}
    </div>
    <div className="project-carousel-progress" aria-hidden="true"><span style={{ width: `${(activeIndex + 1) / figures.length * 100}%` }} /></div>
    <div className="project-carousel-caption" aria-live={playing && !engaged ? 'off' : 'polite'} aria-atomic="true"><h2>{figure.title}</h2>{figure.caption && <p>{figure.caption}</p>}</div>
    <dialog ref={dialogRef} className="project-figure-dialog" aria-labelledby="project-figure-title"
      onClose={() => { if (!dialogRef.current?.open) setIsOpen(false); }}
      onClick={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
      {isOpen && <div className="figure-viewer-content">
        <div className="figure-viewer-toolbar"><span>{activeIndex + 1} / {figures.length}</span><button onClick={() => setIsOpen(false)} aria-label="Close image">Close ×</button></div>
        <img className="figure-viewer-image" src={assetUrl(figure.src)} alt={figure.title} />
        <div className="figure-viewer-caption"><h2 id="project-figure-title">{figure.title}</h2><p>{figure.caption}</p></div>
        <div className="figure-viewer-actions"><button onClick={() => move(-1)} aria-label="Previous enlarged image">← Previous</button><a href={assetUrl(figure.original)} target="_blank" rel="noopener noreferrer">Full resolution ↗</a><button onClick={() => move(1)} aria-label="Next enlarged image">Next →</button></div>
      </div>}
    </dialog>
  </div>;
}
