import './About.scss';
import React, { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters';
import ExpertiseCarousel from './ExpertiseCarousel';
import useScrollNavigation from '../../hooks/useScrollNavigation';

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  // Next: research, Prev: Home
  useScrollNavigation('/research', '/', true)
  useEffect(() => {

    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className='container about-page abt-pg'>
        <div className='text-zone'>
          <h1>
            <AnimatedLetters letterClass={letterClass} strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15} />
          </h1>

          <p>
            I am a Ph.D. candidate in Civil Engineering at the New Jersey Institute of Technology (NJIT), working at the intersection of artificial intelligence, robotics, and civil infrastructure. With a background in structural engineering, I am a hands-on researcher, engineer, and technology developer who enjoys turning innovative ideas into functional systems.
          </p>
          <p>
            My research focuses on embodied AI, construction robotics, human-robot interaction, computer vision, multimodal learning, reinforcement learning, and intelligent infrastructure systems. Beyond research, I am passionate about building real-world solutions that integrate software, electronics, and physical hardware. My technical experience spans ROS2, autonomous robotic systems, embedded computing, IoT, PCB design, 3D printing, and AI-powered engineering applications.
          </p>
          <p>
            Whether designing structures, developing intelligent software, or building robotic systems, I enjoy solving challenging engineering problems by combining creativity, scientific reasoning, and practical implementation. My broader goal is to advance technologies that make engineering systems more intelligent, autonomous, efficient, and accessible.
          </p>

          <h1>
            <AnimatedLetters letterClass={letterClass} strArray={'Education'.split('')}
              idx={16} />
          </h1>
          <h2>
            
            <strong>Ph.D.</strong><br/>
            NJIT, 2023 – <br/><br/>

            {/* <strong>B.Sc. in Civil Engineering</strong><br/>
            IOE Pulchowk Campus,Nepal, 2022<br/> */}
          </h2>
        </div>
        <ExpertiseCarousel introDelay={1000} />
      </div>
      
    </>
  )
}

export default About
