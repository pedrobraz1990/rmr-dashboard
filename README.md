# RMR Emissions Intelligence Dashboard

A comprehensive web application for analyzing corporate emissions data with advanced operational insights and emission reduction recommendations.

## Overview

This dashboard implements three advanced chart proposals specifically designed for single company internal analysis of emissions data, focusing on operational insights, emission reduction opportunities, and performance tracking across business units and processes.

## New Chart Implementations

### 1. Operational Unit Performance Dashboard
- **Purpose**: Track emissions performance across operational units and identify improvement opportunities
- **Features**:
  - Multi-panel dashboard with performance metrics
  - Efficiency analysis with normalized metrics
  - Performance alerts and recommendations
  - Interactive drill-down capabilities
  - Scope breakdown analysis

### 2. Process & Technology Emissions Analysis
- **Purpose**: Visualize emissions flow through different processes and technologies
- **Features**:
  - Technology efficiency analysis
  - Emissions flow visualization
  - Optimization opportunities identification
  - Interactive filters by technology and scope
  - Alternative technology recommendations

### 3. Hierarchical Emissions Intelligence Dashboard
- **Purpose**: Comprehensive analysis of emissions across organizational hierarchy with actionable insights
- **Features**:
  - Interactive hierarchical tree map
  - Benchmark analysis and comparisons
  - Automated recommendations engine
  - Multi-level hierarchy analysis
  - Performance tracking and trends

## Technical Stack

### Backend
- **Framework**: FastAPI (Python)
- **Data Processing**: Pandas, NumPy
- **API**: RESTful endpoints with JSON responses
- **Data Source**: Excel files (TestData.xlsx)

### Frontend
- **Framework**: React.js
- **UI Library**: React Bootstrap
- **Charts**: Recharts, Chart.js
- **Styling**: Bootstrap CSS

## API Endpoints

### New Chart Endpoints
- `GET /api/data/emissions/operational-performance` - Operational unit performance data
- `GET /api/data/emissions/process-technology-analysis` - Process and technology analysis
- `GET /api/data/emissions/hierarchical-intelligence` - Hierarchical intelligence data

### Legacy Endpoints (Maintained)
- `GET /api/data/emissions` - Basic emissions data
- `GET /api/data/summary` - Summary statistics
- `GET /api/data/emissions/parameters` - Parameter-based emissions

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Data Structure

The application processes emissions data with the following key dimensions:
- **7-level hierarchy** for organizational structure
- **3 emission scopes** (Scope 1, 2, 3)
- **10 gas types** for detailed analysis
- **10 emission categories** for classification
- **Monthly granularity** (2023-01 to 2023-12)

## Key Features

### Operational Intelligence
- Performance tracking across business units
- Efficiency metrics and benchmarking
- Automated alert generation
- Improvement opportunity identification

### Technology Analysis
- Process efficiency evaluation
- Technology upgrade recommendations
- Emissions flow visualization
- Cost-benefit analysis for upgrades

### Strategic Planning
- Hierarchical performance analysis
- Resource allocation insights
- Automated recommendations
- Trend analysis and forecasting

## Usage

1. **Start the backend server** on port 8000
2. **Start the frontend application** on port 3000
3. **Navigate to the dashboard** and select analysis type:
   - Operational Performance
   - Process & Technology
   - Hierarchical Intelligence
4. **Use filters** to customize the analysis
5. **Explore interactive charts** and drill-down capabilities
6. **Review recommendations** for emission reduction opportunities

## Data Sources

The application uses the Climas data format with:
- 23,480 records of emissions data from 2023
- Single company focus (ML - Brasil)
- 31 columns with detailed operational information
- Comprehensive hierarchical and categorical data

## Development

### Project Structure
```
RMR Dashboard/
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
└── data/
    └── TestData.xlsx
```

### Adding New Charts
1. Create backend service method in `data_service.py`
2. Add API endpoint in `data_controller.py`
3. Create React component in `frontend/src/components/`
4. Add API method in `api_service.js`
5. Integrate into dashboard

## Contributing

1. Follow the established code organization patterns
2. Use descriptive file and function names
3. Include proper error handling
4. Add comprehensive documentation
5. Test API endpoints and frontend components

## License

This project is designed for internal corporate use and emissions analysis. 