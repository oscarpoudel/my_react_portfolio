import './index.scss';
import React, { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCss3, faGitAlt, faJsSquare, faPython, faReact } from '@fortawesome/free-brands-svg-icons';
import { faBuilding, faHelmetSafety } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loaders';


const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  useEffect(() => {

    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <>
      <div className='container about-page'>
        <div className='text-zone'>
          <h1>
            <AnimatedLetters letterClass={letterClass} strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15} />
          </h1>

          <p>
            I'm a civil engineer passout from Institure of Engineering, Pulchowk campus. I am continously working in sector of building and structure engineering.
          </p>
          <p>
            I'm also a self learned skilled computer developer been researching and working  in the field of machine learning, full stack developer. i'm a confident and curious guy continuously improving and can eaily meet your demand.
          </p>
          <p>
            Just love to do new things , solve problems and keep pushing forward !!
          </p>
        </div>
        <div className='stage-cube-cont'>
          <div className='cubespinner'>
            <div className='face1'>
              <FontAwesomeIcon icon={faBuilding} color='#DD0031' />
            </div>
            <div className='face2'>
              <FontAwesomeIcon icon={faPython} color='#f06529' />
            </div>
            <div className='face3'>
              <FontAwesomeIcon icon={faHelmetSafety} color='#28a4d9' />
            </div>
            <div className='face4'>
              <FontAwesomeIcon icon={faReact} color='#5ed4f4' />
            </div>
            <div className='face5'>
              <FontAwesomeIcon icon={faJsSquare} color='#efd81d' />
            </div>
            <div className='face6'>
              <FontAwesomeIcon icon={faGitAlt} color='#ec4d28' />
            </div>
          </div>
        </div>
      </div>
      <Loader type='pacman'></Loader>
    </>
  )
}

export default About