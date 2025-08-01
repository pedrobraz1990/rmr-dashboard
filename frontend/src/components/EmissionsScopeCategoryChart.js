import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import apiService from '../services/api_service';

const EmissionsScopeCategoryChart = ({ year = 2023 }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getEmissionsByScopeCategory(year);
        setData(response);
      } catch (err) {
        console.error('Error loading scope category data:', err);
        setError('Failed to load emissions data by scope and category');
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
          <p className="mt-2">Loading emissions data...</p>
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
          <Alert variant="warning">No data available for the selected year</Alert>
        </Card.Body>
      </Card>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Card className="chart-card">
      <Card.Header>
        <h5 className="mb-0">Emissions by Scope and Category</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={8}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data.barChartData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="scope1" fill="#8884d8" name="Scope 1" />
                <Bar dataKey="scope2" fill="#82ca9d" name="Scope 2" />
                <Bar dataKey="scope3" fill="#ffc658" name="Scope 3" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
          <Col md={4}>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data.pieChartData || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(data.pieChartData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default EmissionsScopeCategoryChart; 