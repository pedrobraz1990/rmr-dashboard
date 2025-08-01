import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Alert, Badge, Form, Button } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import apiService from '../services/api_service';

const ProcessTechnologyAnalysis = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [selectedScope, setSelectedScope] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getProcessTechnologyAnalysis(selectedTechnology || null, selectedScope || null);
        setData(response.process_analysis);
      } catch (err) {
        setError('Failed to load process technology analysis data');
        console.error('Error loading process technology analysis:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedTechnology, selectedScope]);

  const handleFilterChange = () => {
    setLoading(true);
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading process technology analysis...</p>
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

  if (!data || !data.emissions_flow) {
    return (
      <Alert variant="warning">
        <Alert.Heading>No Data Available</Alert.Heading>
        <p>No process technology analysis data is currently available.</p>
      </Alert>
    );
  }

  // Prepare data for charts
  const technologyData = data.emissions_flow.nodes || [];
  const efficiencyData = Object.values(data.technology_efficiency || {});

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="process-technology-analysis">
      <h2 className="mb-4">Process & Technology Emissions Analysis</h2>
      
      {/* Filters */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Filter by Technology</Form.Label>
                    <Form.Select 
                      value={selectedTechnology} 
                      onChange={(e) => setSelectedTechnology(e.target.value)}
                    >
                      <option value="">All Technologies</option>
                      <option value="Refrigeração">Refrigeration</option>
                      <option value="Transporte">Transport</option>
                      <option value="Energia">Energy</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Filter by Scope</Form.Label>
                    <Form.Select 
                      value={selectedScope} 
                      onChange={(e) => setSelectedScope(e.target.value)}
                    >
                      <option value="">All Scopes</option>
                      <option value="scope1">Scope 1</option>
                      <option value="scope2">Scope 2</option>
                      <option value="scope3">Scope 3</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button variant="outline-primary" onClick={handleFilterChange}>
                    Apply Filters
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Technology Emissions Chart */}
      <Row className="mb-4">
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5>Technology Emissions Distribution</h5>
              <small className="text-muted">Emissions by technology type</small>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={technologyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value.toLocaleString()} tCO2e`} />
                  <Legend />
                  <Bar dataKey="emissions" fill="#28a745" name="Emissions (tCO2e)" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5>Technology Efficiency</h5>
            </Card.Header>
            <Card.Body>
              {efficiencyData.map((tech, index) => (
                <div key={index} className="mb-3 p-3 border rounded">
                  <h6>{tech.current_technology}</h6>
                  <div className="mb-2">
                    <small className="text-muted">Emission Factor:</small>
                    <br />
                    <Badge bg="info">{tech.emission_factor.toFixed(2)}</Badge>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Conversion Factor:</small>
                    <br />
                    <Badge bg="secondary">{tech.conversion_factor.toFixed(2)}</Badge>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Total Emissions:</small>
                    <br />
                    <Badge bg="warning">{tech.total_emissions.toLocaleString()} tCO2e</Badge>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Alternative:</small>
                    <br />
                    <Badge bg="success">{tech.alternative}</Badge>
                  </div>
                  <div>
                    <small className="text-muted">Potential Savings:</small>
                    <br />
                    <Badge bg="danger">{tech.potential_savings}%</Badge>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Emissions Flow Visualization */}
      {data.emissions_flow.links && data.emissions_flow.links.length > 0 && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5>Emissions Flow Analysis</h5>
                <small className="text-muted">Flow of emissions from processes to categories</small>
              </Card.Header>
              <Card.Body>
                <div className="emissions-flow-diagram">
                  {data.emissions_flow.links.map((link, index) => {
                    const sourceNode = data.emissions_flow.nodes.find(n => n.id === link.source);
                    const targetNode = data.emissions_flow.nodes.find(n => n.id === link.target);
                    
                    return (
                      <div key={index} className="flow-item mb-3 p-3 border rounded">
                        <div className="row">
                          <div className="col-md-4">
                            <strong>Source:</strong> {sourceNode?.name || link.source}
                          </div>
                          <div className="col-md-4 text-center">
                            <Badge bg="primary">{link.value.toLocaleString()} tCO2e</Badge>
                          </div>
                          <div className="col-md-4 text-end">
                            <strong>Target:</strong> {targetNode?.name || link.target}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Optimization Opportunities */}
      <Row className="mb-4">
        <Col>
          <Card className="border-success">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">🚀 Optimization Opportunities</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                {efficiencyData.filter(tech => tech.potential_savings > 50).map((tech, index) => (
                  <Col md={6} key={index} className="mb-3">
                    <Alert variant="info">
                      <Alert.Heading>{tech.current_technology}</Alert.Heading>
                      <p>
                        <strong>Current Emissions:</strong> {tech.total_emissions.toLocaleString()} tCO2e
                        <br />
                        <strong>Alternative:</strong> {tech.alternative}
                        <br />
                        <strong>Potential Savings:</strong> {tech.potential_savings}%
                      </p>
                      <hr />
                      <p className="mb-0">
                        <strong>Recommendation:</strong> Consider upgrading to {tech.alternative} 
                        to reduce emissions by {tech.potential_savings}%.
                      </p>
                    </Alert>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Summary Stats */}
      <Row>
        <Col>
          <Card className="bg-light">
            <Card.Body>
              <Row>
                <Col md={3} className="text-center">
                  <h4>{technologyData.length}</h4>
                  <small className="text-muted">Technologies Analyzed</small>
                </Col>
                <Col md={3} className="text-center">
                  <h4>{technologyData.reduce((sum, tech) => sum + tech.emissions, 0).toLocaleString()}</h4>
                  <small className="text-muted">Total Emissions (tCO2e)</small>
                </Col>
                <Col md={3} className="text-center">
                  <h4>{efficiencyData.filter(tech => tech.potential_savings > 50).length}</h4>
                  <small className="text-muted">High-Potential Upgrades</small>
                </Col>
                <Col md={3} className="text-center">
                  <h4>{Math.round(efficiencyData.reduce((sum, tech) => sum + tech.potential_savings, 0) / efficiencyData.length)}%</h4>
                  <small className="text-muted">Avg Potential Savings</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProcessTechnologyAnalysis; 