import React, { useEffect, useRef, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters/AnimatedLetters'
import './Contact.scss';
import emailjs from '@emailjs/browser'
import { MapContainer, CircleMarker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';
import useScrollNavigation from '../../hooks/useScrollNavigation';

function MapFixer() {
  const map = useMap();
  useEffect(() => {
    let frame;
    const resize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => map.invalidateSize({ pan: false }));
    };
    const observer = new ResizeObserver(resize);
    observer.observe(map.getContainer());
    resize();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [map]);
  return null;
}

const emailConfig = {
    publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || process.env.REACT_APP_API_KEY,
    serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_skfo9h5',
    templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_rw702qt',
};

const position = [40.735657, -74.172363];

const Contact = () => {
    const [letterClass,setLetterClass] =useState('text-animate');
    const refForm = useRef()
    const sending = useRef(false)
    const feedback = useRef(null)
    const [status, setStatus] = useState('idle')
    const [errorMessage, setErrorMessage] = useState('')
    // Next: none (last page), Prev: Technical Skills
    useScrollNavigation(null, '/technicalskills', true);
    useEffect(()=>{
         const timer = setTimeout(()=>{
            setLetterClass('text-animate-hover')
        },4000)
        return () => clearTimeout(timer)
    },[])
    const sendEmail=async (e)=>{
        e.preventDefault()
        if (sending.current) return
        const form = refForm.current
        if (!form.reportValidity()) return
        if (!emailConfig.publicKey) {
            setErrorMessage('Email sending is temporarily unavailable. Please email me directly below.')
            setStatus('error')
            return
        }
        sending.current = true
        setStatus('sending')
        setErrorMessage('')
        try {
            const response = await emailjs.sendForm(emailConfig.serviceId, emailConfig.templateId, form, emailConfig.publicKey)
            if (response.status !== 200) throw new Error('Email service did not confirm sending')
            form.reset()
            setStatus('success')
        } catch {
            setErrorMessage('Your message could not be sent. Please try again, or email me directly below.')
            setStatus('error')
        } finally {
            sending.current = false
            requestAnimationFrame(() => feedback.current?.focus())
        }
    }
  return (
    <>
    <div className='container contact-page'>
    <div className='text-zone contact-top'>
        <h1>
            <AnimatedLetters letterClass={letterClass} strArray={['C','o','n','t','a','c','t',' ','m','e'] } idx={15}/>
        </h1>
        <h2>
            If you want to discuss any research opportunities or possible collaboration/ job opportunities please contact me by filling the form below or any of my social media handle.
        </h2>
        <div className='contact-form'>
            <form ref={refForm} onSubmit={sendEmail} aria-busy={status === 'sending'} onInput={() => { if (status === 'success' || status === 'error') setStatus('idle') }}>
                <ul>
                    <li className='half'>
                        <input type='text' name='name' placeholder='Name' aria-label='Name' autoComplete='name' disabled={status === 'sending'} required/>
                    </li>
                    <li className='half'>
                        <input type='email' name='email' placeholder='Email' aria-label='Email' autoComplete='email' disabled={status === 'sending'} required/>
                    </li>

                    <li className='sub'>
                        <input type='text' name='subject' placeholder='Subject' aria-label='Subject' disabled={status === 'sending'} required />
                    </li>
                    <li>
                        <textarea placeholder='Message' name='message' aria-label='Message' disabled={status === 'sending'} required></textarea>
                    </li>
                    <li>
                        <input type='submit' className='flat-button' value={status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'} disabled={status === 'sending'} />
                    </li>
                </ul>
            </form>
            {status !== 'idle' && <div ref={feedback} tabIndex={-1} className={`contact-feedback is-${status}`} role={status === 'error' ? 'alert' : 'status'} aria-live={status === 'error' ? 'assertive' : 'polite'}>
                {status === 'sending' && <p>Sending your message…</p>}
                {status === 'success' && <><strong>Email sent successfully.</strong><p>Thank you for reaching out. I’ll contact you shortly.</p></>}
                {status === 'error' && <p>{errorMessage}</p>}
            </div>}
            <p className='contact-direct'>You can also email me at <a href='mailto:opoudel27@gmail.com'>opoudel27@gmail.com</a>.</p>
        </div>
    </div>

    <div className='map-wrap' role="region" aria-label="Map of Newark, New Jersey">
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      <CircleMarker center={position} radius={9} pathOptions={{ color: '#115173', fillColor: '#ffd700', fillOpacity: 1, weight: 3 }}>
        <Popup>Newark, New Jersey</Popup>
      </CircleMarker>
      <MapFixer />
    </MapContainer>
    <div className='info-map'>
        Oscar,
        <br/>
        USA,
        <br/>
        Newark,New Jersey
        <br/>
        <span>opoudel27@gmail.com</span>
        <a href="https://www.openstreetmap.org/?mlat=40.735657&mlon=-74.172363#map=13/40.735657/-74.172363" target="_blank" rel="noopener noreferrer">Open larger map ↗</a>
    </div>
    </div>
    </div>
    </>
  )
}

export default Contact
