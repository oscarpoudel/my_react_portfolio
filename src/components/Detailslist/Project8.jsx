import React from 'react'
import "./Project1.scss"

const imgBase = "https://raw.githubusercontent.com/oscarpoudel/LLM_ROS2_agent/main/images/";

const ProjectLLMROS2 = () => {
  return (
    <div className="project-details-content styled-project">

      <h4>Problem Statement</h4>
      <p>
        Direct, intuitive control of robots by everyday users is a major hurdle in modern robotics.
        <strong> ROS-LM: Natural Language Robot Assistant </strong> addresses this challenge by using a Large Language Model (LLM) agent to interpret and execute natural language commands, enabling seamless interaction with a ROS2-powered mobile robot.
        This system removes the need for complex ROS2 commands and scripts, allowing real-world actions to be triggered by simple conversation.
      </p>

      <div className="image-row">
        <div>
          <img src={imgBase + "1.gui_layout_for_llm_promt_entry.png"} alt="GUI layout for LLM prompt entry" className="scaled-image" />
          <div className="caption">Streamlit GUI for entering natural language robot commands</div>
        </div>
        <div>
          <img src={imgBase + "2.cli_based_entry.png"} alt="CLI-based prompt entry" className="scaled-image" />
          <div className="caption">CLI-based natural language interaction interface</div>
        </div>
      </div>

      <h4>Research Objectives</h4>
      <ul>
        <li>Enable LLM-powered interpretation and orchestration of user instructions for mobile robots.</li>
        <li>Leverage agentic AI principles, with LLM-driven intent classification and tool delegation.</li>
        <li>Integrate NATS messaging for scalable, real-time, and decoupled robot control.</li>
        <li>Support multimodal interaction (motion, navigation, vision, diagnostics, ROS2 CLI) through extensible tool modules.</li>
        <li>Deliver accessible interfaces via both CLI and Streamlit web UI.</li>
      </ul>

      <div className="image-row">
        <div>
          <img src={imgBase + "3.more_cli_based_output_performing_vision_anysis.png"} alt="Vision analysis CLI output" className="scaled-image" />
          <div className="caption">Vision analysis performed from CLI via LLM prompt</div>
        </div>
        <div>
          <img src={imgBase + "4_system_status_output_with_nats.png"} alt="System status via NATS" className="scaled-image" />
          <div className="caption">Live robot system status feedback using NATS messaging</div>
        </div>
      </div>

      <h4>System Model</h4>
      <ul>
        <li>
          <strong>User Interface:</strong> Accepts natural language commands from web or terminal.
        </li>
        <li>
          <strong>LLM-Powered Agent:</strong> Classifies intent (motion, nav, vision, status, CLI) and extracts parameters by reasoning over free-form text using powerful LLMs (Ollama, Gemini).
        </li>
        <li>
          <strong>Tool Suite:</strong> Modular Python tools handle domain-specific logic (motion, navigation, etc.), packaging instructions as structured NATS messages.
        </li>
        <li>
          <strong>NATS Broker:</strong> Publishes/subscribes agent commands and robot responses for reliable real-time communication.
        </li>
        <li>
          <strong>ROS2 Execution:</strong> ROS2 nodes receive and execute instructions, returning feedback and results for the LLM agent to summarize to the user.
        </li>
      </ul>

      <div className="image-row">
        <div>
          <img src={imgBase + "5.some_prompt_samples.png"} alt="Prompt samples" className="scaled-image" />
          <div className="caption">Various prompt samples for LLM-driven robot actions</div>
        </div>
      </div>

      <h4>Methodology</h4>
      <p>
        The agentic orchestration relies on the LLM to act as the central “brain,” analyzing incoming language, classifying intent, and invoking tool modules. Each tool serializes its task as a NATS message, enabling robust, decoupled integration with the ROS2 backend. Multimodal queries such as “navigate to the lab,” “move forward 2 meters,” or “what do you see?” are parsed and executed via their corresponding tool. The architecture supports:
      </p>
      <ul>
        <li><strong>Intent classification and parameter extraction</strong> powered by LLM reasoning and tool-calling.</li>
        <li><strong>Agentic orchestration:</strong> Each tool invocation acts as a step in an autonomous decision-making and action chain.</li>
        <li>
          <strong>Feedback loop:</strong> Robot state, vision, and diagnostics are integrated into the LLM’s conversational loop, enabling clarification or multi-step planning.
        </li>
      </ul>

      <div className="image-row">
        <div>
          <img src={imgBase + "6.moving_robot-based_on_symantic_locaiton_eg_firehydrant.png"} alt="Semantic-location navigation" className="scaled-image" />
          <div className="caption">Moving the robot to a semantic location (e.g., "fire hydrant")</div>
        </div>
        <div>
          <img src={imgBase + "7.path_planned_based_on_nav2.png"} alt="Nav2-based path planning" className="scaled-image" />
          <div className="caption">Path planned using ROS2 Nav2 stack</div>
        </div>
      </div>

      <div className="image-row">
        <div>
          <img src={imgBase + "8.ros2_nats_side_codes.png"} alt="ROS2-NATS code" className="scaled-image" />
          <div className="caption">Example: ROS2 and NATS message handling code</div>
        </div>
        <div>
          <img src={imgBase + "9.running_nats_receiver_and_ros2_maze.png"} alt="NATS receiver and ROS2 maze" className="scaled-image" />
          <div className="caption">Running NATS receiver along with ROS2-based maze navigation</div>
        </div>
      </div>

      <h4>Results</h4>
      <ul>
        <li>Validated natural language interaction for moving, navigating, querying vision, checking status, and running ROS2 CLI commands on Turtlebot3 with ROS2 Nav2 stack.</li>
        <li>Streamlit UI and CLI both allow conversational robot programming and immediate action execution.</li>
        <li>Scalable design supports easy tool/toolchain extension any new ROS2 action can be added as a tool module.</li>
      </ul>

      <h4>Key Insights</h4>
      <ul>
        <li>
          The agentic AI approach enables flexible, multi-intent orchestration far exceeding rule-based or menu-driven approaches.
        </li>
        <li>
          NATS messaging provides robust, scalable decoupling of language-agent and robot systems.
        </li>
        <li>
          LLM acts as the orchestrator for high-level planning, not just intent detection, making multi-step natural language control both robust and extensible.
        </li>
      </ul>

      <h4>Practical Considerations</h4>
      <ul>
        <li>
          The system’s modularity accelerates robot platform adaptation just edit or extend tool modules for new hardware or topics.
        </li>
        <li>
          LLM prompt and tool-calling design require iterative tweaking for ambiguous or complex instructions; robust error handling ensures user guidance is always available.
        </li>
        <li>
          Orchestrated agentic control supports not just single actions, but can plan and execute chains of commands, opening doors to more advanced human-robot collaboration.
        </li>
      </ul>

      <p>
        <strong>Conclusion:</strong>
        ROS-LM demonstrates practical, LLM-based agentic orchestration for ROS2 robots bridging natural language and real-world action with scalable, modular, and robust design, paving the way for accessible and adaptive robot control for all users.
      </p>
    </div>
  )
}

export default ProjectLLMROS2
