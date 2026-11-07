import React, { useEffect, useRef, useState } from 'react'
import './Technicalskills.scss';
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters'
import useScrollNavigation from '../../hooks/useScrollNavigation'
import { FaPython, FaJava, FaCuttlefish, FaLinux, FaWindows, FaRobot, FaDraftingCompass, FaMapMarkedAlt, FaMicrochip, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa'
import { SiPytorch, SiTensorflow, SiScikitlearn, SiApachehadoop, SiApachespark, SiArduino, SiLatex, SiJavascript } from 'react-icons/si'

const skills = [
  { title: 'Civil Engineering Tools', tools: 'ETABS, SAP2000, SAFE, PERFORM3D, OpenSees/OpenSeesPy, Autodesk Robot Structural Analysis, RCDC, IDEA StatiCa, Grasshopper, RAM.' },
  { title: 'BIM, CAD, and Geospatial', tools: 'Revit, AutoCAD, Civil 3D, SketchUp, QGIS, SNAP, reality capture and point-cloud workflows, MathCad, Rhino, Fusion360.' },
  { title: 'Project Management Tools', tools: 'Primavera P6, MS Project, Bluebeam.' },
  { title: 'Programming and Scientific Computing', tools: 'Python, C/C++, C#, MATLAB, JavaScript; Git; Linux; Docker; AWS; Simulink; scientific reporting and reproducible research workflows.' },
  { title: 'AI, Machine Learning, and GenAI', tools: 'PyTorch, TensorFlow, scikit-learn, OpenCV, transformers, deep learning, computer vision, machine listening, reinforcement learning, LLM/VLM systems, LangChain, PydanticAI, retrieval-augmented generation, multi-agent systems.' },
  { title: 'Robotics and Simulation', tools: 'ROS2, Nav2, MoveIt, Isaac Sim, Gazebo, Webots, Unity AR/VR/XR, SLAM, robot teleoperation, autonomous navigation, sensor fusion.' },
  { title: 'Embedded Systems and Sensing', tools: 'NVIDIA Jetson, Raspberry Pi, Arduino, microcontrollers, PCB design, IoT, LiDAR, RGB-D imaging, thermal sensing, acoustic sensing.' },
  { title: 'Cluster Computing', tools: 'Hadoop, Spark, HPC (Slurm).' },
  { title: 'Professional Skills', tools: 'Scientific reporting, grant writing, teaching.' },
  { title: 'Platforms and Documentation', tools: 'Windows, Linux, LaTeX.' },
]

const icons = [SiPytorch, SiTensorflow, SiScikitlearn, FaPython, FaJava, FaCuttlefish, SiApachehadoop, SiApachespark, SiArduino, SiLatex, FaLinux, FaWindows, FaRobot, FaDraftingCompass, FaMapMarkedAlt, FaMicrochip, FaGitAlt, FaDocker, FaAws, SiJavascript]
const positions = () => {
  const cells = icons.map((_, index) => index)
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cells[i], cells[j]] = [cells[j], cells[i]]
  }
  return cells.map((cell) => ({ left: `${10 + (cell % 5) * 20}%`, top: `${12 + Math.floor(cell / 5) * 25}%`, '--tilt': `${Math.round(Math.random() * 16 - 8)}deg` }))
}

const TechnicalSkills = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [locations, setLocations] = useState(positions)
  const [paused, setPaused] = useState(false)
  const iconField = useRef(null)
  const [hidden, setHidden] = useState(document.hidden)
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [introComplete, setIntroComplete] = useState(false)
  useScrollNavigation('/contact', '/projects', true)

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 4000)
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (reduced) { setIntroComplete(true); return }
    const timer = setTimeout(() => setIntroComplete(true), 1800)
    return () => clearTimeout(timer)
  }, [reduced])
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const motion = () => setReduced(query.matches)
    const visibility = () => setHidden(document.hidden)
    query.addEventListener('change', motion)
    document.addEventListener('visibilitychange', visibility)
    return () => { query.removeEventListener('change', motion); document.removeEventListener('visibilitychange', visibility) }
  }, [])
  useEffect(() => {
    if (!introComplete || paused || hidden || reduced) return
    const timer = setInterval(() => setLocations(positions()), 5800)
    return () => clearInterval(timer)
  }, [introComplete, paused, hidden, reduced])
  useEffect(() => {
    iconField.current?.getAnimations({ subtree: true }).forEach((animation) => {
      if (paused || hidden) animation.pause()
      else if (!reduced) animation.play()
    })
  }, [paused, hidden, reduced])

  return <main className="container technical-skills-page">
    <h1 className="page-title"><AnimatedLetters strArray={'Skills'.split('')} idx={15} letterClass={letterClass} /></h1>
    <div className="skills-columns">
      <div className="skills-left">
        {skills.map((skill) => <section className="skill-box" key={skill.title}><h2>{skill.title}</h2><p>{skill.tools}</p></section>)}
      </div>
      <aside ref={iconField} className={`skills-right ${paused || hidden || reduced ? 'motion-paused' : ''}`} aria-label="Animated technology icons">
        <div className="icon-field-heading"><span>ACROSS DISCIPLINES</span><button onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Resume animation' : 'Pause animation'}</button></div>
        <div className="floating-icons-container" aria-hidden="true">
          {icons.map((Icon, index) => <div className="floating-icon" key={index} style={{ ...locations[index], color: `hsl(${(index * 47 + 22) % 360}, 55%, 40%)`, '--bob-delay': `${-index * .37}s` }}><Icon /></div>)}
        </div>
      </aside>
    </div>
  </main>
}
export default TechnicalSkills
