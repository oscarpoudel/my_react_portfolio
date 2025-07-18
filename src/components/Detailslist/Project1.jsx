
import React from 'react'
// import projectImage from '../../assets/research_images/project2_image.png' // optional image
import "./Project1.scss"
const Project2 = () => {
  return (
    <div className="project-details-content styled-project">
      {/* <img src={projectImage} alt="Gaze UAV Project" /> */}
      {/* <h2>Gaze-Assisted Teleoperation for Precision UAV Navigation</h2>
      <h3>A Comparison of Traditional vs. Gaze-Assisted Teleoperation</h3> */}

      
      <h4>Problem Statement</h4>
      <p>
        Navigating UAVs in confined spaces presents challenges such as limited maneuverability,
        operator fatigue, and the precision required to avoid collisions. Traditional systems may not
        capture the operator’s true intent—especially for non-professional users.
      </p>

      <h4>Research Objectives</h4>
      <ul>
        <li>Develop a gaze-assisted Crazyflie teleoperation system in simulation</li>
        <li>Compare traditional and gaze-assisted methods</li>
        <li>Analyze integration and performance constraints in real time</li>
      </ul>

      <h4>State of the Art</h4>
      <ul>
        <li><strong>GPA-Teleoperation Framework:</strong> Aligns drone path with operator’s gaze</li>
        <li><strong>GazeRace Method:</strong> Eye-gaze control achieving comparable performance to manual methods</li>
      </ul>

      <h4>System Workflow</h4>
      <ul>
        <li>RealEye for gaze data</li>
        <li>Joystick input</li>
        <li>Webots simulator with Crazyflie drone</li>
        <li>PID controller integration</li>
        <li>Metrics: Task time, accuracy, latency, success rate</li>
      </ul>

      <h4>Methodology</h4>
      <ul>
        <li>Webots simulator with an indoor environment</li>
        <li>Crazyflie open-source drone used for navigation</li>
        <li>Target point system with task switching on successful reach</li>
        <li>Gaze input denoised and mapped to drone PID controller</li>
      </ul>

      <h4>Key Metrics</h4>
      <ul>
        <li><strong>Task Completion Time:</strong> ~12% faster with gaze-assisted control</li>
        <li><strong>Control Inputs:</strong> 32% fewer with gaze support</li>
        <li><strong>Latency:</strong> Gaze system incurs ~50% more latency (15ms vs. 7ms)</li>
        <li><strong>Task Success Rate:</strong> Similar (~85%) in both methods</li>
      </ul>

      <h4>Key Insights</h4>
      <ul>
        <li>Gaze reduces workload and control complexity</li>
        <li>Latency trade-off must be optimized for dynamic tasks</li>
        <li>Operator learning curve exists for fine control via gaze</li>
      </ul>

      <h4>Practical Considerations</h4>
      <ul>
        <li>Synchronization between gaze and controls is critical</li>
        <li>Optimized gaze processing pipelines are essential</li>
        <li>Scalability to multi-UAV or real-world scenarios requires further exploration</li>
      </ul>

      <p><strong>Conclusion:</strong> Gaze-assisted teleoperation shows promise in reducing manual effort and improving navigational efficiency, but needs further development for latency and dynamic adaptability.</p>
    </div>
  )
}

export default Project2
