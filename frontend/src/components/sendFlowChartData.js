export const sendFlowchartData = async (nodes) => {
    // Filter out valid nodes that should be counted as part of the flowchart
    // const validNodes = nodes; // Include ALL nodes, not just type === 'text'

    const validNodes = nodes.filter((node) => node.data.type === 'text');
  
    // Group nodes by flowchartId
    const groupedFlowcharts = validNodes.reduce((acc, node) => {
      // Check if the flowchartId already exists in the accumulator
      if (!acc[node.flowchartId]) {
        acc[node.flowchartId] = []; // Initialize an empty array for this flowchart
      }
  
      // Push the node data into the respective flowchart group
      acc[node.flowchartId].push({
        id: node.id,
        data: node.data // Store node data like label, type, etc.
      });
  
      return acc;
    }, {});
  
    // Map the grouped flowchart data into the format we need to send to the backend
    const flowchartData = Object.keys(groupedFlowcharts).map((flowchartId) => ({
      flowchartId: flowchartId,
      nodes: groupedFlowcharts[flowchartId]
    }));
  
    try {
      // Send the grouped flowchart data to the backend
      const response = await fetch('http://localhost:5000/api/save-flowchart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ flowcharts: flowchartData })
      });
  
      if (response.ok) {
        console.log('Flowchart data sent successfully');
      } else {
        console.log('Error sending data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };