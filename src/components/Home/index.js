import './index.scss';
import { Link } from 'react-router-dom';
import AnimatedLetters from '../AnimatedLetters';
import React,{useState,useEffect} from 'react';
import HomeImg from '../../assets/images/home_img.png'
import vectorforimage from '../../assets/images/blur_vec.png'
// 'C','i','v','i','l',' '

const Home = () => {
    const [letterClass,setLetterClass] = useState('text-animate')
    const nameArray = [' ','O','S','C','A','R']
    const jobArray =['a','n',' ','E','n','g','i','n','e','e','r','.']
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
                    <span className='letterClass'>H</span>
                    <span className={`${letterClass} _12`}>i,</span>
                    <br /> 
                    <span className={`${letterClass} _13`}>I&nbsp;</span>
                    <span className={`${letterClass} _14`}> am, </span>
                 {/* <img src={LogoTitle} alt='Civil' />  */}
               <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15}/>
                <br/>
               <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={23}/>
                </h1>
                <h2>Building Designer / Property Valuator / Computer Hobbiest / Website Developer / App Developer </h2>
                <Link to='/contact' className='flat-button'>CONTACT ME</Link>
                
                
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