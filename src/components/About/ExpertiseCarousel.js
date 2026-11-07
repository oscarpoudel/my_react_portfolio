import React, { useEffect, useState } from 'react';
import robotics from '../../assets/research_topics/robotics.webp';
import interaction from '../../assets/research_topics/virtualization-interaction.webp';
import sensing from '../../assets/research_topics/sensing-wearables-iot.webp';
import ai from '../../assets/research_topics/artificial-intelligence.webp';
import bim from '../../assets/research_topics/bim-structural-engineering.webp';

const topics = [
  { title: 'Robotics', image: robotics },
  { title: 'Virtualization & interaction', image: interaction },
  { title: 'Sensing, wearables & IoT', image: sensing },
  { title: 'Artificial intelligence', image: ai },
  { title: 'BIM & structural engineering', image: bim },
];

export default function ExpertiseCarousel({ introDelay = 0 }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [ready, setReady] = useState(introDelay === 0);
  useEffect(() => {
    if (reduced) { setReady(true); return; }
    const timer = setTimeout(() => setReady(true), introDelay);
    return () => clearTimeout(timer);
  }, [introDelay, reduced]);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motion = () => setReduced(query.matches);
    const visibility = () => setHidden(document.hidden);
    query.addEventListener('change', motion);
    document.addEventListener('visibilitychange', visibility);
    return () => { query.removeEventListener('change', motion); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => {
    if (!ready || paused || hovered || hidden || reduced) return;
    const timer = setTimeout(() => setActive((current) => (current + 1) % topics.length), 3800);
    return () => clearTimeout(timer);
  }, [active, paused, hovered, hidden, reduced, ready]);
  const move = (direction) => setActive((current) => (current + direction + topics.length) % topics.length);
  return <section className="expertise-carousel" aria-label="Research expertise carousel" aria-roledescription="carousel">
    <div className="expertise-heading"><span className="expertise-kicker">AREAS I WORK IN</span><span className="expertise-counter">0{active + 1} / 05</span></div>
    <div className="expertise-reel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setHovered(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false); }}>
      {topics.map((topic, index) => {
        let offset = (index - active + topics.length) % topics.length;
        if (offset > 2) offset -= topics.length;
        return <button key={topic.title} className={`expertise-panel ${offset === 0 ? 'is-active' : ''} ${Math.abs(offset) === 2 ? 'is-away' : ''}`} style={{ '--offset': offset, '--panel-scale': offset === 0 ? 1 : .92 }} onClick={() => setActive(index)} aria-label={`View expertise: ${topic.title}`} aria-pressed={offset === 0} tabIndex={Math.abs(offset) <= 1 ? 0 : -1}>
          <img src={topic.image} alt={`Research expertise in ${topic.title}`} draggable="false" />
        </button>;
      })}
    </div>
    <div className="expertise-bottom"><div><span className="expertise-kicker">IN FOCUS</span><h2>{topics[active].title}</h2></div><div className="expertise-controls"><button onClick={() => move(-1)} aria-label="Previous expertise">↑</button><button onClick={() => setPaused(!paused)} aria-label={paused ? 'Play expertise carousel' : 'Pause expertise carousel'} aria-pressed={paused}>{paused ? '▶' : 'Ⅱ'}</button><button onClick={() => move(1)} aria-label="Next expertise">↓</button></div></div>
    <div className="expertise-progress" aria-hidden="true">{topics.map((topic, index) => <span key={topic.title} className={index === active ? 'is-active' : ''} />)}</div>
  </section>;
}
