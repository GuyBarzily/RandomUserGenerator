import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import UserPage from './components/UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/user/:username" element={<UserPage />} />  {/* User page route */}
      </Routes>
    </Router>
  );
}

export default App;
