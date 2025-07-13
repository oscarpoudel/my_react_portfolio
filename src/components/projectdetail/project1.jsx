import React from 'react'
import projectImage from '../../assets/research_images/work2.png'

const Project1 = () => {
  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Cambria, serif',
      lineHeight: '1.6',
      maxWidth: '80%',
      margin: '0 auto',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
    }}>
      <h2 style={{
        fontSize: '2rem',
        marginBottom: '1rem',
        borderBottom: '2px solid #ffd700',
        paddingBottom: '0.5rem',
        color: '#2f72a6'
      }}>
        Gaze-Based Control of a 4-Wheel Robot
      </h2>

      <img 
        src={projectImage} 
        alt="Robotics Project" 
        style={{
          width: '50%',
          borderRadius: '8px',
          margin: '1rem 0',
        }} 
      />

      <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
        This project explores a hands-free control system for a 4-wheel robot using eye-tracking via the RealEye platform. 
        The goal is to implement gaze-based navigation and object manipulation using ROS2 and the Gazebo simulator.
      </p>

      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>✅ RealEye-based gaze tracking for interface</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ ROS2 integration with multi-modal inputs</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ Navigation + Object interaction via eye control</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ SLAM-based indoor room layout awareness</li>
      </ul>

      <p style={{ fontSize: '1.1rem' }}>
        The presentation also discussed future directions such as integrating LLM-based decision logic and testing 
        this in a real-world laboratory environment to enable autonomous behavior and intelligent task switching.
      </p>
      <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
        This project explores a hands-free control system for a 4-wheel robot using eye-tracking via the RealEye platform. 
        The goal is to implement gaze-based navigation and object manipulation using ROS2 and the Gazebo simulator.
      </p>

      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>✅ RealEye-based gaze tracking for interface</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ ROS2 integration with multi-modal inputs</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ Navigation + Object interaction via eye control</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ SLAM-based indoor room layout awareness</li>
      </ul>

      <p style={{ fontSize: '1.1rem' }}>
        The presentation also discussed future directions such as integrating LLM-based decision logic and testing 
        this in a real-world laboratory environment to enable autonomous behavior and intelligent task switching.
      </p>
      <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
        This project explores a hands-free control system for a 4-wheel robot using eye-tracking via the RealEye platform. 
        The goal is to implement gaze-based navigation and object manipulation using ROS2 and the Gazebo simulator.
      </p>

      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>✅ RealEye-based gaze tracking for interface</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ ROS2 integration with multi-modal inputs</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ Navigation + Object interaction via eye control</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ SLAM-based indoor room layout awareness</li>
      </ul>

      <p style={{ fontSize: '1.1rem' }}>
        The presentation also discussed future directions such as integrating LLM-based decision logic and testing 
        this in a real-world laboratory environment to enable autonomous behavior and intelligent task switching.
      </p>
    </div>
  )
}

export default Project1
