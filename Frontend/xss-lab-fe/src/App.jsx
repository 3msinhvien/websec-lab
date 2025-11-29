import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LabList from './pages/LabList';
import LabDetail from './pages/LabDetail';
import About from './pages/About';
import Login from './pages/Login';
import Progress from './pages/Progress';
import Leaderboard from './pages/Leaderboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/labs" element={<LabList />} />
              <Route path="/lab/:id" element={<LabDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© 2025 WebSec Lab - Dành cho mục đích học tập</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
