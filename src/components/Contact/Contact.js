import React, { useEffect, useRef, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters'
import './Contact.scss';
import emailjs from '@emailjs/browser'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useMap } from 'react-leaflet';
import useScrollNavigation from '../../hooks/useScrollNavigation';

function MapFixer() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize(); // Forces Leaflet to recalculate tile layout
    }, 1500); // Delay matches your animation duration
  }, [map]);
  return null;
}

const api_key = process.env.REACT_APP_API_KEY;

const position = [40.735657, -74.172363];

const Contact = () => {
    const [letterClass,setLetterClass] =useState('text-animate');
    const refForm = useRef()
    // Next: none (last page), Prev: Technical Skills
    useScrollNavigation(null, '/technicalskills', true);
    useEffect(()=>{
         setTimeout(()=>{
            setLetterClass('text-animate-hover')
        },3000)
    },[])
    const sendEmail=(e)=>{
        e.preventDefault()
        emailjs.sendForm(
            'service_skfo9h5',
            'template_rw702qt',
            refForm.current,
            api_key,
            
        ).then(
            ()=>{
                alert('Message sucessfully sent')
                window.location.reload(false)
            },
            ()=>{
                alert('Failed to send the message')
            }
        )
    }
  return (
    <>
    <div className='container contact-page'>
    <div className='text-zone contact-top'>
        <h1>
            <AnimatedLetters strArray={['C','o','n','t','a','c','t',' ','m','e'] } idx={15}/>
        </h1>
        <h2>
            If you want to discuss any research opportunities or possible collabration/ job opportunities please contact me by filling the form below or any of my social media handle.
        </h2>
        <div className='contact-form'>
            <form ref={refForm} onSubmit={sendEmail}>
                <ul>
                    <li className='half'>
                        <input type='text' name='name' placeholder='Name' required/>
                    </li>
                    <li className='half'>
                        <input type='email' name='email' placeholder='Email' required/>
                    </li>

                    <li className='sub'>
                        <input type='text' name='subject' placeholder='Subject' required />
                    </li>
                    <li>
                        <textarea placeholder='Message' name='message' required></textarea>
                    </li>
                    <li>
                        <input type='submit' className='flat-button' value='SEND'></input>
                    </li>
                </ul>
            </form>
        </div>
    </div>

    <div className='info-map'>
        Oscar,
        <br/>
        USA,
        <br/>
        Newark,New Jersey
        <br/>
        <span>opoudel27@gmail.com</span>
    </div>
    <div className='map-wrap'>
    {/* <MapContainer center={position} zoom={9}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={position}>
    <Popup>Oscar lives here :)</Popup>
  </Marker>
  <MapFixer />
</MapContainer> */}
    </div>
    </div>
    {/* <Loader type='pacman'></Loader> */}
    </>
  )
}

export default Contact