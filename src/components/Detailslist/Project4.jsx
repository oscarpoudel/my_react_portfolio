import React from 'react'
import "./Project1.scss"

const ProjectVSLAM = () => {
  return (
    <div className="project-details-content styled-project">
      <h4>Problem Statement</h4>
      <p>
        Accurate real-world navigation requires estimating motion from camera video alone.
        The <strong>VSLAM_light</strong> project implements a simple monocular visual odometry pipeline, aiming for robust pose estimation from image sequences using feature tracking and Kalman filtering.
      </p>
      <ul>
        <li>Estimate real-time camera trajectories from monocular images</li>
        <li>Use only consumer-level datasets, hardware, and open-source tools</li>
      </ul>

      <h4>Research Objectives</h4>
      <ul>
        <li>Develop a minimal visual odometry pipeline leveraging classical computer vision</li>
        <li>Apply and compare feature tracking algorithms and smoothing filters</li>
        <li>Support evaluation against ground-truth and KITTI-format datasets</li>
      </ul>

      <h4>System Model</h4>
      <ul>
        <li><strong>Input:</strong> Monocular image stream, camera calibration file, ground-truth trajectory</li>
        <li><strong>Processing pipeline:</strong>
          <ul>
            <li>Corner detection using Shi-Tomasi</li>
            <li>Feature tracking via pyramidal Lucas-Kanade optical flow</li>
            <li>Pose estimation by essential matrix calculation</li>
            <li>Trajectory smoothing using a constant-velocity Kalman filter</li>
          </ul>
        </li>
        <li><strong>Output:</strong> Live plots of feature matches and estimated vs ground-truth trajectories</li>
      </ul>

      <h4>Methodology</h4>
      <p>
        The pipeline sequentially detects/filters features, tracks them across frames, and estimates 3D motion increments. Kalman filtering improves trajectory quality by integrating prior motion models with noisy estimates.
      </p>
      <ul>
        <li>Robust corner detection and pruning</li>
        <li>Optical flow tracking (frame-to-frame)</li>
        <li>Relative pose estimation via essential matrix decomposition</li>
        <li>Constant-velocity Kalman filter for trajectory smoothing</li>
      </ul>

      <h4>Results</h4>
      <p>
        The system accurately tracks and plots the estimated camera path against ground truth, showing clear visualizations of tracked features and trajectory comparison.
      </p>
      <ul>
        <li>
          Error is minimized with Kalman filtering, providing smoother and more reliable estimates
        </li>
        <li>
          Real-time visualizations support live debugging and assessment of tracking performance
        </li>
      </ul>
      <img src="https://raw.githubusercontent.com/oscarpoudel/VSLAM_light/main/image/2.png" alt="Feature tracking overlay" className="scaled-image" />
      <img src="https://raw.githubusercontent.com/oscarpoudel/VSLAM_light/main/image/1.png" alt="Estimated and ground-truth trajectories" className="scaled-image" />

      <h4>Key Insights</h4>
      <ul>
        <li>Classical feature-based odometry remains powerful for well-behaved datasets</li>
        <li>Kalman filtering provides significant improvements in estimated trajectory smoothness</li>
        <li>Live visualization helps tune and debug each processing stage</li>
      </ul>

      <h4>Practical Considerations</h4>
      <ul>
        <li>Monocular VO cannot recover scale in absolute terms—ground-truth needed for evaluation</li>
        <li>Sensitivity to lighting and scene structure may affect feature tracking</li>
        <li>Real deployment needs outlier rejection and possibly inertial fusion</li>
      </ul>

      <p><strong>Conclusion:</strong>
        VSLAM_light shows a practical, approachable, and open-source baseline for visual odometry research, supporting education, prototyping, and rapid development on standard datasets.
      </p>
    </div>
  )
}

export default ProjectVSLAM
