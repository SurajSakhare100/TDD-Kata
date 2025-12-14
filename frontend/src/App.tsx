import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<div>Welcome to Sweet Shop Management System</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

