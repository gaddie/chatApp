// Import necessary dependencies
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatApp from './ChatApp';  
import Agent from './agent';      

// Your main component
const App = () => {
  return (
    <Router>
      <div className="body-width">
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<ChatApp />} />
          <Route path="/agent" element={<Agent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
