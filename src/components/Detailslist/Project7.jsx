import React from 'react'
import "./Project1.scss"

const ProjectTurtlebotYolov8 = () => {
  return (
    <div className="styled-project project-details-content">
      <h4>Overview</h4>
      <p>
        This project investigates <strong>semantic perception</strong> where a mobile robot detects objects and forms a persistent, queryable memory of its environment. YOLOv8, a state-of-the-art neural network, interprets live image streams, while the robot’s real-time pose situates each detection within the environment map.
        The system closes the loop between sensory input (“what is here?”), localization (“where am I?”), and semantic memory (“what did I see here before?”). By binding visual descriptors to spatial coordinates using <strong>Qdrant</strong>, retrieval of objects or scene contexts becomes possible via vector similarity enabling context-aware navigation and environment understanding.
      </p>

      <div className="image-row">
        <img src="https://raw.githubusercontent.com/oscarpoudel/turtlebot_3_ROSnav2__yolov8/main/images/2_object_placement_in_maze.png" alt="Object placement in maze environment" className="scaled-image"/>
        <img src="https://raw.githubusercontent.com/oscarpoudel/turtlebot_3_ROSnav2__yolov8/main/images/3_zoomed_in_placement_1.png" alt="Zoomed-in: object placement" className="scaled-image"/>
        <img src="https://raw.githubusercontent.com/oscarpoudel/turtlebot_3_ROSnav2__yolov8/main/images/4_object_detection_placement_1.png" alt="Detection: placement 1" className="scaled-image"/>
        <img src="https://raw.githubusercontent.com/oscarpoudel/turtlebot_3_ROSnav2__yolov8/main/images/5_object_detection_placement_2.png" alt="Detection: placement 2" className="scaled-image"/>
        <img src="https://raw.githubusercontent.com/oscarpoudel/turtlebot_3_ROSnav2__yolov8/main/images/6_object_detection_placement_3.png" alt="Detection: placement 3" className="scaled-image"/>
        <img src="https://raw.githubusercontent.com/oscarpoudel/turtlebot_3_ROSnav2__yolov8/main/images/7_detection_logs.png" alt="Detection logs (ROS 2)" className="scaled-image"/>
      </div>
      <div className="caption">
        Left: Objects arranged for detection in a maze. Center: YOLOv8 model identifies, localizes, and classifies objects at different locations. Right: Detection logs and output topics for downstream semantic mapping.
      </div>

      <h4>Theoretical Foundations</h4>
      <p>
        YOLOv8 is trained to regress bounding boxes and class probabilities for all objects in a single pass. By coupling detection output with localization (AMCL pose estimates), each object sighting is turned into an <strong>observation event</strong> a tuple of spatial and perceptual features.
      </p>
      <ul>
        <li>Visual embeddings (e.g., from a ResNet50 backbone) capture object appearance beyond class labels.</li>
        <li>Position (<code>x, y, θ</code>) encodes where in the environment this detection occurred.</li>
        <li>Storing into Qdrant allows efficient semantic and spatial recall crucial for lifelong learning robots.</li>
      </ul>

      <h4>Significance</h4>
      <ul>
        <li>Enables map-aware searching: “Find all detections of objects class X in region Y”</li>
        <li>Enables memory-based behaviors and semantic relocalization</li>
        <li>Architecture extensible to new models, richer embedding spaces, and multi-robot collaboration</li>
      </ul>

      <h4>Conclusion</h4>
      <p>
        <strong>turtlebot_3_ROSnav2__yolov8</strong> demonstrates how modern vision (YOLOv8), localization, and semantic memory can be orchestrated to enable robots to see, remember, and reason about what is in the world and where.
      </p>
    </div>
  )
}

export default ProjectTurtlebotYolov8
