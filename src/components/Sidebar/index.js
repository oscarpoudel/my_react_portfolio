import './index.scss';
import LogoS from '../../assets/images/oLogo.png';
import React,{useState} from 'react'
import { Link,NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faHome,faPeoplePulling,faSuitcase,faUser, } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin,faFacebook, faGithub, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

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
            <p className='myName'>Oscar</p>
        </Link>
        <nav>
            <NavLink exact = "true" activeclassname='active' className='home-link' to='/'>
                <FontAwesomeIcon icon = {faHome} color='#4d4d4e'/>
            </NavLink>
            <NavLink exact = "true" activeclassname='active' className='about-link' to='/about'>
                <FontAwesomeIcon icon = {faUser} color='#4d4d4e'/>
            </NavLink>
            <NavLink exact = "true" activeclassname='active' className='portfolio-link' to='/portfolio'>
                <FontAwesomeIcon icon = {faSuitcase} color='#4d4d4e'/>
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
                href="https://github.com/oscarpoudel">

                <FontAwesomeIcon icon={faGithub} color = '#4d4d4e'/>
                </a>
            </li>
            <li>
                <a 
                target="_black"
                rel ="noreferrer"
                href="https://www.facebook.com/oscar.0scar/">
                <FontAwesomeIcon icon={faFacebook} color = '#4d4d4e'/>
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
                href="https://www.instagram.com/oscar_it_is/">

                <FontAwesomeIcon icon={faInstagram} color = '#4d4d4e'/>
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
            <FontAwesomeIcon icon={faPeoplePulling} color = '#4d4d4e'/>
            </button>
        </div>
    </div>
  )
}

export default Sidebar