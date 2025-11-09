import React from 'react'
import "./Project1.scss"


const ProjectCalibrateCamera = () => {
  return (
    <div className="styled-project project-details-content">
      {/* <h2>Theoretical Foundations of Camera Calibration</h2> */}
      <h4>Overview</h4>
      <p>
        Accurate <strong>camera calibration</strong> is fundamental in robotics and computer vision. The goal is to determine the internal geometry and lens distortion parameters of a camera—its “intrinsics” which map 3D world points to their measured pixel coordinates. Without precise calibration, spatial measurements, 3D reconstructions, and robot navigation all suffer from systematic error.
      </p>
      <p>
        The classic approach uses a flat checkerboard pattern, observed from various orientations and distances. Each pose yields a set of observed image points whose known 3D locations—given by the checkerboard grid; allow robust estimation of camera parameters by minimizing the reprojection error via <strong>bundle adjustment</strong>. Multiple diverse viewpoints across the field of view are critical for a well-conditioned solution.
      </p>

      <div className="image-row">
        <img src="https://raw.githubusercontent.com/oscarpoudel/get_calibrate_camera/main/images/2.camera_calibration_process.png" alt="Detecting checkerboard corners in the calibration process" className="scaled-image"/>
        <img src="https://raw.githubusercontent.com/oscarpoudel/get_calibrate_camera/main/images/2.camera_calibration_process_iii.png" alt="Checkerboard grid detected and overlaid on input image" className="scaled-image"/>
        <img src="https://raw.githubusercontent.com/oscarpoudel/get_calibrate_camera/main/images/3.camera_calibration_output_matrices.png" alt="Calibration results: camera matrix" className="scaled-image"/>
        <img src="https://raw.githubusercontent.com/oscarpoudel/get_calibrate_camera/main/images/3.camera_calibration_output_matrices_ii.png" alt="Calibration results: distortion coefficients" className="scaled-image"/>
      </div>
      <div className="caption">
        Left: Detecting checkerboard patterns during calibration. Middle: Visual feedback showing corner extraction. Right: Output intrinsic matrix and distortion coefficients.
      </div>

      <h4>Automated and Visualized Calibration in ROS 2</h4>
      <p>
        This toolkit automates the classical process using ROS 2 nodes. The calibration node collects images from a connected camera; each time a sufficiently different checkerboard pose is detected, the image is accepted, ensuring variability in angle, distance, and position for accurate coverage.
      </p>
      <p>
        Real-time overlays and progress bars guide the user. Once enough images have been acquired, calibration is performed, calculating the focal length, principal point, and distortion parameters. The results can be visualized and exported for direct use in robot vision pipelines.
      </p>

      <h4>Significance</h4>
      <ul>
        <li><strong>Enables metric 3D measurements from 2D images</strong>—this is foundational for tasks like SLAM, AR, or grasp planning.</li>
        <li><strong>Reduces re-calibration effort</strong> by automating data collection variability and providing visual diagnosis for outlier patterns.</li>
        <li><strong>Integrates with the ROS ecosystem</strong>—making extrinsic calibration (sensor mounting relationships) reliable when paired with precise intrinsics.</li>
      </ul>

      <h4>Conclusion</h4>
      <p>
        By combining theoretical calibration methods with modern ROS 2 automation and feedback, this package ensures robust, reproducible estimation of camera parameters—building a solid basis for all downstream robotic vision applications.
      </p>
    </div>
  )
}

export default ProjectCalibrateCamera