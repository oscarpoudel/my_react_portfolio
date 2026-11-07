import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import './Research.scss';
import researchData from '../../data/research.json'
import projectData from '../../data/projects.json'
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters'
import useScrollNavigation from '../../hooks/useScrollNavigation'

const Portfolio = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const [params, setParams] = useSearchParams()
    const topic = params.get('topic') || 'all'
    const type = params.get('type') || 'all'
    const change = (key, value) => {
        const next = new URLSearchParams(params)
        if (value === 'all') next.delete(key); else next.set(key, value)
        setParams(next, { replace: true })
    }
    // Next: Technical Skills, Prev: Projects
    useScrollNavigation('/projects', '/about', true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)
        return () => clearTimeout(timer)
    }, [])

    const sortedPapers = [...researchData.papers].sort((a, b) => b.id - a.id)
    const byType = sortedPapers.filter((paper) => type === 'all' || paper.type === type)
    const visiblePapers = byType.filter((paper) => topic === 'all' || paper.categories?.includes(topic))

    return (
        <div className="container research-page">
            <h1 className="page-title">
                <AnimatedLetters
                    letterClass={letterClass}
                    strArray={'Research Publications'.split('')}
                    idx={15}
                />
            </h1>
            <section className="research-filters" aria-label="Paper filters">
                <div className="research-topic-buttons" aria-label="Filter papers by topic">
                    <button aria-pressed={topic === 'all' && type === 'all'} onClick={() => setParams({}, { replace: true })}>All papers <span>{sortedPapers.length}</span></button>
                    {projectData.categories.map((category) => <button key={category.id} aria-pressed={topic === category.id} onClick={() => change('topic', category.id)} style={{ '--topic-accent': category.color }}>{category.label}<span>{byType.filter((paper) => paper.categories?.includes(category.id)).length}</span></button>)}
                </div>
                <div className="research-filter-bottom"><span role="status">{visiblePapers.length} {visiblePapers.length === 1 ? 'paper' : 'papers'} shown</span><label><span>Publication type</span><select aria-label="Publication type" value={type} onChange={(event) => change('type', event.target.value)}><option value="all">All publication types</option><option value="journal">Journal articles</option><option value="conference">Conference papers</option></select></label></div>
            </section>
            <div className="research-list">
                {visiblePapers.map((paper) => (
                    <div key={paper.id} className="citation-box">
                        <div className="id-number">{paper.id}.</div>
                        <span className="citation-text">{paper.citation}</span>{paper.link && (<a href={paper.link} target="_blank" rel="noopener noreferrer" className="paper-link">[View Paper]</a>)}
                    </div>
                ))}
            </div>
            {!visiblePapers.length && <div className="research-empty"><p>No papers match this combination.</p><button onClick={() => setParams({}, { replace: true })}>Show all papers</button></div>}
        </div>
    )
}

export default Portfolio
