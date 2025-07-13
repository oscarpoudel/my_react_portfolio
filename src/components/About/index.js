import './index.scss';
import React, { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCss3, faGitAlt, faJsSquare, faPython, faReact } from '@fortawesome/free-brands-svg-icons';
import { faBuilding, faHelmetSafety } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loaders';
import workImg from '../../assets/images/work2_bg.png';

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  useEffect(() => {

    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <>
      <div className='container about-page abt-pg'>
        <div className='text-zone'>
          <h1>
            <AnimatedLetters letterClass={letterClass} strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15} />
          </h1>

          <h2>
          I am a PhD candidate in Civil Engineering, specializing in the integration of robotics and artificial
           intelligence into civil engineering systems. With a background in structural engineering and programming, 
           my research focuses on advancing automation and modernizing infrastructure through AI, computer vision, machine
            listening, and reinforcement learning. I work extensively on developing intelligent robotic systems using deep 
            learning and ROS2, with additional expertise in electronics, IoT, and edge computing. My hands-on experience includes
             PCB design, 3D printing, and embedded system development with platforms such as Raspberry Pi, Jetson, Pico, and STM32.
              I aim to drive innovation in civil engineering by combining practical domain knowledge with cutting-edge technologies.
          </h2>

          <h1>
            <AnimatedLetters letterClass={letterClass} strArray={['Education']}
              idx={16} />
          </h1>
          <h2>
            
            <strong>Ph.D. in Civil Engineering</strong><br/>
            NJIT, 2023 – <br/><br/>

            <strong>B.Sc. in Civil Engineering</strong><br/>
            IOE Pulchowk Campus,Nepal, 2022<br/>
          </h2>
        </div>
        <div className='sideImage'>
            <img  src = {workImg}/>
        </div>
      </div>
      
    </>
  )
}

export default About