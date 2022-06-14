import './index.scss';
import LogoS from '../../assets/images/logo-s.png';
import LogoSubtitle from '../../assets/images/logo_sub.png';
import React from 'react'
import { Link,NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faHome,faUser, } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin,faFacebook, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () => {
  return (
    <div className='nav-bar'>
        <Link className ='logo' to='/'>
            <img src = {LogoS} alt = 'logo' />
            <img className='sub-logo' src = {LogoSubtitle} alt = 'logo' />
        </Link>
        <nav>
            <NavLink exact = "true" activeclassname='active' className='home-link' to='/'>
                <FontAwesomeIcon icon = {faHome} color='#4d4d4e'/>
            </NavLink>
            <NavLink exact = "true" activeclassname='active' className='about-link' to='/about'>
                <FontAwesomeIcon icon = {faUser} color='#4d4d4e'/>
            </NavLink>
            <NavLink exact = "true" activeclassname='active' className='contact-link' to='/contact'>
                <FontAwesomeIcon icon = {faEnvelope} color='#4d4d4e'/>
            </NavLink>
        </nav>
        <ul>
            <li>
                <a 
                target="_black"
                rel ="noreferrer"
                href="https://www.linkedin.com/in/oscar-poudel-6b5674156/">

                <FontAwesomeIcon icon={faGithub} color = '#4d4d4e'/>
                </a>
            </li>
            <li>
                <a 
                target="_black"
                rel ="noreferrer"
                href="https://www.linkedin.com/in/oscar-poudel-6b5674156/">
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
                href="https://www.linkedin.com/in/oscar-poudel-6b5674156/">

                <FontAwesomeIcon icon={faInstagram} color = '#4d4d4e'/>
                </a>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar