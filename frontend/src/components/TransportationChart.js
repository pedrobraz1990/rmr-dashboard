import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import apiService from '../services/api_service';

const TransportationChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getTransportationEmissions();
        setData(response);
      } catch (err) {
        console.error('Error loading transportation data:', err);
        setError('Failed to load transportation emissions data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Card className="chart-card">
        <Card.Body className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading transportation data...</p>
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
          <Alert variant="warning">No transportation data available</Alert>
        </Card.Body>
      </Card>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Card className="chart-card">
      <Card.Header>
        <h5 className="mb-0">Transportation Emissions Analysis</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.fuelTypeData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fuelType" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="emissions" fill="#8884d8" name="Emissions (tCO2e)" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
          <Col md={6}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.vehicleTypeData || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="emissions"
                >
                  {(data.vehicleTypeData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <div className="summary-stats">
              <h6>Transportation Summary</h6>
              <Row>
                <Col md={3}>
                  <div className="stat-item">
                    <strong>Total Transportation:</strong> {data.summary?.totalTransportation?.toFixed(2) || 'N/A'} tCO2e
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <strong>Fuel Types:</strong> {data.summary?.fuelTypes || 'N/A'}
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <strong>Vehicle Types:</strong> {data.summary?.vehicleTypes || 'N/A'}
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <strong>Avg per Vehicle:</strong> {data.summary?.avgPerVehicle?.toFixed(2) || 'N/A'} tCO2e
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

export default TransportationChart; 