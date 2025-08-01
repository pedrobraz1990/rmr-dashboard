import React, { useState } from 'react';
import TopEmissionsChart from '../components/TopEmissionsChart';
import HierarchyTreemap from '../components/HierarchyTreemap';
import TransportationChart from '../components/TransportationChart';

const EnvironmentalTab = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="rmr-mb-6">
        <h1 className="rmr-text-3xl rmr-font-bold rmr-text-center rmr-mb-2">
          Environmental Metrics
        </h1>
        <p className="rmr-text-center rmr-text-lg rmr-text-gray-600">
          Comprehensive environmental impact analysis based on emissions data
        </p>
      </div>
      
      {/* Main Content */}
      <div className="rmr-card">
        <div className="rmr-grid rmr-grid-cols-1 rmr-lg:grid-cols-4 rmr-gap-6">
          {/* Navigation Tabs */}
          <div className="rmr-nav-tabs">
            <button 
              className={`rmr-nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`rmr-nav-tab ${activeTab === 'top-emissions' ? 'active' : ''}`}
              onClick={() => setActiveTab('top-emissions')}
            >
              Top Emission Sources
            </button>
            <button 
              className={`rmr-nav-tab ${activeTab === 'hierarchy' ? 'active' : ''}`}
              onClick={() => setActiveTab('hierarchy')}
            >
              Operational Hierarchy
            </button>
            <button 
              className={`rmr-nav-tab ${activeTab === 'transportation' ? 'active' : ''}`}
              onClick={() => setActiveTab('transportation')}
            >
              Transportation Analysis
            </button>
          </div>
          
          {/* Content Area */}
          <div className="rmr-col-span-3">
            {activeTab === 'overview' && (
              <div className="rmr-p-6">
                <h4 className="rmr-text-xl rmr-font-semibold rmr-mb-4">Environmental Dashboard Overview</h4>
                <p className="rmr-mb-4">This section provides comprehensive environmental impact analysis based on the ML (Malha Luiza) emissions data:</p>
                
                <div className="rmr-grid rmr-grid-cols-1 rmr-md:grid-cols-2 rmr-gap-6 rmr-mb-6">
                  <div>
                    <h6 className="rmr-font-semibold rmr-mb-3">Key Metrics Available:</h6>
                    <ul className="rmr-list-disc rmr-pl-4">
                      <li>Carbon footprint analysis by scope</li>
                      <li>Top emission sources identification</li>
                      <li>Operational unit hierarchy analysis</li>
                      <li>Transportation emissions breakdown</li>
                      <li>Fuel type efficiency comparison</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="rmr-font-semibold rmr-mb-3">Data Insights:</h6>
                    <ul className="rmr-list-disc rmr-pl-4">
                      <li>23,480 total records analyzed</li>
                      <li>12,191 non-zero emissions records</li>
                      <li>213,013 tCO2e total emissions</li>
                      <li>2023 data coverage</li>
                      <li>Multiple operational categories</li>
                    </ul>
                  </div>
                </div>
                
                <div className="rmr-alert rmr-alert-info">
                  <strong>Note:</strong> Select a tab above to view detailed charts and analysis for each category.
                </div>
              </div>
            )}
            
            {activeTab === 'top-emissions' && (
              <div className="rmr-p-6">
                <TopEmissionsChart limit={15} />
              </div>
            )}
            
            {activeTab === 'hierarchy' && (
              <div className="rmr-p-6">
                <HierarchyTreemap level={3} />
              </div>
            )}
            
            {activeTab === 'transportation' && (
              <div className="rmr-p-6">
                <TransportationChart />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalTab; 