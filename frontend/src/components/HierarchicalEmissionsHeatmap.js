import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import apiService from '../services/api_service';

const HierarchicalEmissionsHeatmap = ({ year = 2023 }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getHierarchicalEmissionsHeatmap(year);
        setData(response);
      } catch (err) {
        console.error('Error loading hierarchical emissions data:', err);
        setError('Failed to load hierarchical emissions heatmap data');
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
          <p className="mt-2">Loading hierarchical emissions data...</p>
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
          <Alert variant="warning">No hierarchical emissions data available for the selected year</Alert>
        </Card.Body>
      </Card>
    );
  }

  const CustomizedContent = (props) => {
    const { root, depth, x, y, width, height, name, size, fill } = props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? fill : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text
            x={x + 4}
            y={y + 18}
            fill="#fff"
            fontSize={16}
            fillOpacity={0.9}
          >
            {size}
          </text>
        ) : null}
      </g>
    );
  };

  return (
    <Card className="chart-card">
      <Card.Header>
        <h5 className="mb-0">Hierarchical Emissions Heatmap</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <ResponsiveContainer width="100%" height={500}>
              <Treemap
                data={data.treemapData || []}
                dataKey="size"
                ratio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
                content={<CustomizedContent />}
              >
                <Tooltip />
              </Treemap>
            </ResponsiveContainer>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <div className="summary-stats">
              <h6>Hierarchy Summary</h6>
              <Row>
                <Col md={3}>
                  <div className="stat-item">
                    <strong>Total Units:</strong> {data.summary?.totalUnits || 'N/A'}
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <strong>Max Emissions:</strong> {data.summary?.maxEmissions?.toFixed(2) || 'N/A'} tCO2e
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <strong>Min Emissions:</strong> {data.summary?.minEmissions?.toFixed(2) || 'N/A'} tCO2e
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <strong>Avg Emissions:</strong> {data.summary?.avgEmissions?.toFixed(2) || 'N/A'} tCO2e
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

export default HierarchicalEmissionsHeatmap; 