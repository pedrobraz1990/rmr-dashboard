import React, { useState, useEffect } from 'react';
import EmissionsScopeCategoryChart from '../components/EmissionsScopeCategoryChart';
import GasEmissionsDashboard from '../components/GasEmissionsDashboard';
import HierarchicalEmissionsHeatmap from '../components/HierarchicalEmissionsHeatmap';
import apiService from '../services/api_service';

const ChartProposals = () => {
  const [scopeCategoryData, setScopeCategoryData] = useState(null);
  const [gasBreakdownData, setGasBreakdownData] = useState(null);
  const [hierarchicalData, setHierarchicalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2023);

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load all three chart datasets in parallel
        const [scopeData, gasData, hierarchicalData] = await Promise.all([
          apiService.getEmissionsByScopeCategory(selectedYear),
          apiService.getGasEmissionsBreakdown(selectedYear),
          apiService.getHierarchicalEmissionsHeatmap(selectedYear)
        ]);
        
        setScopeCategoryData(scopeData);
        setGasBreakdownData(gasData);
        setHierarchicalData(hierarchicalData);
      } catch (err) {
        console.error('Error loading chart proposal data:', err);
        setError('Failed to load chart data. Please check if the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedYear]);

  const handleYearChange = (newYear) => {
    setSelectedYear(newYear);
  };

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    // Reload data
    const loadData = async () => {
      try {
        const [scopeData, gasData, hierarchicalData] = await Promise.all([
          apiService.getEmissionsByScopeCategory(selectedYear),
          apiService.getGasEmissionsBreakdown(selectedYear),
          apiService.getHierarchicalEmissionsHeatmap(selectedYear)
        ]);
        
        setScopeCategoryData(scopeData);
        setGasBreakdownData(gasData);
        setHierarchicalData(hierarchicalData);
      } catch (err) {
        console.error('Error refreshing chart data:', err);
        setError('Failed to refresh data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  };

  // Show loading state
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="rmr-loading-spinner">
          <div className="rmr-spinner"></div>
          <div className="rmr-mt-4 rmr-text-center">
            <h4>Loading Chart Proposals...</h4>
            <p>Please wait while we fetch the emissions data for the new charts.</p>
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
          <h4>Error Loading Chart Data</h4>
          <p>{error}</p>
          <hr />
          <div className="rmr-flex rmr-gap-2">
            <button className="rmr-btn-secondary" onClick={handleRefresh}>
              Retry
            </button>
            <button className="rmr-btn-secondary" onClick={() => window.history.back()}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="rmr-mb-6">
        <div className="rmr-flex rmr-justify-between rmr-items-center">
          <div>
            <h1 className="rmr-text-3xl rmr-font-bold rmr-mb-2">Chart Proposals</h1>
            <p className="rmr-text-lg rmr-text-gray-600">Advanced emissions analysis with interactive visualizations</p>
          </div>
          <div className="rmr-flex rmr-gap-2">
            <button 
              className={`rmr-btn-secondary ${selectedYear === 2023 ? 'active' : ''}`}
              onClick={() => setSelectedYear(2023)}
            >
              2023
            </button>
            <button 
              className="rmr-btn-secondary"
              onClick={handleRefresh}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Chart 1: Emissions Overview by Scope and Category */}
      <div className="rmr-card rmr-mb-6">
        <div className="rmr-card-header">
          <h5 className="rmr-card-title">Chart 1: Emissions Overview by Scope and Category</h5>
          <p className="rmr-card-subtitle">Comprehensive view of emissions across scopes and categories with temporal trends</p>
        </div>
        <div className="rmr-p-6">
          <EmissionsScopeCategoryChart 
            data={scopeCategoryData}
            title="Emissions by Scope and Category"
          />
        </div>
      </div>

      {/* Chart 2: Gas Emissions Breakdown */}
      <div className="rmr-card rmr-mb-6">
        <div className="rmr-card-header">
          <h5 className="rmr-card-title">Chart 2: Gas Emissions Breakdown with Conversion Factors</h5>
          <p className="rmr-card-subtitle">Detailed analysis of emissions by gas type with conversion factors and trends</p>
        </div>
        <div className="rmr-p-6">
          <GasEmissionsDashboard 
            data={gasBreakdownData}
            title="Gas Emissions Breakdown"
          />
        </div>
      </div>

      {/* Chart 3: Hierarchical Emissions Heatmap */}
      <div className="rmr-card rmr-mb-6">
        <div className="rmr-card-header">
          <h5 className="rmr-card-title">Chart 3: Hierarchical Organization Emissions Heatmap</h5>
          <p className="rmr-card-subtitle">Visualize emissions across the 7-level organizational hierarchy</p>
        </div>
        <div className="rmr-p-6">
          <HierarchicalEmissionsHeatmap 
            data={hierarchicalData}
            title="Hierarchical Emissions Heatmap"
          />
        </div>
      </div>

      {/* Information Panel */}
      <div className="rmr-card">
        <div className="rmr-card-header">
          <h5 className="rmr-card-title">Chart Proposals Information</h5>
        </div>
        <div className="rmr-p-6">
          <div className="rmr-grid rmr-grid-cols-1 rmr-md:grid-cols-3 rmr-gap-6">
            <div>
              <h6 className="rmr-font-semibold rmr-mb-3">Chart 1: Scope & Category Analysis</h6>
              <p className="rmr-text-gray-600">
                Interactive stacked bar chart showing emissions across different scopes and categories. 
                Click on bars to drill down into detailed category breakdowns.
              </p>
            </div>
            <div>
              <h6 className="rmr-font-semibold rmr-mb-3">Chart 2: Gas Type Analysis</h6>
              <p className="rmr-text-gray-600">
                Multi-panel dashboard with donut chart for gas families, bar chart for individual gases, 
                and line chart for trends. Includes conversion factors analysis.
              </p>
            </div>
            <div>
              <h6 className="rmr-font-semibold rmr-mb-3">Chart 3: Hierarchical Heatmap</h6>
              <p className="rmr-text-gray-600">
                Interactive heatmap showing emissions across business areas and operational units. 
                Click cells to see detailed hierarchical information and emissions breakdown.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartProposals; 