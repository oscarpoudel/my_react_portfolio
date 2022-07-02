import React, { useEffect, useRef, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import emailjs from '@emailjs/browser'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
const api_key = process.env.REACT_APP_API_KEY;

const position = [27.701325723250072, 85.31485533889544]

const Contact = () => {
    const [letterClass,setLetterClass] =useState('text-animate');
    const refForm = useRef()
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
    <div className='text-zone'>
        <h1>
            <AnimatedLetters strArray={['C','o','n','t','a','c','t',' ','m','e'] } idx={15}/>
        </h1>
        <p>
            I am interested in freelancing jobs.If you want any request or question please feel free to contact me.
        </p>
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
        Nepal,
        <br/>
        Kathmandu,Bagmati
        <br/>
        <span>opoudel27@gmail.com</span>
    </div>
    <div className='map-wrap'>
    <MapContainer center={[27.701325723250072, 85.31485533889544]} zoom={13}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        Oscar lives here :)
      </Popup>
    </Marker>
  </MapContainer>
    </div>
    </div>
    {/* <Loader type='pacman'></Loader> */}
    </>
  )
}

export default Contact