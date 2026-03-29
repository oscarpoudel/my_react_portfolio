import React from 'react'
import schematicImage from "../../assets/research_images/proj_13/1. schematic_layout_of_the_system.png"
import prototypeImage from "../../assets/research_images/proj_13/2. Prototype_1_and_calibration_setup.png"
import frameImage from "../../assets/research_images/proj_13/3. 3d_design_and_printed_frame.png"
import hapticImage from "../../assets/research_images/proj_13/4. Haptic_feeback_and_touch_sensor_module_implented_in_the_system.png"
import hardwareImage from "../../assets/research_images/proj_13/5. assembled_eye_tracking_hardware.png"
import streamingImage from "../../assets/research_images/proj_13/6. data_transfer_raspberry_pi_to_pc.png"
import algorithmImage from "../../assets/research_images/proj_13/7. Implementaion_with_pupil_eye_tracking_algorithm.png"
import pupilImage from "../../assets/research_images/proj_13/8. tracker_ccaptures_eyeball_pupil_locaitons.png"
import calibrationImage from "../../assets/research_images/proj_13/9. tracked_point_calibration_test_errors_calibration_output.png"
import "./Project1.scss"

const Project13 = () => {
  return (
    <div className="project-details-content styled-project">
      <h4>Project Overview</h4>
      <p>
        This project presents a <strong>custom wearable eye-tracking system</strong> developed as a
        lightweight, battery-powered platform for real-time gaze estimation and multimodal human
        interaction. The system combines a custom-designed and 3D-printed frame, dual eye-imaging
        modules with a scene camera, a <strong>Raspberry Pi Zero 2 W</strong> as the embedded
        controller, capacitive touch activation, haptic feedback, audio-oriented control logic, and
        real-time streaming through <strong>PyZMQ</strong>. The gaze-estimation layer is based on
        the open-source <strong>Pupil Labs</strong> pupil-detection and gaze-mapping pipeline,
        allowing the prototype to move from a hardware concept to a scientifically grounded
        eye-tracking research instrument.
      </p>
      <p>
        Unlike desktop eye trackers, this system was designed as a <strong>fully wearable
        head-mounted platform</strong>. It was intended for interactive use cases where the user can
        trigger the system through touch, receive confirmation through haptics, and rely on audio as
        the primary interaction channel while gaze data, scene data, and related outputs are streamed
        for processing and monitoring.
      </p>

      <div className="image-row">
        <div>
          <img src={schematicImage} alt="Schematic layout of the custom eye-tracking system" className="scaled-image" />
          <div className="caption">System-level architecture showing the camera module, control module, Raspberry Pi Zero 2 W, and eye-tracking algorithm stack</div>
        </div>
      </div>

      <h4>Research Objectives</h4>
      <ul>
        <li>Develop a custom wearable eye tracker using low-cost embedded hardware and 3D-printed mechanical components.</li>
        <li>Integrate gaze sensing with capacitive touch, haptic feedback, and audio-based system activation for intuitive human interaction.</li>
        <li>Stream eye and scene camera data in real time from an onboard embedded controller to an external workstation for analysis and visualization.</li>
        <li>Leverage the open-source Pupil Labs algorithmic pipeline for pupil detection, gaze estimation, and calibration.</li>
        <li>Validate the system through calibration experiments and quantify real-time accuracy and tracking performance.</li>
      </ul>

      <h4>Mechanical Design and Wearable Form Factor</h4>
      <p>
        The hardware began with a <strong>custom CAD design of a head-mounted frame</strong> that
        could support the eye cameras, world camera, embedded processing enclosure, and cabling
        without becoming too bulky for wearable use. The frame geometry was optimized for three
        constraints: stable sensor placement relative to the eyes, sufficient adjustability for user
        fit, and enough structural stiffness to maintain calibration once the hardware was worn.
      </p>
      <p>
        After design, the frame and housing components were <strong>3D printed</strong> and
        assembled into a modular prototype. The printed structure made it possible to iterate quickly
        on sensor angles, camera offsets, nose support geometry, and routing paths for wires and
        connectors. This kind of rapid prototyping is especially important in wearable eye tracking,
        where small mechanical shifts can directly affect pupil visibility, gaze estimation quality,
        and user comfort.
      </p>

      <div className="image-row">
        <div>
          <img src={frameImage} alt="3D design and printed frame of the custom eye tracker" className="scaled-image" />
          <div className="caption">CAD concept and fabricated frame showing the custom wearable structure for cameras, electronics, and control components</div>
        </div>
        <div>
          <img src={hardwareImage} alt="Assembled wearable eye-tracking hardware" className="scaled-image" />
          <div className="caption">Fully assembled prototype integrating the printed frame, camera modules, onboard electronics, and embedded compute enclosure</div>
        </div>
      </div>

      <h4>Embedded Electronics and Interaction Design</h4>
      <p>
        The electronics architecture centers on a <strong>Raspberry Pi Zero 2 W</strong>, chosen for
        its small footprint, onboard wireless connectivity, and ability to execute lightweight
        computer-vision and communication tasks in a wearable package. According to Raspberry Pi
        documentation, the board uses a quad-core 64-bit Arm Cortex-A53 class processor and 512 MB
        RAM, making it suitable for compact embedded streaming and interface control workloads.
      </p>
      <ul>
        <li><strong>Processing core:</strong> Raspberry Pi Zero 2 W handles camera streaming, control logic, and outbound communication.</li>
        <li><strong>Touch activation:</strong> A capacitive touch sensor acts as the primary trigger for system wake-up or interaction initiation.</li>
        <li><strong>Haptic feedback:</strong> A vibration motor provides tactile confirmation so users can receive system-state feedback without relying on a visual screen.</li>
        <li><strong>Audio-oriented interaction:</strong> Once activated, the system can begin streaming data and handling audio-related outputs or spoken interaction logic.</li>
        <li><strong>Battery-powered operation:</strong> Portable power supports untethered wearable use and enables realistic interaction experiments outside a fixed desktop setup.</li>
      </ul>
      <p>
        This interaction strategy is especially useful for assistive and mobile computing contexts.
        Instead of asking the user to navigate menus or depend on constant visual attention, the
        system uses <strong>touch as an intentional input, haptics as confirmation, and audio as the
        main user-facing feedback channel</strong>. That makes the prototype more natural for
        hands-busy or visually demanding scenarios.
      </p>

      <div className="image-row">
        <div>
          <img src={hapticImage} alt="Haptic feedback motor and touch sensor in the wearable eye tracker" className="scaled-image" />
          <div className="caption">Haptic actuator and capacitive touch sensor integrated into the embedded control hardware</div>
        </div>
      </div>

      <h4>Streaming and Communication Pipeline</h4>
      <p>
        A key system requirement was <strong>real-time data transport</strong> from the wearable
        device to an external machine for visualization, recording, and debugging. To achieve this,
        the project used <strong>PyZMQ</strong>, the Python bindings for ZeroMQ, as the streaming
        layer for camera feeds and other outputs. This design enables low-overhead message-based
        communication between the Raspberry Pi and a host PC, while keeping the embedded device
        lightweight and responsive.
      </p>
      <p>
        ZeroMQ-based streaming is a strong fit for research prototypes because it supports modular
        publisher-subscriber and request-reply communication patterns. In this project, that means
        the wearable node can publish eye or scene information, while downstream processes can
        subscribe, visualize, record, or fuse the data without tightly coupling every module into a
        monolithic application.
      </p>

      <div className="image-row">
        <div>
          <img src={streamingImage} alt="Streaming from Raspberry Pi eye tracker to a host PC" className="scaled-image" />
          <div className="caption">Real-time transfer of eye-tracking streams and diagnostics from the Raspberry Pi Zero 2 W to a workstation using PyZMQ</div>
        </div>
      </div>

      <h4>Algorithmic Backbone: Open-Source Pupil Labs Pipeline</h4>
      <p>
        The gaze-estimation layer was built around the <strong>Pupil Labs open-source eye-tracking
        algorithm</strong>. Pupil Labs documents its developer stack around real-time messaging,
        timestamped gaze and pupil data, calibration, and gaze mapping, while its open-source
        detector implementations include model-based pupil fitting and a 3D eye model for more
        robust estimation under head-mounted sensing. In your prototype, this provided a practical
        and research-valid algorithmic foundation rather than reinventing pupil detection from
        scratch.
      </p>
      <ul>
        <li><strong>Pupil detection:</strong> The system detects the pupil boundary from the eye cameras and estimates ellipse-like pupil shape parameters.</li>
        <li><strong>3D eye modeling:</strong> The Pupil Labs `pye3d` detector uses a published 3D eye model to estimate eyeball pose and pupil direction more robustly than simple 2D centroiding.</li>
        <li><strong>Scene mapping:</strong> Gaze vectors are mapped from the eye coordinate system into the world-camera coordinate frame after calibration.</li>
        <li><strong>Timestamped outputs:</strong> Confidence values, pupil data, and gaze data can be streamed or logged for downstream evaluation.</li>
      </ul>
      <p>
        This combination of embedded streaming and open-source gaze estimation makes the platform
        valuable not just as a wearable device, but as a <strong>research testbed for gaze-aware
        interaction</strong>, assistive computing, and human-robot or human-computer interfaces.
      </p>

      <div className="image-row">
        <div>
          <img src={algorithmImage} alt="Implementation with Pupil eye-tracking algorithm and runtime windows" className="scaled-image" />
          <div className="caption">Runtime integration of the wearable sensing stack with the Pupil Labs software pipeline and real-time monitoring tools</div>
        </div>
        <div>
          <img src={pupilImage} alt="Detected pupil and eyeball geometry from the Pupil eye-tracking pipeline" className="scaled-image" />
          <div className="caption">Eye images and model-based pupil fitting illustrating real-time eyeball and pupil localization</div>
        </div>
      </div>

      <h4>Calibration and Experimental Validation</h4>
      <p>
        Calibration was performed using a target-based procedure that relates pupil observations to
        known reference locations in the world camera frame. The calibration setup in your images
        shows marker-based targets used to build the gaze-mapping relationship and evaluate how well
        the estimated gaze aligns with expected fixation locations.
      </p>
      <p>
        Your reported results show that the system achieved <strong>real-time gaze tracking at 30
        frames per second</strong> with a <strong>high angular accuracy of approximately 2 to 3
        degrees</strong>. The calibration output visible in the experiment figure reports an angular
        accuracy of about <strong>3.04 degrees</strong> on one run while maintaining stable sample
        usage and confidence filtering. Figures of the detected eye model also show accurate fitting
        of the user&apos;s eye in 3D, supporting the reliability of the gaze-estimation process.
      </p>

      <div className="image-row">
        <div>
          <img src={prototypeImage} alt="Prototype and calibration setup for the custom eye tracker" className="scaled-image" />
          <div className="caption">Prototype validation setup showing the calibration target arrangement and early system bring-up</div>
        </div>
        <div>
          <img src={calibrationImage} alt="Calibration output and angular error results for the eye tracker" className="scaled-image" />
          <div className="caption">Calibration and validation results showing tracked fixation behavior, confidence filtering, and angular-accuracy performance</div>
        </div>
      </div>

      <h4>Scientific Significance</h4>
      <p>
        From a research perspective, this project demonstrates that a <strong>compact wearable
        eye-tracking platform</strong> can be built using custom mechanical design, embedded compute,
        open-source gaze algorithms, and low-cost interaction hardware while still achieving useful
        real-time performance. The work is significant because it connects several engineering
        layers that are often treated separately: wearable product design, embedded systems,
        real-time communication, algorithmic gaze estimation, and user interaction design.
      </p>
      <ul>
        <li>It shows how open-source eye-tracking algorithms can be embedded into a custom hardware platform rather than only used with commercial headsets.</li>
        <li>It demonstrates a multimodal control philosophy where touch, haptics, gaze, streaming, and audio all contribute to the user experience.</li>
        <li>It produces a reusable architecture for future assistive technologies, gaze-aware interfaces, and mobile cognitive-state sensing systems.</li>
        <li>It validates that careful calibration and stable mechanical mounting can deliver practical gaze performance from a custom-built device.</li>
      </ul>

      <h4>Key Contributions</h4>
      <ul>
        <li>Designed and fabricated a custom 3D-printed wearable frame for eye tracking.</li>
        <li>Integrated a Raspberry Pi Zero 2 W, battery power, touch input, and haptic output into a portable head-mounted system.</li>
        <li>Implemented real-time data transfer using PyZMQ between the wearable device and a host computer.</li>
        <li>Adopted the Pupil Labs open-source pupil-detection and gaze-mapping pipeline for algorithmic eye tracking.</li>
        <li>Demonstrated calibrated gaze estimation at approximately 30 FPS with 2 to 3 degree angular accuracy.</li>
      </ul>

      <p>
        <strong>Conclusion:</strong> This project delivered a scientifically meaningful custom
        eye-tracking platform that combines wearable hardware design, embedded control, multimodal
        interaction, and open-source gaze-estimation algorithms into a compact research prototype. It
        provides a strong foundation for future work in assistive interfaces, audio-guided gaze
        systems, human-computer interaction, and mobile perception research.
      </p>

      <h4>Technical References</h4>
      <ul>
        <li><a href="https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/" target="_blank" rel="noopener noreferrer">Raspberry Pi Zero 2 W official specifications</a></li>
        <li><a href="https://docs.pupil-labs.com/core/developer/" target="_blank" rel="noopener noreferrer">Pupil Labs Core developer documentation</a></li>
        <li><a href="https://github.com/pupil-labs/pye3d-detector" target="_blank" rel="noopener noreferrer">Pupil Labs `pye3d` 3D eye-model detector repository</a></li>
        <li><a href="https://docs.pupil-labs.com/core/terminology/" target="_blank" rel="noopener noreferrer">Pupil Labs calibration, confidence, and timing terminology</a></li>
        <li><a href="https://pyzmq.readthedocs.io/en/latest/" target="_blank" rel="noopener noreferrer">PyZMQ official documentation</a></li>
      </ul>
    </div>
  )
}

export default Project13
