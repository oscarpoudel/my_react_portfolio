import React from 'react'
import "./Project1.scss"

const ProjectArucoPoseDetector = () => {
  return (
    <div className="project-details-content styled-project">
      <h4>Problem Statement</h4>
      <p>
        Reliable localization is crucial for intelligent robots. The <strong>ArUco Pose Detector</strong> project enables robust marker-based pose estimation for ROS 2 robots, supporting navigation and calibration.
      </p>

      <h4>Research Objectives</h4>
      <ul>
        <li>Implement real-time detection of ArUco markers with OpenCV</li>
        <li>Estimate and publish 6-DoF marker poses via ROS TF</li>
        <li>Verify transforms visually in RViz for streamlined robot development</li>
      </ul>

      {/* FIRST IMAGE ROW */}
      <div className="image-row">
        <img
          src="https://raw.githubusercontent.com/oscarpoudel/aruco_pose_detector/main/image/1._setting_up_aruco.png"
          alt="Setting up ArUco Detection"
          className="scaled-image"
        />
        <img
          src="https://raw.githubusercontent.com/oscarpoudel/aruco_pose_detector/main/image/1.png"
          alt="Raw Camera View"
          className="scaled-image"
        />
        <img
          src="https://raw.githubusercontent.com/oscarpoudel/aruco_pose_detector/main/image/3.aruco_robot.png"
          alt="ArUco Placement on Robot"
          className="scaled-image"
        />
      </div>
      <div className="caption">
        Setup and marker appearance: configuration, camera view, marker on robot.
      </div>

      <h4>System Model & Pipeline</h4>
      <ul>
        <li>Camera images processed in real-time for ArUco rectangles</li>
        <li><code>cv2.solvePnP</code> recovers marker pose in 3D</li>
        <li>TF transforms broadcast for each marker-frame in ROS</li>
      </ul>

      {/* SECOND IMAGE ROW */}
      <div className="image-row">
        <img
          src="https://raw.githubusercontent.com/oscarpoudel/aruco_pose_detector/main/image/2.aruco_postion_wr_robot.png"
          alt="ArUco Position w.r.t Robot"
          className="scaled-image"
        />
        <img
          src="https://raw.githubusercontent.com/oscarpoudel/aruco_pose_detector/main/image/4.getting_the%20realative_position_.png"
          alt="Relative Pose Calculation"
          className="scaled-image"
        />
        <img
          src="https://raw.githubusercontent.com/oscarpoudel/aruco_pose_detector/main/image/5.nav2_map_relative_postion.png"
          alt="Nav2 Map Visualization"
          className="scaled-image"
        />
      </div>
      <div className="caption">
        Pose calculation and relative mapping: position with respect to robot, relative pose, and map integration.
      </div>

      <h4>Results & Visualization</h4>
      <div className="image-row">
        <img
          src="https://raw.githubusercontent.com/oscarpoudel/aruco_pose_detector/main/image/6.rviz_relative_position_visualization.png"
          alt="RViz visualization"
          className="scaled-image"
        />
      </div>
      <div className="caption">
        Final output: Visualized coordinate frames and marker positions in RViz.
      </div>

      <h4>Key Insights</h4>
      <ul>
        <li>Marker-based localization is fast, accurate, and easily debugged</li>
        <li>Visual tools make it easy to validate transforms and spot errors</li>
        <li>Flexible for multi-robot and multi-marker environments</li>
      </ul>

      <h4>Practical Considerations</h4>
      <ul>
        <li>Ensure camera calibration and correct marker size for best accuracy</li>
        <li>Integrates with most common USB/ROS2-compatible cameras</li>
        <li>Robust in moderate lighting with visible markers</li>
      </ul>
      <p>
        <strong>Conclusion:</strong><br />
        The ArUco Pose Detector ROS 2 package now offers a visually rich and user-friendly platform for 6-DoF marker pose estimation, seamlessly integrating with the robot’s navigation, calibration, and research pipelines.
      </p>
    </div>
  )
}

export default ProjectArucoPoseDetector
