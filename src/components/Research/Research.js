import React, { useState, useEffect } from 'react'
import './Research.scss';
import researchData from '../../data/research.json'
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters'
import useScrollNavigation from '../../hooks/useScrollNavigation'

const Portfolio = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    // Next: Technical Skills, Prev: Projects
    useScrollNavigation('/projects', '/about', true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    const sortedPapers = [...researchData.papers].sort((a, b) => b.id - a.id)

    return (
        <div className="container research-page">
            <h1 className="page-title">
                <AnimatedLetters
                    letterClass={letterClass}
                    strArray={'Research Publications'.split('')}
                    idx={15}
                />
            </h1>
            <div className="research-list">
                {sortedPapers.map((paper) => (
                    <div key={paper.id} className="citation-box">
                        <div className="id-number">{paper.id}.</div>
                        <div className="paper-title">{paper.title}</div>
                        <span className="citation-text">{paper.citation}</span>{paper.link && (<a href={paper.link} target="_blank" rel="noopener noreferrer" className="paper-link">[View Paper]</a>)}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Portfolio
