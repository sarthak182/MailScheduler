import {getFlowchartId, getId} from '../utilities/flowchartutils'

export const handleClick = (id, type, setNodes, emailData = null) => {
  if (type === 'text' || type === 'start' || type === 'done') return;

  let recipientEmail, delay, emailContent;
  if (type === 'plus' && emailData) {
    ({ recipientEmail, delay, emailContent } = emailData);
  }

  setNodes((prevNodes) => {
    const clickedNode = prevNodes.find((n) => n.id === id);
    const x = clickedNode.position.x;
    const y = clickedNode.position.y;

    if (type === 'plus') {
      const newNode = {
        id: getId(),
        flowchartId: clickedNode.flowchartId,
        position: { x, y },
        data: {
          label: `Sending Email to ${recipientEmail} in ${delay} minutes with the message ${emailContent}`,
          type: 'text',
          recipient: recipientEmail,
          delay,
          emailContent
        },
        type: 'customNode',
        style: { maxWidth: '250px', wordWrap: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis' }
      };

      const newPlus = {
        id: getId(),
        flowchartId: clickedNode.flowchartId,
        position: { x, y: y + 80 },
        data: { label: `+`, type: 'plus' },
        type: 'customNode'
      };

      return [...prevNodes, newNode, newPlus];
    }

    // default logic
    const updatedNodes = prevNodes.map((node) =>
      node.id === id
        ? { ...node, data: { ...node.data, label: 'Lead Source Added', type: 'done' } }
        : node
    );

    const newFlowchartId = getFlowchartId();
    const newNodes = [
      {
        id: getId(),
        flowchartId: newFlowchartId,
        position: { x, y: y + 80 },
        data: { label: `Sequence Start Point`, type: 'start' },
        type: 'customNode'
      },
      {
        id: getId(),
        flowchartId: newFlowchartId,
        position: { x, y: y + 160 },
        data: { label: `+`, type: 'plus' },
        type: 'customNode'
      },
      {
        id: getId(),
        flowchartId: newFlowchartId,
        position: { x: x + 350, y },
        data: { label: `Add Lead Source`, type: 'add' },
        type: 'customNode'
      }
    ];

    return [...updatedNodes, ...newNodes];
  });
};
