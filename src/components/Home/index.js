import './index.scss';
import { Link } from 'react-router-dom';
import AnimatedLetters from '../AnimatedLetters';
import React,{useState,useEffect} from 'react';
import HomeImg from '../../assets/images/home_img_upd.png'
import vectorforimage from '../../assets/images/blur_vec.png'
import { faGraduationCap,faHome,faPeoplePulling,faSuitcase,faUser, } from '@fortawesome/free-solid-svg-icons';
import { faOrcid,faLinkedin,faFacebook, faGithub, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
// 'C','i','v','i','l',' '
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
    const [letterClass,setLetterClass] = useState('text-animate')
    const nameArray = [' ','O','S','C','A','R',' ',]
    const jobArray =[
  "A",' ','R', 'e', 's', 'e', 'a', 'r', 'c', 'h', 'e', 'r',
  ':',
  ' ',
  'A', 'I', '/',
  'R', 'o', 'b', 'o', 't', 'i', 'c', 's',
  ' ',
  'i', 'n',
  ' ',
  'C', 'E',
  ' '
]
    useEffect(() => {
         setTimeout(() => {
          return setLetterClass('text-animate-hover')
        }, 4000)
      }, [])
    return (
        <>
        <div className='container home-page'>
            <div className='text-zone'>
                <h1>
                    {/* <span className='letterClass'>H</span> */}
                    <span className={`${letterClass} _12`}>Hi,</span>
                    <br /> 
                    <span className={`${letterClass} _13`}>I&nbsp;</span>
                    <span className={`${letterClass} _14`}> am, </span>
                 {/* <img src={LogoTitle} alt='Civil' />  */}
               <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15}/>
                <br/>
               <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={23}/>
                </h1>
                <h2>Ph.D. Candidate, | Graduate Research Assistant<br/>
                    Smart Construction and Intelligent Infrastructure Systems (SCIIS) Lab (https://sciis.njit.edu/)<br/>
                    John A. Reif, Jr. Department of Civil & Environmental Engineering<br/>
                    New Jersey Institute of Technology<br/>
                    University Heights<br/>
                    Newark, New Jersey 07102</h2>
                <h2></h2>

                <div className='social-mid-page' >
                        <ul>
                          <li>
                            <a 
                            target="_black"
                            rel ="noreferrer"
                            href="https://scholar.google.com/citations?user=NWVoANsAAAAJ&hl=en">
                            <FontAwesomeIcon icon={faGraduationCap} color = '#4d4d4e'/>
                            </a>
                        </li>
                            <li>
                                <a 
                                target="_black"
                                rel ="noreferrer"
                                href="https://github.com/oscarpoudel">
                
                                <FontAwesomeIcon icon={faGithub} color = '#4d4d4e'/>
                                </a>
                            </li>

                            <li>
                                <a 
                                target="_black"
                                rel ="noreferrer"
                                href="https://www.linkedin.com/in/oscar-poudel-6b5674156/">
                
                                <FontAwesomeIcon icon={faLinkedin} color = '#4d4d4e'/>
                                </a>
                            </li>
                            <li>
                                            <a 
                                            target="_black"
                                            rel ="noreferrer"
                                            href="https://orcid.org/0009-0007-0643-7974">
                            
                                            <FontAwesomeIcon icon={faOrcid} color = '#4d4d4e'/>
                                            </a>
                            </li>
                            <li>
                                <a 
                                target="_black"
                                rel ="noreferrer"
                                href="https://www.youtube.com/c/TheAmazicellentHacker">
                
                                <FontAwesomeIcon icon={faYoutube} color = '#4d4d4e'/>
                                </a>
                            </li>
                        </ul>
                        </div>
                                <a
                  href="/images/1/Oscar_PhD_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flat-button cv-button"
                >
                  Download CV
                </a>                
                <span>   </span>
                <Link to='/contact' className='flat-button'>Contact</Link>
            </div>
           
           
            <div className = 'sideImage'>
                <div className='image1'>
                    <img src ={HomeImg}/>
                    </div>
                  <div className='vec'>
                <img  src = {vectorforimage}/>
                    </div>  
            </div>
        </div>
       
        </>
    )
}

export default Home