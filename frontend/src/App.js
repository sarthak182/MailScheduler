import 'reactflow/dist/style.css';
import './App.css'

import React from 'react';
import ReactFlowComponent from './components/reactFlowComp'  // Import your ReactFlowComp here

function App() {
  return (
    <div className="App">
      <ReactFlowComponent /> {/* Use the ReactFlowComp component here */}
    </div>
  );
}

export default App;
