import React, { useState, useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, addEdge } from 'reactflow';
import { sendFlowchartData } from './sendFlowChartData';
import { handleClick } from './handleClick';
import { getFlowchartId, getId } from '../utilities/flowchartutils';
import EmailDetailsPopup from './PopupForm'; // Make sure this path is correct
import 'reactflow/dist/style.css';

const ReactFlowComponent = () => {
  const [nodes, setNodes] = useState([
    {
      id: getId(),
      flowchartId: getFlowchartId(),
      position: { x: 50, y: 50 },
      data: {
        label: `Schedule Email for Lead`,
        type: 'schedule',
        recipientEmail: '',
        scheduledTime: '',
        emailContent: ''
      },
      type: 'customNode'
    }
  ]);
  
  const [edges, setEdges] = useState([]);  // Add edges state
  const [showPopup, setShowPopup] = useState(false);
  const [clickedNodeId, setClickedNodeId] = useState(null);

  const handleNodeClick = (id, type) => {
    if (type === 'plus') {
      setClickedNodeId(id);
      setShowPopup(true);
    } else {
      handleClick(id, type, setNodes);
    }
  };

  const handleSavePopup = (emailData) => {
    handleClick(clickedNodeId, 'plus', setNodes, emailData);
    setShowPopup(false);
    setClickedNodeId(null);
  };

  const handleCancelPopup = () => {
    setShowPopup(false);
    setClickedNodeId(null);
  };

  // Handle edge connections
  const onConnect = useCallback(
    (params) => {
      // Ensure both source and target nodes exist and have the same flowchartId
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);
  
      // Only add the edge if the nodes are part of the same flowchart
      if (sourceNode && targetNode && sourceNode.flowchartId === targetNode.flowchartId) {
        setEdges((eds) => addEdge(params, eds)); // Adding the edge to the state
      }
    },
    [nodes]
  );

  // Custom node rendering (button click or other actions)
  const nodeTypes = {
    customNode: ({ data, id }) => {
      const isStartNode = data.type === 'start';
      const isDoneNode = data.type === 'done';

      if (isStartNode || isDoneNode) {
        return (
          <div style={{ textAlign: 'center', background: 'lightgray', padding: '8px 12px', borderRadius: '8px' }}>
            <span>{data.label}</span>
          </div>
        );
      }

      return (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => handleNodeClick(id, data.type)} // 👈 using your wrapper
            style={{
              padding: '8px 12px',
              background: '#eee',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          >
            {data.label}
          </button>
        </div>
      );
    }
  };

  return (
    <div className="container">
      <button className="save-button" onClick={sendFlowchartData(nodes)}>Save And Schedule</button>
      <div className="reactflow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}  // Pass edges to ReactFlow component
          onConnect={onConnect}  // Add edge on connect
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      {/* POPUP HERE */}
      {showPopup && (
        <div className="popup-backdrop">
          <EmailDetailsPopup onCancel={handleCancelPopup} onSave={handleSavePopup} />
        </div>
      )}
    </div>
  );
};

export default ReactFlowComponent;
