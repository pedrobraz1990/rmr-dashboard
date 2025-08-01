import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Alert, Badge, Form, Button, ListGroup } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Treemap, TreemapItem } from 'recharts';
import apiService from '../services/api_service';

const HierarchicalIntelligenceDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getHierarchicalIntelligence(selectedLevel, selectedYear);
        setData(response.hierarchical_intelligence);
      } catch (err) {
        setError('Failed to load hierarchical intelligence data');
        console.error('Error loading hierarchical intelligence:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedLevel, selectedYear]);

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading hierarchical intelligence data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  if (!data || !data.tree_structure) {
    return (
      <Alert variant="warning">
        <Alert.Heading>No Data Available</Alert.Heading>
        <p>No hierarchical intelligence data is currently available.</p>
      </Alert>
    );
  }

  // Prepare data for charts
  const treeData = Object.entries(data.tree_structure).map(([name, info]) => ({
    name,
    size: info.emissions,
    emissions: info.emissions,
    units: info.units,
    efficiency: info.efficiency_score,
    trend: info.trend
  }));

  const scopeColors = ['#28a745', '#17a2b8', '#6f42c1'];

  const getScopeBreakdownData = (node) => {
    if (!node.scope_breakdown) return [];
    return Object.entries(node.scope_breakdown).map(([scope, value], index) => ({
      name: scope.toUpperCase(),
      value: value,
      fill: scopeColors[index] || '#8884d8'
    }));
  };

  return (
    <div className="hierarchical-intelligence-dashboard">
      <h2 className="mb-4">Hierarchical Emissions Intelligence Dashboard</h2>
      
      {/* Filters */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Hierarchy Level</Form.Label>
                    <Form.Select 
                      value={selectedLevel} 
                      onChange={(e) => setSelectedLevel(parseInt(e.target.value))}
                    >
                      <option value={1}>Level 1 - Company</option>
                      <option value={2}>Level 2 - Business Areas</option>
                      <option value={3}>Level 3 - Departments</option>
                      <option value={4}>Level 4 - Teams</option>
                      <option value={5}>Level 5 - Units</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Select 
                      value={selectedYear} 
                      onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    >
                      <option value={2023}>2023</option>
                      <option value={2022}>2022</option>
                      <option value={2021}>2021</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button variant="outline-primary" onClick={() => setSelectedNode(null)}>
                    Reset View
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Hierarchical Tree Map */}
      <Row className="mb-4">
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5>Hierarchical Emissions Tree Map</h5>
              <small className="text-muted">Click on a node to see detailed analysis</small>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={treeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'emissions' ? `${value.toLocaleString()} tCO2e` : value,
                      name === 'emissions' ? 'Emissions' : name === 'units' ? 'Units' : 'Efficiency'
                    ]}
                  />
                  <Legend />
                  <Bar 
                    dataKey="emissions" 
                    fill="#28a745" 
                    name="Emissions (tCO2e)"
                    onClick={(data) => setSelectedNode(data)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5>Benchmarks & Performance</h5>
            </Card.Header>
            <Card.Body>
              {data.benchmarks && (
                <div className="mb-4">
                  <h6>Benchmark Metrics</h6>
                  <div className="mb-2">
                    <small className="text-muted">Average Emissions:</small>
                    <br />
                    <Badge bg="info">{data.benchmarks.average_emissions.toLocaleString()} tCO2e</Badge>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Maximum Emissions:</small>
                    <br />
                    <Badge bg="warning">{data.benchmarks.max_emissions.toLocaleString()} tCO2e</Badge>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Minimum Emissions:</small>
                    <br />
                    <Badge bg="success">{data.benchmarks.min_emissions.toLocaleString()} tCO2e</Badge>
                  </div>
                </div>
              )}
              
              <h6>Performance Summary</h6>
              {treeData.map((node, index) => (
                <div key={index} className="mb-3 p-2 border rounded">
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>{node.name}</strong>
                    <Badge bg={node.emissions > (data.benchmarks?.average_emissions || 0) ? 'warning' : 'success'}>
                      {node.emissions.toLocaleString()} tCO2e
                    </Badge>
                  </div>
                  <small className="text-muted">
                    Units: {node.units} | Efficiency: {node.efficiency}
                  </small>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Selected Node Details */}
      {selectedNode && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5>Detailed Analysis: {selectedNode.name}</h5>
                <button 
                  className="btn btn-sm btn-outline-secondary float-end"
                  onClick={() => setSelectedNode(null)}
                >
                  Close
                </button>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h6>Scope Breakdown</h6>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={getScopeBreakdownData(selectedNode)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getScopeBreakdownData(selectedNode).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value.toLocaleString()} tCO2e`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Col>
                  <Col md={6}>
                    <h6>Performance Metrics</h6>
                    <div className="mb-3">
                      <strong>Total Emissions:</strong> {selectedNode.emissions.toLocaleString()} tCO2e
                    </div>
                    <div className="mb-3">
                      <strong>Number of Units:</strong> {selectedNode.units}
                    </div>
                    <div className="mb-3">
                      <strong>Efficiency Score:</strong> {selectedNode.efficiency}
                    </div>
                    <div className="mb-3">
                      <strong>Trend:</strong> 
                      <Badge bg={selectedNode.trend === 'decreasing' ? 'success' : 'secondary'} className="ms-2">
                        {selectedNode.trend}
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <strong>Benchmark Comparison:</strong>
                      <Badge bg={selectedNode.emissions > (data.benchmarks?.average_emissions || 0) ? 'warning' : 'success'} className="ms-2">
                        {selectedNode.emissions > (data.benchmarks?.average_emissions || 0) ? 'Above Average' : 'Below Average'}
                      </Badge>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <Row className="mb-4">
          <Col>
            <Card className="border-primary">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">💡 Automated Recommendations</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  {data.recommendations.map((rec, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{rec.unit}</div>
                        <div className="text-muted">{rec.issue}</div>
                        <div className="mt-2">
                          <strong>Action:</strong> {rec.action}
                        </div>
                      </div>
                      <Badge bg="success" text="dark">
                        {rec.potential_savings}% savings
                      </Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Summary Stats */}
      <Row>
        <Col>
          <Card className="bg-light">
            <Card.Body>
              <Row>
                <Col md={3} className="text-center">
                  <h4>{treeData.length}</h4>
                  <small className="text-muted">Hierarchy Nodes</small>
                </Col>
                <Col md={3} className="text-center">
                  <h4>{treeData.reduce((sum, node) => sum + node.emissions, 0).toLocaleString()}</h4>
                  <small className="text-muted">Total Emissions (tCO2e)</small>
                </Col>
                <Col md={3} className="text-center">
                  <h4>{treeData.reduce((sum, node) => sum + node.units, 0)}</h4>
                  <small className="text-muted">Total Units</small>
                </Col>
                <Col md={3} className="text-center">
                  <h4>{data.recommendations ? data.recommendations.length : 0}</h4>
                  <small className="text-muted">Recommendations</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HierarchicalIntelligenceDashboard; 