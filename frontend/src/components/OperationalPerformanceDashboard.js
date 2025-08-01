import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import apiService from '../services/api_service';

const OperationalPerformanceDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [drillDownView, setDrillDownView] = useState('scope'); // 'scope', 'category', 'trend'
  const [efficiencyView, setEfficiencyView] = useState('detailed'); // 'detailed', 'compact', 'summary'
  const [alertsExpanded, setAlertsExpanded] = useState(false); // Controls alerts panel expansion

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getOperationalPerformance(2023, 15);
        setData(response.operational_performance);
      } catch (err) {
        setError('Failed to load operational performance data');
        console.error('Error loading operational performance:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="rmr-loading-spinner">
        <div className="rmr-spinner"></div>
        <p className="rmr-mt-2">Loading operational performance data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rmr-alert rmr-alert-error">
        <h4>Error</h4>
        <p>{error}</p>
      </div>
    );
  }

  if (!data || !data.top_units) {
    return (
      <div className="rmr-alert rmr-alert-warning">
        <h4>No Data Available</h4>
        <p>No operational performance data is currently available.</p>
      </div>
    );
  }

  // Prepare data for charts
  const barChartData = data.top_units.map(unit => ({
    name: unit.unit,
    emissions: unit.total_emissions,
    efficiency: unit.efficiency_score,
    target: unit.target_achievement
  }));

  const scopeColors = ['#28a745', '#17a2b8', '#6f42c1'];

  const getScopeBreakdownData = (unit) => {
    if (!unit.scope_breakdown) return [];
    return Object.entries(unit.scope_breakdown).map(([scope, value], index) => ({
      name: scope.toUpperCase(),
      value: value,
      fill: scopeColors[index] || '#8884d8'
    }));
  };

  const getCategoryBreakdownData = (unit) => {
    if (!unit.category_breakdown) return [];
    return Object.entries(unit.category_breakdown).map(([category, value]) => ({
      category: category,
      emissions: value
    }));
  };

  const getTrendData = (unitName) => {
    if (!data?.trend_data || !data.trend_data[unitName]) return [];
    return data.trend_data[unitName];
  };

  const getCombinedTrendData = (metric) => {
    if (!data?.trend_data) return [];
    
    // Get all unique months
    const allMonths = new Set();
    Object.values(data.trend_data).forEach(unitData => {
      unitData.forEach(point => allMonths.add(point.month));
    });
    
    const sortedMonths = Array.from(allMonths).sort();
    
    return sortedMonths.map(month => {
      const point = { month };
      Object.keys(data.trend_data).forEach(unit => {
        const unitPoint = data.trend_data[unit].find(p => p.month === month);
        if (unitPoint) {
          point[unit] = unitPoint[metric];
        }
      });
      return point;
    });
  };

  const getEfficiencySummary = () => {
    if (!data?.efficiency_metrics) return null;
    
    const metrics = data.efficiency_metrics;
    const avgEfficiency = metrics.reduce((sum, m) => sum + m.metric, 0) / metrics.length;
    const onTarget = metrics.filter(m => m.metric <= m.target).length;
    const total = metrics.length;
    
    return {
      average: avgEfficiency,
      onTarget,
      total,
      percentage: (onTarget / total) * 100
    };
  };

  const getTopEfficiencyUnits = (count = 5) => {
    if (!data?.efficiency_metrics) return [];
    return data.efficiency_metrics
      .sort((a, b) => a.metric - b.metric)
      .slice(0, count);
  };

  return (
    <div className="operational-performance-dashboard">
      <h2 className="rmr-text-2xl rmr-font-bold rmr-mb-6">Operational Unit Performance Dashboard</h2>
      
      {/* Alerts Panel - Expandable */}
      {data.alerts && data.alerts.length > 0 && (
        <div className="rmr-alerts-card rmr-mb-6">
          <div 
            className="rmr-alerts-header rmr-cursor-pointer"
            onClick={() => setAlertsExpanded(!alertsExpanded)}
          >
            <div className="rmr-flex rmr-justify-between rmr-items-center">
              <div className="rmr-flex rmr-items-center">
                <div className="rmr-alert-icon rmr-mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L1 21H23L12 2Z" fill="currentColor"/>
                    <path d="M12 8V14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="18" r="1" fill="white"/>
                  </svg>
                </div>
                <div>
                  <h5 className="rmr-alert-title rmr-mb-0">
                    Performance Alerts ({data.alerts.length})
                  </h5>
                  {!alertsExpanded && (
                    <p className="rmr-alert-subtitle rmr-mb-0">
                      Click to expand and view detailed alerts
                    </p>
                  )}
                </div>
              </div>
              <div className="rmr-flex rmr-items-center">
                <span className="rmr-alert-badge rmr-alert-badge-high rmr-mr-2">
                  {data.alerts.filter(a => a.severity === 'high').length} HIGH
                </span>
                <span className="rmr-alert-badge rmr-alert-badge-medium rmr-mr-3">
                  {data.alerts.filter(a => a.severity === 'medium').length} MEDIUM
                </span>
                <div className="rmr-alert-arrow">
                  {alertsExpanded ? '▼' : '▶'}
                </div>
              </div>
            </div>
          </div>
          {alertsExpanded && (
            <div className="rmr-p-6">
              {data.alerts.map((alert, index) => (
                <div key={index} className={`rmr-alert ${alert.severity === 'high' ? 'rmr-alert-error' : 'rmr-alert-warning'} rmr-mb-3`}>
                  <div className="rmr-flex rmr-justify-between rmr-items-start">
                    <div>
                      <strong>{alert.unit}</strong>: {alert.issue}
                      <br />
                      <small className="rmr-text-muted">Recommendation: {alert.recommendation}</small>
                    </div>
                    <span className={`rmr-badge ${alert.severity === 'high' ? 'rmr-badge-error' : 'rmr-badge-warning'} rmr-ml-2`}>
                      {alert.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Performance Chart */}
      <div className="rmr-flex rmr-flex-row rmr-gap-6 rmr-mb-6 rmr-flex-wrap">
        <div className="rmr-flex-1 rmr-min-w-0">
          <div className="rmr-card">
            <div className="rmr-card-header">
              <h5 className="rmr-card-title">Top Operational Units by Emissions</h5>
              <p className="rmr-card-subtitle">Click on a bar to see detailed breakdown</p>
            </div>
            <div className="rmr-p-6">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart 
                  data={barChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={50}
                    interval={0}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Emissions (tCO2e)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'emissions' ? `${value.toLocaleString()} tCO2e` : `${value}%`,
                      name === 'emissions' ? 'Total Emissions' : 'Target Achievement'
                    ]}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    wrapperStyle={{ paddingBottom: '10px' }}
                  />
                  <Bar 
                    dataKey="emissions" 
                    fill={getComputedStyle(document.documentElement).getPropertyValue('--rmr-primary')} 
                    name="Total Emissions"
                    onClick={(data) => setSelectedUnit(data)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="rmr-w-192 rmr-flex-shrink-0">
          <div className="rmr-card">
            <div className="rmr-card-header">
              <div className="rmr-flex rmr-justify-between rmr-items-center rmr-pr-2">
                <h5 className="rmr-card-title rmr-mb-0">Efficiency Metrics</h5>
                <div className="rmr-btn-group rmr-btn-group-compact" role="group">
                  <input
                    type="radio"
                    className="rmr-btn-check"
                    name="efficiencyView"
                    id="detailed"
                    checked={efficiencyView === 'detailed'}
                    onChange={() => setEfficiencyView('detailed')}
                  />
                  <label className={`rmr-btn rmr-btn-sm ${efficiencyView === 'detailed' ? 'rmr-btn-primary' : 'rmr-btn-secondary'}`} htmlFor="detailed">
                    Detailed
                  </label>
                  
                  <input
                    type="radio"
                    className="rmr-btn-check"
                    name="efficiencyView"
                    id="compact"
                    checked={efficiencyView === 'compact'}
                    onChange={() => setEfficiencyView('compact')}
                  />
                  <label className={`rmr-btn rmr-btn-sm ${efficiencyView === 'compact' ? 'rmr-btn-primary' : 'rmr-btn-secondary'}`} htmlFor="compact">
                    Compact
                  </label>
                  
                  <input
                    type="radio"
                    className="rmr-btn-check"
                    name="efficiencyView"
                    id="summary"
                    checked={efficiencyView === 'summary'}
                    onChange={() => setEfficiencyView('summary')}
                  />
                  <label className={`rmr-btn rmr-btn-sm ${efficiencyView === 'summary' ? 'rmr-btn-primary' : 'rmr-btn-secondary'}`} htmlFor="summary">
                    Summary
                  </label>
                </div>
              </div>
            </div>
            <div className="rmr-p-4" style={{ maxHeight: '280px', overflowY: 'auto' }}>
              {efficiencyView === 'detailed' && (
                <>
                  {data.efficiency_metrics && data.efficiency_metrics.map((metric, index) => (
                    <div key={index} className="rmr-mb-3">
                      <div className="rmr-flex rmr-justify-between rmr-items-center rmr-mb-1">
                        <small className="rmr-text-muted" style={{ maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {metric.unit}
                        </small>
                        <span className={`rmr-badge ${metric.metric <= metric.target ? 'rmr-badge-success' : 'rmr-badge-warning'} rmr-ml-2`}>
                          {metric.metric.toFixed(2)}
                        </span>
                      </div>
                      <div className="rmr-progress">
                        <div 
                          className={`rmr-progress-bar ${metric.metric <= metric.target ? '' : 'rmr-progress-warning'}`}
                          style={{ width: `${(metric.metric / metric.target) * 100}%` }}
                        ></div>
                      </div>
                      <small className="rmr-text-muted">Target: {metric.target.toFixed(2)} tCO2e/unit</small>
                    </div>
                  ))}
                </>
              )}
              
              {efficiencyView === 'compact' && (
                <>
                  {getTopEfficiencyUnits(8).map((metric, index) => (
                    <div key={index} className="rmr-mb-2">
                      <div className="rmr-flex rmr-justify-between rmr-items-center">
                        <small className="rmr-text-muted" style={{ maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {metric.unit}
                        </small>
                        <span className={`rmr-badge ${metric.metric <= metric.target ? 'rmr-badge-success' : 'rmr-badge-warning'}`}>
                          {metric.metric.toFixed(1)}
                        </span>
                      </div>
                      <div className="rmr-progress" style={{ height: '6px' }}>
                        <div 
                          className={`rmr-progress-bar ${metric.metric <= metric.target ? '' : 'rmr-progress-warning'}`}
                          style={{ width: `${(metric.metric / metric.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </>
              )}
              
              {efficiencyView === 'summary' && (
                <>
                  {(() => {
                    const summary = getEfficiencySummary();
                    if (!summary) return null;
                    return (
                      <div>
                        <div className="rmr-text-center rmr-mb-3">
                          <h4 className="rmr-text-primary">{summary.percentage.toFixed(1)}%</h4>
                          <small className="rmr-text-muted">Units on Target</small>
                        </div>
                        
                        <div className="rmr-grid rmr-grid-cols-2 rmr-text-center rmr-mb-3">
                          <div>
                            <h6>{summary.onTarget}</h6>
                            <small className="rmr-text-muted">On Target</small>
                          </div>
                          <div>
                            <h6>{summary.total - summary.onTarget}</h6>
                            <small className="rmr-text-muted">Needs Improvement</small>
                          </div>
                        </div>
                        
                        <div className="rmr-mb-3">
                          <small className="rmr-text-muted">Average Efficiency</small>
                          <h6>{summary.average.toFixed(2)} tCO2e/unit</h6>
                        </div>
                        
                        <div className="rmr-mt-3">
                          <h6>Top Performers</h6>
                          {getTopEfficiencyUnits(3).map((metric, index) => (
                            <div key={index} className="rmr-flex rmr-justify-between rmr-items-center rmr-mb-1">
                              <small className="rmr-text-muted" style={{ maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {metric.unit}
                              </small>
                              <span className="rmr-badge rmr-badge-success">
                                {metric.metric.toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trend Panel */}
      {data?.trend_data && Object.keys(data.trend_data).length > 0 && (
        <div className="rmr-card rmr-mb-6">
          <div className="rmr-card-header">
            <h5 className="rmr-card-title">Monthly Performance Trends</h5>
            <p className="rmr-card-subtitle">Track emissions and efficiency trends across top operational units</p>
          </div>
          <div className="rmr-p-6">
            <div className="rmr-grid rmr-grid-cols-1 rmr-md:grid-cols-2 rmr-gap-6">
              <div>
                <h6 className="rmr-font-semibold rmr-mb-3">Emissions Trends</h6>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart 
                    data={getCombinedTrendData('emissions')}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toLocaleString()} tCO2e`} />
                    <Legend 
                      verticalAlign="top" 
                      height={36}
                      wrapperStyle={{ paddingBottom: '10px' }}
                    />
                    {Object.keys(data.trend_data).slice(0, 5).map((unit, index) => (
                      <Area
                        key={unit}
                        type="monotone"
                        dataKey={unit}
                        stackId="1"
                        stroke={`hsl(${index * 60}, 70%, 50%)`}
                        fill={`hsl(${index * 60}, 70%, 50%)`}
                        fillOpacity={0.6}
                      />
                        ))}
                                              </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <h6 className="rmr-font-semibold rmr-mb-3">Efficiency Trends</h6>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart 
                          data={getCombinedTrendData('efficiency')}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => value.toFixed(2)} />
                          <Legend 
                            verticalAlign="top" 
                            height={36}
                            wrapperStyle={{ paddingBottom: '10px' }}
                          />
                          {Object.keys(data.trend_data).slice(0, 5).map((unit, index) => (
                            <Line
                              key={unit}
                              type="monotone"
                              dataKey={unit}
                              stroke={`hsl(${index * 60}, 70%, 50%)`}
                              strokeWidth={2}
                              dot={{ r: 3 }}
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

      {/* Selected Unit Details with Enhanced Drill-down */}
      {selectedUnit && (
        <div className="rmr-card rmr-mb-6">
          <div className="rmr-card-header">
            <div className="rmr-flex rmr-justify-between rmr-items-center">
              <h5 className="rmr-card-title">Detailed Analysis: {selectedUnit.name}</h5>
              <div>
                <button 
                  className="rmr-btn-secondary rmr-btn-sm"
                  onClick={() => setSelectedUnit(null)}
                >
                  Close
                </button>
              </div>
            </div>
            <p className="rmr-card-subtitle">Business Area: {selectedUnit.business_area}</p>
          </div>
          <div className="rmr-p-6">
            <div className="rmr-nav-tabs rmr-mb-4">
              <button 
                className={`rmr-nav-tab ${drillDownView === 'scope' ? 'active' : ''}`}
                onClick={() => setDrillDownView('scope')}
              >
                Scope Breakdown
              </button>
              <button 
                className={`rmr-nav-tab ${drillDownView === 'category' ? 'active' : ''}`}
                onClick={() => setDrillDownView('category')}
              >
                Category Breakdown
              </button>
              <button 
                className={`rmr-nav-tab ${drillDownView === 'trend' ? 'active' : ''}`}
                onClick={() => setDrillDownView('trend')}
              >
                Monthly Trends
              </button>
            </div>

            {drillDownView === 'scope' && (
              <div className="rmr-grid rmr-grid-cols-1 rmr-md:grid-cols-3 rmr-gap-6">
                <div className="rmr-col-span-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getScopeBreakdownData(selectedUnit)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getScopeBreakdownData(selectedUnit).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value.toLocaleString()} tCO2e`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h6 className="rmr-font-semibold rmr-mb-3">Scope Details</h6>
                  {Object.entries(selectedUnit.scope_breakdown || {}).map(([scope, value]) => (
                    <div key={scope} className="rmr-mb-2">
                      <strong>{scope.toUpperCase()}:</strong> {value.toLocaleString()} tCO2e
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {drillDownView === 'category' && (
              <div className="rmr-grid rmr-grid-cols-1 rmr-md:grid-cols-3 rmr-gap-6">
                <div className="rmr-col-span-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getCategoryBreakdownData(selectedUnit)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value.toLocaleString()} tCO2e`} />
                      <Bar dataKey="emissions" fill={getComputedStyle(document.documentElement).getPropertyValue('--rmr-secondary')} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h6 className="rmr-font-semibold rmr-mb-3">Category Details</h6>
                  {Object.entries(selectedUnit.category_breakdown || {}).map(([category, value]) => (
                    <div key={category} className="rmr-mb-2">
                      <strong>{category}:</strong> {value.toLocaleString()} tCO2e
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {drillDownView === 'trend' && (
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart 
                    data={getTrendData(selectedUnit.name)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'emissions' ? `${value.toLocaleString()} tCO2e` : value.toFixed(2),
                      name === 'emissions' ? 'Emissions' : 'Efficiency'
                    ]} />
                    <Legend 
                      verticalAlign="top" 
                      height={36}
                      wrapperStyle={{ paddingBottom: '10px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="emissions" 
                      stroke={getComputedStyle(document.documentElement).getPropertyValue('--rmr-success')} 
                      name="Emissions"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke={getComputedStyle(document.documentElement).getPropertyValue('--rmr-warning')} 
                      name="Efficiency Score"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            
            <div className="rmr-grid rmr-grid-cols-1 rmr-md:grid-cols-2 rmr-gap-6 rmr-mt-6">
              <div>
                <h6 className="rmr-font-semibold rmr-mb-3">Performance Metrics</h6>
                <div className="rmr-mb-2">
                  <strong>Total Emissions:</strong> {selectedUnit.emissions.toLocaleString()} tCO2e
                </div>
                <div className="rmr-mb-2">
                  <strong>Efficiency Score:</strong> {selectedUnit.efficiency} tCO2e/unit
                </div>
                <div className="rmr-mb-2">
                  <strong>Target Achievement:</strong> {selectedUnit.target}%
                </div>
                <div className="rmr-mb-2">
                  <strong>Trend:</strong> 
                  <span className={`rmr-badge ${selectedUnit.trend === 'decreasing' ? 'rmr-badge-success' : 'rmr-badge-secondary'} rmr-ml-2`}>
                    {selectedUnit.trend}
                  </span>
                </div>
              </div>
              <div>
                <h6 className="rmr-font-semibold rmr-mb-3">Recommendations</h6>
                <ul className="rmr-list-none rmr-pl-0">
                  {selectedUnit.efficiency > 2.0 && (
                    <li className="rmr-mb-2">
                      <span className="rmr-badge rmr-badge-warning rmr-mr-2">⚠️</span>
                      Consider efficiency improvements to reduce emissions per unit
                    </li>
                  )}
                  {selectedUnit.scope_breakdown?.scope1 > selectedUnit.emissions * 0.6 && (
                    <li className="rmr-mb-2">
                      <span className="rmr-badge rmr-badge-info rmr-mr-2">💡</span>
                      High Scope 1 emissions - review direct emission sources
                    </li>
                  )}
                  {selectedUnit.scope_breakdown?.scope2 > selectedUnit.emissions * 0.3 && (
                    <li className="rmr-mb-2">
                      <span className="rmr-badge rmr-badge-info rmr-mr-2">💡</span>
                      Consider energy efficiency measures for Scope 2 reduction
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="rmr-card rmr-bg-light">
        <div className="rmr-p-6">
          <div className="rmr-flex rmr-flex-row rmr-gap-6 rmr-justify-between">
            <div className="rmr-text-center rmr-flex-1">
              <h4 className="rmr-text-2xl rmr-font-bold rmr-text-primary rmr-mb-2">{data.top_units.length}</h4>
              <small className="rmr-text-muted">Units Analyzed</small>
            </div>
            <div className="rmr-text-center rmr-flex-1">
              <h4 className="rmr-text-2xl rmr-font-bold rmr-text-primary rmr-mb-2">{data.top_units.reduce((sum, unit) => sum + unit.total_emissions, 0).toLocaleString()}</h4>
              <small className="rmr-text-muted">Total Emissions (tCO2e)</small>
            </div>
            <div className="rmr-text-center rmr-flex-1">
              <h4 className="rmr-text-2xl rmr-font-bold rmr-text-primary rmr-mb-2">{(data.top_units.reduce((sum, unit) => sum + unit.efficiency_score, 0) / data.top_units.length).toFixed(2)}</h4>
              <small className="rmr-text-muted">Avg Efficiency Score</small>
            </div>
            <div className="rmr-text-center rmr-flex-1">
              <h4 className="rmr-text-2xl rmr-font-bold rmr-text-primary rmr-mb-2">{data.alerts ? data.alerts.length : 0}</h4>
              <small className="rmr-text-muted">Active Alerts</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalPerformanceDashboard; 