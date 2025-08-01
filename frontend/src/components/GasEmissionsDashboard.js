import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import apiService from '../services/api_service';

const GasEmissionsDashboard = ({ year = 2023 }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getGasEmissionsBreakdown(year);
        setData(response);
      } catch (err) {
        console.error('Error loading gas emissions data:', err);
        setError('Failed to load gas emissions breakdown data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [year]);

  if (loading) {
    return (
      <Card className="chart-card">
        <Card.Body className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading gas emissions data...</p>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="chart-card">
        <Card.Body>
          <Alert variant="danger">{error}</Alert>
        </Card.Body>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="chart-card">
        <Card.Body>
          <Alert variant="warning">No gas emissions data available for the selected year</Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="chart-card">
      <Card.Header>
        <h5 className="mb-0">Gas Emissions Breakdown Dashboard</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.gasBreakdown || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="gas" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="emissions" fill="#8884d8" name="Emissions (tCO2e)" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
          <Col md={6}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.trendData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="co2" stroke="#8884d8" name="CO2" />
                <Line type="monotone" dataKey="ch4" stroke="#82ca9d" name="CH4" />
                <Line type="monotone" dataKey="n2o" stroke="#ffc658" name="N2O" />
              </LineChart>
            </ResponsiveContainer>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <div className="summary-stats">
              <h6>Summary Statistics</h6>
              <Row>
                <Col md={3}>
                  <div className="stat-item">
                    <strong>Total CO2:</strong> {data.summary?.totalCO2?.toFixed(2) || 'N/A'} tCO2e
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <strong>Total CH4:</strong> {data.summary?.totalCH4?.toFixed(2) || 'N/A'} tCO2e
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <strong>Total N2O:</strong> {data.summary?.totalN2O?.toFixed(2) || 'N/A'} tCO2e
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <strong>Total Emissions:</strong> {data.summary?.totalEmissions?.toFixed(2) || 'N/A'} tCO2e
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default GasEmissionsDashboard; 