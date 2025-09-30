import React from 'react'
// import viImage from "../../assets/research_images/proj_recycling/1_value_iteration.png"
// import piImage from "../../assets/research_images/proj_recycling/2_policy_iteration.png"
// import graph1 from "../../assets/research_images/proj_recycling/3_transition_graph.png"
// import graph2 from "../../assets/research_images/proj_recycling/4_mdp_states.png"
import "./Project1.scss"

const ProjectRecyclingRobot = () => {
  return (
    <div className="project-details-content styled-project">

      <h4>Problem Statement</h4>
      <p>
        Efficient operation of autonomous recycling robots requires decision-making under uncertainty. 
        The <strong>Recycling Robot Markov Decision Process (MDP)</strong>, originally introduced by Sutton & Barto, 
        models the problem of managing a robot’s energy levels while performing recycling tasks. 
        Two classical reinforcement learning methods are studied:
      </p>
      <ul>
        <li><strong>Value Iteration</strong> – based on the Bellman Optimality principle</li>
        <li><strong>Policy Iteration</strong> – based on iterative evaluation and improvement</li>
      </ul>

      <h4>Research Objectives</h4>
      <ul>
        <li>Formulate the Recycling Robot MDP with defined states, actions, and rewards</li>
        <li>Implement Value Iteration to compute the optimal value function and greedy policy</li>
        <li>Apply Policy Iteration to evaluate and improve policies until convergence</li>
        <li>Compare results and demonstrate convergence of both approaches</li>
      </ul>

      <h4>System Model</h4>
      <ul>
        <li><strong>States:</strong> High (battery charged), Low (battery depleted)</li>
        <li><strong>Actions:</strong> Search, Wait, Recharge</li>
        <li><strong>Rewards:</strong> 
          <ul>
            <li>+1 for successful search</li>
            <li>+0.2 for waiting</li>
            <li>-3 penalty for failure in low state</li>
          </ul>
        </li>
        <li><strong>Transition Probabilities:</strong> α (stay in high), β (return to high from low)</li>
      </ul>
      {/* <img src={graph1} alt="Transition Graph" className="scaled-image" />
      <img src={graph2} alt="MDP State Diagram" className="scaled-image" /> */}

      <h4>Methodology</h4>
      <p>
        The project applies classical dynamic programming algorithms:
      </p>
      <ul>
        <li><strong>Value Iteration:</strong> Repeated Bellman updates until value convergence</li>
        <li><strong>Policy Iteration:</strong> Alternating between policy evaluation and improvement</li>
        <li>Convergence tracked by value updates across iterations</li>
      </ul>

      <h4>Results</h4>
      <p>
        Both methods converged to the same optimal values and policies:
      </p>
      <ul>
        <li><strong>Value Iteration:</strong>
          <ul>
            <li>V(high) = 8.474576</li>
            <li>V(low) = 7.627119</li>
            <li>π(high) = search</li>
            <li>π(low) = recharge</li>
          </ul>
        </li>
        <li><strong>Policy Iteration:</strong>
          <ul>
            <li>V_pi(high) = 8.474576</li>
            <li>V_pi(low) = 7.627119</li>
            <li>π_pi(high) = search</li>
            <li>π_pi(low) = recharge</li>
          </ul>
        </li>
      </ul>
      <img src={"https://raw.githubusercontent.com/oscarpoudel/cleaning_robot_RL_VI-PI/main/pictures/res_1.png"} alt="Value Iteration Convergence" className="scaled-image" />
      <img src={"https://raw.githubusercontent.com/oscarpoudel/cleaning_robot_RL_VI-PI/main/pictures/res_2.png"} alt="Policy Iteration Convergence" className="scaled-image" />

      <h4>Key Insights</h4>
      <ul>
        <li>Both methods achieve the same optimal strategy, confirming consistency</li>
        <li>Value Iteration is straightforward but may require more iterations</li>
        <li>Policy Iteration converges faster but requires full policy evaluation at each step</li>
        <li>The optimal policy balances task reward with energy management</li>
      </ul>

      <h4>Practical Considerations</h4>
      <ul>
        <li>Extending the MDP to larger state spaces (e.g., multi-level battery) increases complexity</li>
        <li>Real robots require approximations since exact transitions are rarely known</li>
        <li>These foundational algorithms motivate reinforcement learning methods like Q-learning</li>
      </ul>

      <p><strong>Conclusion:</strong> 
        The Recycling Robot MDP experiment demonstrates that both Value Iteration and Policy Iteration 
        converge to the same optimal strategy: <em>search when charged, recharge when low</em>. 
        This highlights the strength of dynamic programming in solving decision-making problems 
        under uncertainty.
      </p>
    </div>
  )
}

export default ProjectRecyclingRobot
