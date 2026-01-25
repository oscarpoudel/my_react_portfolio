import React, { useEffect, useState } from 'react'
import './Technicalskills.scss';
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters'
import useScrollNavigation from '../../hooks/useScrollNavigation'

// Icons for cards
import { FaPython, FaJava, FaCuttlefish, FaLinux, FaWindows } from 'react-icons/fa'
import {
  SiPytorch, SiTensorflow, SiScikitlearn, SiApachehadoop, SiApachespark,
  SiArduino, SiLatex,
  SiPydantic,
  SiLangchain,
  SiJavascript,
  SiUnity,
} from 'react-icons/si'

const randomIcons = [
  <SiPytorch />, <SiTensorflow />, <SiScikitlearn />, <FaPython />, <FaJava />, <FaCuttlefish />,
  <SiApachehadoop />, <SiApachespark />, <SiArduino />, <SiLatex />,
  <FaLinux />, <FaWindows />
]

const getRandomPositionStyle = () => ({
  top: `${Math.floor(Math.random() * 80)}%`,
  left: `${Math.floor(Math.random() * 80)}%`,
  color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
})

const TechnicalSkills = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  // Next: Contact, Prev: Research
  useScrollNavigation('/contact', '/projects', true)

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container technical-skills-page">
      <h1 className="page-title">
        <AnimatedLetters strArray={'Skills'.split('')} idx={15} letterClass={letterClass} />
      </h1>

      <div className="skills-columns">
        {/* Left Column - Skill Cards */}
        <div className="skills-left">
          <div className="skill-box">
            <h2>Civil Engieering-Softwares</h2>
            <p>ETABS, RAM, Rhino, Revit, Robot, Microsoft Project, Primavera </p>
          </div>
          <div className="skill-box">
            <h2>AI/GenAI and Agent Orchestration </h2>
            <p><SiPytorch /> PyTorch &nbsp;&nbsp; <SiTensorflow /> TensorFlow &nbsp;&nbsp; <SiScikitlearn /> scikit-learn &nbsp;&nbsp; <SiPydantic /> Pydantic AI  &nbsp;&nbsp; <SiLangchain /> Langchain</p>
          </div>
          
          <div className="skill-box">
            <h2>Programming Languages</h2>
            <p><FaPython /> Python &nbsp;&nbsp; <FaCuttlefish /> C/C++ &nbsp;&nbsp; <SiUnity/> C-Sharp &nbsp;&nbsp; <SiJavascript/> Javascript </p>
          </div>
          <div className="skill-box">
            <h2>Cluster Computing</h2>
            <p><SiApachehadoop /> Hadoop &nbsp;&nbsp; <SiApachespark /> Spark, HPC (Slurm)</p>
          </div>
          <div className="skill-box">
            <h2>Embedded and Robotics Systems</h2>
            <p><SiArduino /> Arduino, Microcontrollers, ROS2, Gazebo, Unity XR/AR & Robotics simulation</p>
          </div>
          <div className="skill-box">
            <h2>Technical Software</h2>
            <p>Simulink, AutoCAD, Fusion360,</p>
          </div>
          <div className="skill-box">
            <h2>Professional Skills</h2>
            <p>Scientific Reporting, Grant Writing, Teaching</p>
          </div>
          <div className="skill-box">
            <h2>Computer Literacy</h2>
            <p><FaWindows /> Windows &nbsp;&nbsp; <FaLinux /> Linux &nbsp;&nbsp; <SiLatex /> LaTeX</p>
          </div>
        </div>

        {/* Right Column - Icons only */}
        <div className="skills-right">
          <div className="floating-icons-container">
            {randomIcons.map((icon, idx) => (
              <div className="floating-icon" key={idx} style={getRandomPositionStyle()}>
                {icon}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default TechnicalSkills
