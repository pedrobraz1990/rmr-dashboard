import React, { useState, useEffect } from 'react';
import { Card, Alert, Spinner } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import apiService from '../services/api_service';

const TopEmissionsChart = ({ limit = 15 }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getTopEmissions(limit);
        setData(response);
      } catch (err) {
        console.error('Error loading top emissions data:', err);
        setError('Failed to load top emissions data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [limit]);

  if (loading) {
    return (
      <Card className="chart-card">
        <Card.Body className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading top emissions data...</p>
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

  if (!data || !data.length) {
    return (
      <Card className="chart-card">
        <Card.Body>
          <Alert variant="warning">No top emissions data available</Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="chart-card">
      <Card.Header>
        <h5 className="mb-0">Top Emission Sources</h5>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="source" type="category" width={150} />
            <Tooltip />
            <Legend />
            <Bar dataKey="emissions" fill="#8884d8" name="Emissions (tCO2e)" />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default TopEmissionsChart; 