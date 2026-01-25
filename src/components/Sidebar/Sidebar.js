import './Sidebar.scss';
import LogoS from '../../assets/images/trans_logo_black.png';
import React,{useState} from 'react'
import { Link,NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop,faScrewdriverWrench, faBookBookmark, faEnvelope,faGraduationCap,faHome,faPeoplePulling,faUser, } from '@fortawesome/free-solid-svg-icons';
import { faOrcid,faLinkedin, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
const Sidebar = () => {
    const [isShown, setIsShown] = useState(false);
    const socialClicked =()=>{
        setIsShown(current => !current);
        console.log('div clicked')
        console.log(isShown)
    }
  return (
    <div className='nav-bar'>
        <Link className ='logo' to='/'>
            <img src = {LogoS} alt = 'logo' />
            <p className='myName'>Oscar Poudel</p>
        </Link>
        <nav>
            <NavLink exact = "true" activeclassname='active' className='home-link' to='/'>
                <FontAwesomeIcon icon = {faHome} color='#4d4d4e'/>
            </NavLink>
            <NavLink exact = "true" activeclassname='active' className='about-link' to='/about'>
                <FontAwesomeIcon icon = {faUser} color='#4d4d4e'/>
            </NavLink>
            <NavLink exact = "true" activeclassname='active' className='portfolio-link' to='/research'>
                <FontAwesomeIcon icon = {faBookBookmark} color='#4d4d4e'/>
            </NavLink>
            <NavLink exact = "true" activeclassname='active' className='projects-link' to='/projects'>
                <FontAwesomeIcon icon = {faLaptop} color='#4d4d4e'/>
            </NavLink>
            <NavLink exact = "true" activeclassname='active' className='skills-link' to='/technicalskills'>
                <FontAwesomeIcon icon = {faScrewdriverWrench} color='#4d4d4e'/>
            </NavLink>
            <NavLink exact = "true" activeclassname='active' className='contact-link' to='/contact'>
                <FontAwesomeIcon icon = {faEnvelope} color='#4d4d4e'/>
            </NavLink>
        </nav>
        <div className={`social-top ${isShown && "open"}` } >
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

        <div className ='social'  >
            <button className={`social_button ${isShown && "open"}`} onClick={socialClicked}>
            <FontAwesomeIcon icon={faPeoplePulling} />
            </button>
        </div>
    </div>
  )
}

export default Sidebar