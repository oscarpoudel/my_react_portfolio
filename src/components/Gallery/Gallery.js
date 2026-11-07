import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { resolveGalleryMedia, useMediaLibrary } from '../../media/mediaLibrary';
import './Gallery.scss';

export const mediaUrl = resolveGalleryMedia;
export const momentDuration = (step, type = 'image') => type === 'video'
  ? 18000 + Math.round(1500 * Math.sin(step))
  : Math.round(6500 + 2400 * Math.sin(step * 1.73) + 1100 * Math.cos(step * 0.91));
const fitWall = (stage, wall) => {
  const scale = window.innerWidth > 600 ? Math.min(1, stage.clientHeight / Math.max(1, wall.offsetHeight)) : 1;
  wall.style.setProperty('--wall-scale', scale);
  return scale;
};
const shuffled = (items) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
const initialWall = (moments) => {
  const video = moments.find((item) => item.type === 'video');
  return shuffled([...shuffled(moments.filter((item) => item.type !== 'video')).slice(0, video ? 6 : 7), ...(video ? [video] : [])]);
};

function MotionVideo({ item, active }) {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (entry.isIntersecting && active && !document.hidden) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.2 });
    observer.observe(video);
    const visibility = () => { if (document.hidden || !visible) video.pause(); else if (active) video.play().catch(() => {}); };
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); video.pause(); document.removeEventListener('visibilitychange', visibility); };
  }, [active]);
  return <video ref={ref} src={mediaUrl(item.playback || item.file)} width={item.width} height={item.height} muted loop playsInline preload="metadata" poster={item.poster ? mediaUrl(item.poster, 960) : undefined} aria-label={item.title} />;
}

function Collection({ items, playing, onOpen }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const thumbnailGrid = useRef(null);
  const browsing = hovered || focused;
  const item = items[index];
  useEffect(() => { setIndex((current) => Math.min(current, Math.max(0, items.length - 1))); }, [items.length]);
  const advance = (direction) => setIndex((current) => (current + direction + items.length) % items.length);
  useEffect(() => {
    if (!playing || browsing || items.length < 2) return;
    const timer = setTimeout(() => setIndex((current) => (current + 1) % items.length), item?.type === 'video' ? 14000 : 4000);
    return () => clearTimeout(timer);
  }, [playing, browsing, index, items.length, item?.type]);
  useEffect(() => {
    const grid = thumbnailGrid.current;
    const active = grid?.children[index];
    if (!active) return;
    if (active.offsetTop < grid.scrollTop) grid.scrollTop = active.offsetTop;
    else if (active.offsetTop + active.offsetHeight > grid.scrollTop + grid.clientHeight) grid.scrollTop = active.offsetTop + active.offsetHeight - grid.clientHeight;
  }, [index]);
  if (!item) return <p>More moments coming soon.</p>;
  return <section className="gallery-collection" aria-label="All moments slideshow">
    <div className="collection-feature">
      <button className="collection-main" onClick={() => onOpen(item.file)} aria-label={`Open featured moment: ${item.title}`}>
        {item.type === 'video' ? <MotionVideo key={item.file} item={item} active={playing} /> : <img key={item.file} src={mediaUrl(item.preview || item.file, 1600)} alt={item.alt || item.title} />}
      </button>
      <div className="collection-controls">
        <div className="collection-description"><span>{String(index + 1).padStart(2, '0')} / {items.length}{item.type === 'video' ? ' · FILM' : ''}</span><h2>{item.title}</h2></div>
        <div className="collection-arrows"><button onClick={() => advance(-1)} aria-label="Previous slide"><FiArrowLeft aria-hidden="true" /></button><button onClick={() => advance(1)} aria-label="Next slide"><FiArrowRight aria-hidden="true" /></button></div>
      </div>
    </div>
    <div className="collection-browser" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="collection-browser-heading"><span>Explore the collection</span><span>{items.length} moments</span></div>
    <div className="collection-thumbnails" ref={thumbnailGrid} aria-label="Select a moment">
      {items.map((moment, position) => <button key={moment.file} className="collection-thumbnail" aria-label={`Show moment: ${moment.title}`} aria-pressed={position === index} onClick={() => setIndex(position)} title={moment.title}>
        {moment.type === 'video' && !moment.poster ? <span aria-hidden="true">▶</span> : <img src={mediaUrl(moment.type === 'video' ? moment.poster : moment.preview || moment.file, 280)} alt="" loading="eager" />}
        {moment.type === 'video' && <span className="thumbnail-film" aria-hidden="true">▶</span>}
        <span className="thumbnail-number" aria-hidden="true">{String(position + 1).padStart(2, '0')}</span>
      </button>)}
    </div>
    </div>
  </section>;
}

function Viewer({ items, index, onClose, onNavigate }) {
  const dialog = useRef(null);
  const item = items[index];
  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    return () => element.close();
  }, []);
  return <dialog ref={dialog} className="gallery-viewer" onClose={() => { if (dialog.current && !dialog.current.open) onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={(event) => {
    if (event.target.tagName === 'VIDEO') return;
    if (event.key === 'ArrowRight') { event.preventDefault(); onNavigate(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); onNavigate(-1); }
  }} aria-label="Full-size gallery viewer">
    <div className="viewer-content">
      <div className="viewer-top"><span>{String(index + 1).padStart(2, '0')} / {items.length}</span><button autoFocus onClick={onClose} aria-label="Close viewer">Close ×</button></div>
      <div className="viewer-media" key={item.file}>
        {item.type === 'video' ? <video src={mediaUrl(item.playback || item.file)} controls autoPlay playsInline /> : <img src={mediaUrl(item.file)} alt={item.alt || item.title} />}
      </div>
      <div className="viewer-bottom"><div><h2>{item.title}</h2><p>{item.tags.join(' / ') || 'From my personal archive'}</p></div><div className="viewer-arrows"><button onClick={() => onNavigate(-1)} aria-label="Previous moment"><FiArrowLeft aria-hidden="true" /></button><button onClick={() => onNavigate(1)} aria-label="Next moment"><FiArrowRight aria-hidden="true" /></button></div></div>
    </div>
  </dialog>;
}

export default function Gallery() {
  const { gallery: moments } = useMediaLibrary();
  const [mode, setMode] = useState('showcase');
  const [tag, setTag] = useState('All');
  const [paused, setPaused] = useState(false);
  const rotationQueue = useRef([]);
  const rotationStep = useRef(0);
  const previousFrames = useRef(null);
  const stageRef = useRef(null);
  const wallRef = useRef(null);
  const [hidden, setHidden] = useState(document.hidden);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [slots, setSlots] = useState(() => initialWall(moments));
  const [leaving, setLeaving] = useState([]);
  const [openFile, setOpenFile] = useState(null);
  const tags = ['All', ...new Set(moments.flatMap((item) => item.tags))];
  const filtered = useMemo(() => moments.filter((item) => tag === 'All' || item.tags.includes(tag)), [moments, tag]);
  const playing = !paused && !hidden && !reduced && !openFile;

  useEffect(() => {
    setSlots((current) => {
      const selected = new Set();
      return current.map((item) => {
        const updated = filtered.find((candidate) => candidate.file === item.file && !selected.has(candidate.file)) || filtered.find((candidate) => !selected.has(candidate.file));
        if (updated) selected.add(updated.file);
        return updated;
      }).filter(Boolean);
    });
  }, [filtered]);

  useLayoutEffect(() => {
    const wall = wallRef.current;
    const stage = stageRef.current;
    if (!previousFrames.current || !wall || !stage || reduced || mode !== 'showcase') {
      previousFrames.current = null;
      return;
    }
    const scale = fitWall(stage, wall);
    const animations = Array.from(wall.children).map((card, index) => {
      const before = previousFrames.current[index];
      const after = card.getBoundingClientRect();
      if (!before || !after.width || !after.height) return null;
      return card.animate([
        { transform: `translate(${(before.left - after.left) / scale}px, ${(before.top - after.top) / scale}px) scale(${before.width / after.width}, ${before.height / after.height})`, transformOrigin: 'top left' },
        { transform: 'translate(0, 0) scale(1, 1)', transformOrigin: 'top left' }
      ], { duration: 1400, easing: 'cubic-bezier(.22, 1, .36, 1)' });
    });
    previousFrames.current = null;
    return () => animations.forEach((animation) => animation?.cancel());
  }, [slots, mode, reduced]);

  useEffect(() => {
    const stage = stageRef.current;
    const wall = wallRef.current;
    if (mode !== 'showcase' || !stage || !wall) return;
    const fit = () => fitWall(stage, wall);
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    observer.observe(wall);
    fit();
    return () => observer.disconnect();
  }, [mode]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motion = () => setReduced(query.matches);
    const visibility = () => setHidden(document.hidden);
    query.addEventListener('change', motion);
    document.addEventListener('visibilitychange', visibility);
    return () => { query.removeEventListener('change', motion); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  useEffect(() => {
    if (!playing || mode !== 'showcase' || filtered.length <= slots.length) return;
    let transition;
    const timer = setTimeout(() => {
      if (!rotationQueue.current.length) rotationQueue.current = shuffled(slots.map((_, index) => index));
      const changing = rotationQueue.current.splice(0, 2);
      const candidates = shuffled(filtered.filter((item) => !slots.some((shown) => shown.file === item.file)));
      const replacements = changing.slice(0, candidates.length).map((slot, index) => ({ slot, item: candidates[index] }));
      replacements.forEach(({ item }) => {
        const preview = item.type === 'video' ? item.poster : item.preview || item.file;
        if (preview) { const image = new Image(); image.src = mediaUrl(preview, 1200); }
      });
      setLeaving(replacements.map(({ slot }) => slot));
      transition = setTimeout(() => {
        previousFrames.current = Array.from(wallRef.current?.children || []).map((card) => card.getBoundingClientRect());
        rotationStep.current += 1;
        setSlots((current) => current.map((item, index) => replacements.find(({ slot }) => slot === index)?.item || item));
        setLeaving([]);
      }, 1000);
    }, momentDuration(rotationStep.current));
    return () => { clearTimeout(timer); clearTimeout(transition); setLeaving([]); };
  }, [playing, mode, filtered, slots]);

  const chooseTag = (value) => {
    setTag(value);
    rotationQueue.current = [];
    setSlots(shuffled(moments.filter((item) => value === 'All' || item.tags.includes(value))).slice(0, 7));
  };
  const displayed = mode === 'showcase' ? slots : filtered;
  const openIndex = filtered.findIndex((item) => item.file === openFile);

  return <main className={`gallery-page is-${mode}`}>
    <div className="gallery-inner">
      <header className="gallery-header">
        <div className="gallery-eyebrow"><span className="gallery-dot" /> THE PERSONAL ARCHIVE <span>OSCAR POUDEL</span></div>
        <div className="gallery-title-row"><h1>Life, in <span>frames.</span></h1><span className="gallery-handwritten">a little beyond the research</span></div>
        <div className="gallery-intro"><p>The PhD journey. The people. The in-between. A growing collection of moments along the way.</p></div>
      </header>

      <div className="gallery-toolbar">
        <div className="gallery-switch" aria-label="Gallery layout"><button aria-pressed={mode === 'showcase'} onClick={() => setMode('showcase')}>✦ Living wall</button><button aria-pressed={mode === 'collection'} onClick={() => setMode('collection')}>▦ All moments</button></div>
        <button className="gallery-pause" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? '▶ Resume motion' : 'Ⅱ Pause motion'}</button>
      </div>
      {tags.length > 1 && <div className="gallery-filters" aria-label="Filter by tag">{tags.map((value) => <button key={value} aria-pressed={tag === value} onClick={() => chooseTag(value)}>{value}</button>)}</div>}

      {mode === 'collection' ? <Collection key={tag} items={filtered} playing={playing} onOpen={setOpenFile} /> : <div className="gallery-stage" ref={stageRef}>
      <div className={`gallery-wall ${mode}`} ref={wallRef}>
        {displayed.map((item, index) => <button className={`gallery-card ${leaving.includes(index) ? 'is-leaving' : ''}`} key={mode === 'showcase' ? index : item.file} onClick={() => setOpenFile(item.file)} aria-label={`Open ${item.type === 'video' ? 'video' : 'photo'}: ${item.title}`} >
          <div className="gallery-card-media" key={item.file}>{item.type === 'video' ? <MotionVideo item={item} active={playing} /> : <img src={mediaUrl(item.preview || item.file, 1200)} alt={item.alt || item.title} width={item.width} height={item.height} loading={index < 3 ? 'eager' : 'lazy'} decoding="async" />}</div>
          {item.type === 'video' && <span className="gallery-video-badge">▶ FILM</span>}
          <span className="gallery-caption"><span>{item.tags[0] || (item.type === 'video' ? 'IN MOTION' : 'LIFE & THE PHD')}</span><strong>{item.title}</strong></span>
          <span className="gallery-open" aria-hidden="true">↗</span>
        </button>)}
      </div>
      </div>}
      {!displayed.length && <p className="gallery-empty">More moments coming soon.</p>}
      <footer className="gallery-footer"><span>Collected along the way. Still unfolding.</span><Link to="/">Back to my world ↗</Link></footer>
    </div>
    {openIndex >= 0 && <Viewer items={filtered} index={openIndex} onClose={() => setOpenFile(null)} onNavigate={(direction) => setOpenFile(filtered[(openIndex + direction + filtered.length) % filtered.length].file)} />}
  </main>;
}
