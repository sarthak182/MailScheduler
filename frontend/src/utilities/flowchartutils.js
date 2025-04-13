// Handles logic when a node is clicked
let id=0;
export const getId = () => `${id++}`;
export const getFlowchartId = () => `flowchart_${Date.now()}`;