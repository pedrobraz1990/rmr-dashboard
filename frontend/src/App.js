import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

// Import components (to be created)
import Dashboard from './pages/Dashboard';
import EnvironmentalTab from './pages/EnvironmentalTab';
import SocialTab from './pages/SocialTab';
import GovernanceTab from './pages/GovernanceTab';
import ChartProposals from './pages/ChartProposals';

// Import RMR assets
import rmrLogo from './assets/logos/LOGO_PNG1_RMR.png';
import headerBg from './assets/images/header2.png';

// Force new deployment - RMR Dashboard v1.0.1
function App() {
  return (
    <Router>
      <div className="App">
        {/* RMR Navigation Bar */}
        <nav className="rmr-nav">
          <div className="rmr-container rmr-flex rmr-justify-between rmr-items-center">
            <NavLink to="/" className="rmr-nav-brand">
              <img src={rmrLogo} alt="RMR Logo" className="rmr-nav-logo" />
              <span>RMR Dashboard</span>
            </NavLink>
            
            <div className="rmr-flex rmr-items-center rmr-gap-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `rmr-nav-link ${isActive ? 'active' : ''}`
                }
                end
              >
                Overview
              </NavLink>
              <NavLink 
                to="/environmental" 
                className={({ isActive }) => 
                  `rmr-nav-link ${isActive ? 'active' : ''}`
                }
              >
                Environmental
              </NavLink>
              <NavLink 
                to="/social" 
                className={({ isActive }) => 
                  `rmr-nav-link ${isActive ? 'active' : ''}`
                }
              >
                Social
              </NavLink>
              <NavLink 
                to="/governance" 
                className={({ isActive }) => 
                  `rmr-nav-link ${isActive ? 'active' : ''}`
                }
              >
                Governance
              </NavLink>
              <NavLink 
                to="/chart-proposals" 
                className={({ isActive }) => 
                  `rmr-nav-link ${isActive ? 'active' : ''}`
                }
              >
                Chart Proposals
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="rmr-container rmr-p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/environmental" element={<EnvironmentalTab />} />
            <Route path="/social" element={<SocialTab />} />
            <Route path="/governance" element={<GovernanceTab />} />
            <Route path="/chart-proposals" element={<ChartProposals />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 