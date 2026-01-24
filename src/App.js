import './App.scss';
import Layout from './components/Layout';
import { Route,Routes } from 'react-router-dom';
import Home from './components/Home'
import About from './components/About';
import Contact from './components/Contact';
import Research from './components/Research/index.js';
import Projects from './components/Projects/index.js';
import ProjectDetail from './components/projectdetail/index.js';
import Skills from './components/Technicalskills'
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
