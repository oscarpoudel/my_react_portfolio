import React from 'react'
import designImage from "../../assets/research_images/proj_12/1. 3d_model_design_in_fusion_360_for_the_lidar_scanner.png"
import bodyImage from "../../assets/research_images/proj_12/2. 3d_desing_and_print_of_the_bottom_and_side_cover.png"
import frontCoverImage from "../../assets/research_images/proj_12/3. 3d_desing_and_print_of_front_cover.png"
import electronicsImage from "../../assets/research_images/proj_12/4. internal_component_assembly_lidar_scanner.png"
import panelImage from "../../assets/research_images/proj_12/5. back_panel_assemly_lidar_scanner.png"
import assembledImage from "../../assets/research_images/proj_12/6. final_assembled_lidar_scanner.png"
import rawPointCloudImage from "../../assets/research_images/proj_12/7. raw_rgbd_point_clound.png"
import finalModelImage from "../../assets/research_images/proj_12/8. 3d_post_proccessed_model_of_the_scanned_hallway.png"
import overviewImage from "../../assets/research_images/proj_12/9. overview_of_the_system.png"
import "./Project1.scss"

const Project12 = () => {
  return (
    <div className="project-details-content styled-project">
      <h4>Project Overview</h4>
      <p>
        This project presents a <strong>custom handheld LiDAR scanner with RGB-D fusion</strong>
        developed for infrastructure inspection, indoor reality capture, and rapid digital-twin
        generation. The platform was designed as a fully integrated field unit built around a
        <strong> Livox Mid-360 3D LiDAR</strong>, dual top-mounted RGB cameras, an embedded compute
        stack, onboard status display, tactile interface controls, external battery power, and USB
        logging for portable acquisition. The goal was to move beyond a bench-top sensing setup and
        produce a scanner that could be carried through corridors and building interiors while
        collecting dense geometry and appearance data in one synchronized workflow.
      </p>
      <p>
        The resulting system combines <strong>mechanical design, additive manufacturing,
        embedded electronics, ROS 2 middleware, point-cloud fusion, and 3D reconstruction</strong>.
        The full workflow spans CAD design in Fusion 360, part-level fabrication and assembly,
        sensor integration, custom ROS 2 acquisition software for LiDAR and RGB-D fusion, and final
        post-processing in Blender to convert raw scan data into a clean 3D building model.
      </p>

      <div className="image-row">
        <div>
          <img src={overviewImage} alt="Overview of the custom LiDAR scanner system and reconstruction pipeline" className="scaled-image" />
          <div className="caption">End-to-end workflow from custom scanner design to RGB-D mapping and final 3D model generation</div>
        </div>
      </div>

      <h4>Research Objectives</h4>
      <ul>
        <li>Design a portable infrastructure scanning platform that integrates LiDAR, RGB sensing, embedded control, and local data logging.</li>
        <li>Develop a mechanically robust enclosure that preserves sensor field of view while remaining lightweight and manufacturable through 3D printing.</li>
        <li>Implement a custom ROS 2 interface for synchronized acquisition, RGB-D point-cloud generation, and multi-sensor fusion.</li>
        <li>Generate inspection-ready 3D data that can be post-processed into visually interpretable indoor models for documentation and asset assessment.</li>
        <li>Demonstrate a practical bridge between low-cost prototyping hardware and professional reality-capture workflows used in civil and infrastructure applications.</li>
      </ul>

      <h4>Mechanical Design and Industrial Form Factor</h4>
      <p>
        The scanner enclosure was first modeled in <strong>Fusion 360</strong> as a modular housing
        with separated structural and serviceable parts: the main body shell, side and bottom
        covers, front instrument panel, internal electronics tray, and rear access plate. The form
        factor was shaped around three competing requirements: preserving LiDAR visibility, creating
        stable mounting planes for the cameras, and allocating enough internal volume for the
        embedded computer, interface electronics, wiring, and power distribution.
      </p>
      <p>
        A forward-mounted LiDAR head was positioned to minimize self-occlusion from the housing,
        while the <strong>dual top-mounted RGB cameras</strong> were elevated to improve appearance
        coverage and reduce color shadowing on walls, corners, and corridor features. The handle
        geometry was incorporated directly into the body to improve operator ergonomics and keep the
        sensor frame stable during walk-through scanning.
      </p>

      <div className="image-row">
        <div>
          <img src={designImage} alt="Fusion 360 design of the custom LiDAR scanner" className="scaled-image" />
          <div className="caption">Initial Fusion 360 concept showing the Livox sensing head, top camera mounts, I/O cutouts, and handheld form factor</div>
        </div>
        <div>
          <img src={bodyImage} alt="Body and side cover design and fabrication" className="scaled-image" />
          <div className="caption">Main chassis and side-cover design translated into printable structural components</div>
        </div>
      </div>

      <div className="image-row">
        <div>
          <img src={frontCoverImage} alt="Front cover and interface module design" className="scaled-image" />
          <div className="caption">Front-panel enclosure designed for a compact display, buttons, and operator-facing feedback interface</div>
        </div>
      </div>

      <h4>Fabrication and Assembly Strategy</h4>
      <p>
        After CAD validation, the enclosure components were <strong>3D printed and iteratively
        refined</strong>. The main body was fabricated as a load-bearing shell, while the removable
        covers simplified maintenance and debugging during sensor bring-up. This approach made it
        possible to repeatedly open the system, re-route harnesses, change controller placement, and
        swap interface parts without redesigning the entire scanner body.
      </p>
      <p>
        The final assembly strategy separated the scanner into mechanical, sensing, and electronics
        submodules. That modularity is important in field instruments because it reduces the time
        required to isolate faults, replace a damaged component, or recalibrate a sensing stack
        after transport.
      </p>

      <div className="image-row">
        <div>
          <img src={electronicsImage} alt="Internal electronics assembly of the LiDAR scanner" className="scaled-image" />
          <div className="caption">Internal packaging of compute, wiring, power, and interface electronics inside the printed enclosure</div>
        </div>
        <div>
          <img src={panelImage} alt="Back panel assembly and interface controls" className="scaled-image" />
          <div className="caption">Back-panel assembly integrating display, buttons, and local operator control hardware</div>
        </div>
      </div>

      <div className="image-row">
        <div>
          <img src={assembledImage} alt="Final assembled custom LiDAR scanner" className="scaled-image" />
          <div className="caption">Final integrated scanner with external battery, top-mounted cameras, embedded display, and handheld infrastructure inspection form factor</div>
        </div>
      </div>

      <h4>Electronics and Embedded System Architecture</h4>
      <p>
        The electronics stack was designed around an <strong>embedded single-board computer</strong>
        for sensor I/O and ROS 2 execution, with an <strong>Arduino-based microcontroller layer</strong>
        handling lightweight interface logic such as buttons, status signaling, and operator-side
        control events. The high-level computer
        handles timestamped data streams and networking, while the microcontroller provides
        deterministic low-level interaction and reduces the software burden on the main acquisition
        process.
      </p>
      <ul>
        <li><strong>LiDAR sensing:</strong> Livox Mid-360 selected for compact size and wide spatial coverage; official Livox documentation lists a 360 degree by 59 degree field of view, 0.1 m minimum blind zone, and 200,000 points per second class output.</li>
        <li><strong>Visual sensing:</strong> Two RGB cameras mounted on the top surface to increase view overlap and improve color attribution around walls, edges, and occluded regions.</li>
        <li><strong>Power subsystem:</strong> External battery pack used to keep the handheld package untethered during scan walks and to isolate the acquisition platform from unstable lab bench power.</li>
        <li><strong>Human-machine interface:</strong> A compact display provides live status feedback, while buttons and panel controls support mode changes, acquisition triggering, and health monitoring.</li>
        <li><strong>Data logging:</strong> An external USB drive acts as a removable storage target for bag files, exported point clouds, and reconstruction outputs.</li>
      </ul>
      <p>
        From a systems perspective, the embedded design had to manage <strong>power integrity, cable
        routing, thermal packing, connector retention, and electromagnetic noise sensitivity</strong>.
        Those practical issues often dominate real sensor-integration work more than the algorithmic
        side alone. A scanner may have excellent sensing hardware but still fail in practice if the
        connectors loosen, if USB bandwidth collapses under multiple streams, or if power rail dips
        create intermittent resets during long acquisitions.
      </p>

      <h4>Custom ROS 2 Acquisition and RGB-D Fusion Pipeline</h4>
      <p>
        Scanning was performed using a <strong>custom ROS 2 interface</strong> built to ingest the
        Livox LiDAR stream together with visual data and produce an RGB-D enriched point cloud. The
        software stack follows a standard perception architecture but was adapted for this handheld
        platform: sensor drivers publish timestamped streams, synchronization logic associates the
        closest measurement sets, calibration transforms align all sensors into a common reference
        frame, and a fusion node projects geometry and image data into a unified colored 3D
        representation.
      </p>
      <ul>
        <li><strong>Driver layer:</strong> LiDAR packets are decoded through the Livox ROS driver stack and republished into ROS 2 topics for downstream fusion.</li>
        <li><strong>Temporal alignment:</strong> RGB and depth-like observations are synchronized using ROS 2 message-filter patterns so that color is assigned to geometry with bounded timestamp error.</li>
        <li><strong>Spatial calibration:</strong> Rigid extrinsic transforms are used to map each camera frame into the LiDAR coordinate frame, making it possible to colorize and jointly interpret the scene.</li>
        <li><strong>Point generation:</strong> Camera rays are back-projected to 3D using intrinsic calibration, then merged with LiDAR geometry to create richer scene structure than either sensing mode alone.</li>
        <li><strong>Fusion output:</strong> The pipeline produces a colored point cloud suitable for inspection, mapping, and later mesh-oriented reconstruction.</li>
      </ul>
      <p>
        In practice, <strong>RGB-D fusion improves interpretability</strong> of inspection data.
        Pure LiDAR clouds are geometrically strong but visually sparse; camera imagery is visually
        rich but weaker in depth reliability under challenging surfaces or lighting. The combined
        pipeline allows inspectors to retain metric structure from LiDAR while also recovering
        appearance cues needed for identifying doors, surfaces, transitions, or defect context in
        infrastructure spaces.
      </p>

      <div className="image-row">
        <div>
          <img src={rawPointCloudImage} alt="Raw RGBD fused point cloud" className="scaled-image" />
          <div className="caption">Early RGB-D fused point-cloud output before post-processing, showing aligned geometry and appearance information</div>
        </div>
      </div>

      <h4>Scientific and Algorithmic Considerations</h4>
      <p>
        Several engineering considerations govern the quality of handheld mapping systems. First,
        <strong>extrinsic calibration accuracy</strong> directly determines whether image textures
        align with LiDAR geometry. Even small rotational errors can create color bleeding across
        edges. Second, <strong>timestamp consistency</strong> matters because handheld motion creates
        parallax between sequential measurements. Third, the system benefits from the Livox sensor's
        wide field coverage, which helps preserve structural context in narrow corridors and
        inspection pathways where conventional forward-only sensing may miss side surfaces.
      </p>
      <p>
        The practical fusion strategy therefore prioritizes:
      </p>
      <ul>
        <li>Stable frame transforms and repeatable sensor mounting.</li>
        <li>Low-latency message transport and synchronized topic handling.</li>
        <li>Consistent intrinsic calibration for the two RGB cameras.</li>
        <li>Noise filtering and outlier rejection before high-level reconstruction.</li>
        <li>Preservation of spatial scale so downstream models remain useful for engineering interpretation.</li>
      </ul>

      <h4>3D Reconstruction and Blender Post-Processing</h4>
      <p>
        Once the raw RGB-D point cloud was generated, the downstream reconstruction workflow moved
        into <strong>Blender</strong> for post-processing and model generation. This stage focused on
        cleaning stray points, trimming incomplete geometry, improving visual consistency, and
        converting the captured environment into a clearer building-scale model. For inspection and
        digital-twin use cases, this post-processing step is valuable because raw scans usually
        contain motion artifacts, floating points, partial surfaces, and non-structural noise from
        cables, moving people, or reflective surfaces.
      </p>
      <p>
        The final result is a structured 3D representation of the scanned hallway and adjacent rooms
        that is easier to interpret than the raw acquisition output. The cleaned model supports
        downstream use in visualization, documentation, asset inventory, and future condition
        assessment workflows.
      </p>

      <div className="image-row">
        <div>
          <img src={finalModelImage} alt="Post-processed 3D model generated from the scanned hallway" className="scaled-image" />
          <div className="caption">Post-processed indoor model reconstructed from the captured point cloud after Blender-based cleanup and refinement</div>
        </div>
      </div>

      <h4>Key Contributions</h4>
      <ul>
        <li>Designed a fully custom handheld LiDAR scanner rather than relying on an off-the-shelf enclosure or fixed tripod workflow.</li>
        <li>Integrated LiDAR, dual RGB cameras, embedded compute, Arduino interface control, local display, external battery power, and USB logging into a single portable unit.</li>
        <li>Developed a ROS 2-based RGB-D fusion pipeline tailored to portable infrastructure inspection and indoor mapping.</li>
        <li>Demonstrated a complete workflow from CAD and fabrication to sensing, fusion, and reconstruction.</li>
        <li>Produced a realistic digital reconstruction pipeline suitable for research in civil infrastructure inspection and reality capture.</li>
      </ul>

      <h4>Outcome and Relevance to Infrastructure Inspection</h4>
      <p>
        This project demonstrates how a <strong>custom-built sensing instrument</strong> can be used
        to capture inspection environments with both metric and visual richness. For infrastructure
        applications, that matters because inspectors often need more than images alone and more than
        geometry alone. They need context-aware 3D data that preserves shape, appearance, access
        conditions, and spatial relationships. The scanner therefore acts as a compact data
        acquisition platform for indoor asset documentation, corridor mapping, as-built capture, and
        future defect-localization workflows.
      </p>
      <p>
        <strong>Conclusion:</strong> The project successfully delivered a custom LiDAR scanner that
        merges mechanical design, embedded electronics, ROS 2 perception software, and 3D
        reconstruction into a single scientific workflow. It stands as a strong prototype for
        portable infrastructure inspection, digital-twin creation, and future intelligent condition
        assessment systems.
      </p>

      <h4>Technical References</h4>
      <ul>
        <li><a href="https://www.livoxtech.com/mid-360/downloads" target="_blank" rel="noopener noreferrer">Livox Mid-360 official downloads and manuals</a></li>
        <li><a href="https://www.livoxtech.com/cn/mid-360" target="_blank" rel="noopener noreferrer">Livox Mid-360 official product page and core specifications</a></li>
        <li><a href="https://github.com/Livox-SDK/livox_ros_driver2" target="_blank" rel="noopener noreferrer">Livox ROS Driver 2 official repository</a></li>
        <li><a href="https://docs.ros.org/en/rolling/p/message_filters/doc/index.html" target="_blank" rel="noopener noreferrer">ROS 2 message_filters documentation for time synchronization</a></li>
        <li><a href="https://docs.blender.org/manual/en/latest/modeling/point_cloud.html" target="_blank" rel="noopener noreferrer">Blender point-cloud documentation</a></li>
      </ul>
    </div>
  )
}

export default Project12
