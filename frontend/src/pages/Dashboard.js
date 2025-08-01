import React, { useState, useEffect } from 'react';
import OperationalPerformanceDashboard from '../components/OperationalPerformanceDashboard';
import ProcessTechnologyAnalysis from '../components/ProcessTechnologyAnalysis';
import HierarchicalIntelligenceDashboard from '../components/HierarchicalIntelligenceDashboard';
import apiService from '../services/api_service';

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [summaryStats, setSummaryStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('operational');

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load summary stats
        const stats = await apiService.getSummaryStats();
        setSummaryStats(stats);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load emissions data. Please check if the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="rmr-loading-spinner">
          <div className="rmr-spinner"></div>
          <div className="rmr-mt-4 rmr-text-center">
            <h4>Loading emissions data...</h4>
            <p>Please wait while we fetch the latest data from the backend.</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="dashboard-container">
        <div className="rmr-alert rmr-alert-error">
          <h4>Error Loading Data</h4>
          <p>{error}</p>
          <hr />
          <p className="rmr-mb-0">
            Please ensure the backend server is running on port 8000 and try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="rmr-mb-6">
        <h1 className="rmr-text-3xl rmr-font-bold rmr-text-center rmr-mb-2">
          RMR Emissions Intelligence Dashboard
        </h1>
        <p className="rmr-text-center rmr-text-lg rmr-text-gray-600">
          Advanced operational analysis and emission reduction insights
        </p>
      </div>

      {/* Filters */}
      <div className="rmr-filter-card rmr-mb-6">
        <div className="rmr-flex rmr-flex-row rmr-gap-4 rmr-items-end">
          <div className="rmr-form-group rmr-flex-1">
            <label className="rmr-form-label">Select Year</label>
            <select 
              className="rmr-form-control rmr-form-select"
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <div className="rmr-form-group rmr-flex-1">
            <label className="rmr-form-label">Analysis Type</label>
            <select 
              className="rmr-form-control rmr-form-select"
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="operational">Operational Performance</option>
              <option value="process">Process & Technology</option>
              <option value="hierarchical">Hierarchical Intelligence</option>
            </select>
          </div>
          <div className="rmr-form-group">
            <button className="rmr-btn-secondary rmr-whitespace-nowrap">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="rmr-card rmr-mb-6">
        <div className="rmr-flex rmr-flex-row rmr-gap-6 rmr-flex-wrap rmr-justify-between">
          <div className="rmr-text-center rmr-flex-1 rmr-min-w-0">
            <div className="rmr-stat-item">
              <h3 className="rmr-text-3xl rmr-font-bold rmr-text-primary rmr-mb-2">
                {summaryStats?.unique_parameters || 0}
              </h3>
              <p className="rmr-text-sm rmr-text-gray-600 rmr-font-medium">Parameters Tracked</p>
            </div>
          </div>
          <div className="rmr-text-center rmr-flex-1 rmr-min-w-0">
            <div className="rmr-stat-item">
              <h3 className="rmr-text-3xl rmr-font-bold rmr-text-primary rmr-mb-2">
                {summaryStats?.total_records?.toLocaleString() || 0}
              </h3>
              <p className="rmr-text-sm rmr-text-gray-600 rmr-font-medium">Total Records</p>
            </div>
          </div>
          <div className="rmr-text-center rmr-flex-1 rmr-min-w-0">
            <div className="rmr-stat-item">
              <h3 className="rmr-text-3xl rmr-font-bold rmr-text-primary rmr-mb-2">
                {summaryStats?.total_emissions?.toLocaleString() || 0}
              </h3>
              <p className="rmr-text-sm rmr-text-gray-600 rmr-font-medium">Total tCO2e</p>
            </div>
          </div>
          <div className="rmr-text-center rmr-flex-1 rmr-min-w-0">
            <div className="rmr-stat-item">
              <h3 className="rmr-text-3xl rmr-font-bold rmr-text-primary rmr-mb-2">
                {summaryStats?.year_range || 'N/A'}
              </h3>
              <p className="rmr-text-sm rmr-text-gray-600 rmr-font-medium">Data Period</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Content */}
      <div className="rmr-chart-content">
        {activeTab === 'operational' && (
          <OperationalPerformanceDashboard />
        )}
        {activeTab === 'process' && (
          <ProcessTechnologyAnalysis />
        )}
        {activeTab === 'hierarchical' && (
          <HierarchicalIntelligenceDashboard />
        )}
      </div>
    </div>
  );
};

export default Dashboard; 