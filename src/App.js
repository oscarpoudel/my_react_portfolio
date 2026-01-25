import './App.scss';
import Layout from './components/Layout/Layout';
import { Route,Routes } from 'react-router-dom';
import Home from './components/Home/Home'
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Research from './components/Research/Research.js';
import Projects from './components/Projects/Projects.js';
import ProjectDetail from './components/projectdetail/projectdetail.js';
import Skills from './components/Technicalskills/Technicalskills'
import ScrollIndicator from './components/ScrollIndicator/ScrollIndicator';

function App() {
  return (
    <>
    <ScrollIndicator />
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element ={<Home/>}/>
      <Route path='/about' element ={<About/>}/>
      <Route path='/contact' element ={<Contact/>}/>
      <Route path='/research' element ={<Research/>}/>
      <Route path='/technicalskills' element ={<Skills/>}/>
      <Route path='/projects' element ={<Projects/>}/>
      <Route path="/projects/:id" element={<ProjectDetail />} />


      </Route>
    </Routes>
    
    </>
  );
}

export default App;
