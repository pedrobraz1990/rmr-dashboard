# RMR Dashboard - Improved Chart Proposals for Single Company Emissions Analysis

## Overview
Based on the Climas data format analysis, this document proposes 3 charts specifically designed for **single company internal analysis** of emissions data. The proposals focus on operational insights, emission reduction opportunities, and performance tracking across business units and processes.

## Data Context
- **Dataset**: 23,480 records of emissions data from 2023 (single company: ML - Brasil)
- **Structure**: 31 columns with detailed operational and hierarchical information
- **Key Dimensions**: 7-level hierarchy, 3 emission scopes, 10 gas types, 10 emission categories
- **Temporal**: Monthly granularity (2023-01 to 2023-12)
- **Focus**: Internal operational analysis and emission reduction planning

---

## Chart Proposal 1: Operational Unit Performance Dashboard

### Chart Type: Multi-panel Dashboard with Performance Metrics
### Purpose: Track emissions performance across operational units and identify improvement opportunities

### Data Source
- Group by `Unidade operacional` and `Hierarquia nível 2` (business areas)
- Aggregate emissions by month and scope
- Include efficiency metrics and trends

### Chart Features
- **Main panel**: Emissions by operational unit (top 15 units)
- **Efficiency panel**: Emissions per unit of activity (normalized metrics)
- **Trend panel**: Monthly performance trends for selected units
- **Alert panel**: Units exceeding targets or showing concerning trends
- **Drill-down**: Click to see detailed breakdown by scope and category

### Expected Insights
- Identify high-emission operational units requiring immediate attention
- Track efficiency improvements over time
- Compare performance across similar business units
- Identify best practices from low-emission units
- Plan targeted reduction initiatives

### Sample Data Structure
```json
{
  "operational_performance": {
    "top_units": [
      {
        "unit": "GFL Logística",
        "total_emissions": 58650.63,
        "scope_breakdown": {"scope1": 45000, "scope2": 8000, "scope3": 5650.63},
        "efficiency_score": 0.85,
        "trend": "decreasing",
        "target_achievement": 92
      }
    ],
    "efficiency_metrics": {
      "emissions_per_activity": [
        {"unit": "CD 300 - Louveira", "metric": 2.3, "target": 2.0},
        {"unit": "aiqfome", "metric": 1.8, "target": 1.5}
      ]
    },
    "alerts": [
      {
        "unit": "CD 1500 - Candeias",
        "issue": "High emissions increase",
        "severity": "high",
        "recommendation": "Review refrigeration systems"
      }
    ]
  }
}
```

---

## Chart Proposal 2: Process & Technology Emissions Analysis

### Chart Type: Sankey Diagram + Process Flow Analysis
### Purpose: Visualize emissions flow through different processes and technologies

### Data Source
- Group by `Tecnologia`, `Categoria`, and `Parâmetro`
- Analyze conversion factors and emission factors
- Track process efficiency improvements

### Chart Features
- **Sankey diagram**: Show emissions flow from processes to gas types
- **Process efficiency panel**: Conversion factors and emission factors analysis
- **Technology comparison**: Compare different technologies' environmental impact
- **Optimization opportunities**: Identify processes with high improvement potential
- **Interactive filters**: Filter by scope, category, or technology type

### Expected Insights
- Understand which processes contribute most to emissions
- Identify technology upgrade opportunities
- Track process efficiency improvements
- Compare different operational approaches
- Plan technology investment priorities

### Sample Data Structure
```json
{
  "process_analysis": {
    "emissions_flow": {
      "nodes": [
        {"id": "refrigeration", "name": "Refrigeration Systems", "emissions": 15000},
        {"id": "transport", "name": "Transport Operations", "emissions": 25000},
        {"id": "energy", "name": "Energy Consumption", "emissions": 12000}
      ],
      "links": [
        {"source": "refrigeration", "target": "HFC", "value": 8000},
        {"source": "transport", "target": "CO2", "value": 20000},
        {"source": "energy", "target": "CO2", "value": 10000}
      ]
    },
    "technology_efficiency": {
      "refrigeration_systems": {
        "current_technology": "HFC-134a",
        "emission_factor": 1300,
        "alternative": "CO2 systems",
        "potential_savings": 60
      },
      "transport_fleet": {
        "current_technology": "Diesel",
        "emission_factor": 2.68,
        "alternative": "Electric",
        "potential_savings": 80
      }
    }
  }
}
```

---

## Chart Proposal 3: Hierarchical Emissions Intelligence Dashboard

### Chart Type: Interactive Tree Map + Drill-down Analytics
### Purpose: Comprehensive analysis of emissions across organizational hierarchy with actionable insights

### Data Source
- Group by all 7 hierarchical levels
- Include scope breakdown and temporal trends
- Add comparative analysis and benchmarks

### Chart Features
- **Hierarchical tree map**: Visualize emissions across organizational structure
- **Scope analysis panel**: Breakdown by emission scope for each level
- **Temporal trends**: Monthly performance tracking
- **Benchmarking**: Compare units within same hierarchy level
- **Action items**: Automated recommendations based on data patterns
- **Export capabilities**: Generate detailed reports for stakeholders

### Expected Insights
- Identify organizational hotspots requiring attention
- Track performance across hierarchy levels
- Compare similar units for best practice identification
- Generate automated recommendations for improvement
- Support strategic planning and resource allocation

### Sample Data Structure
```json
{
  "hierarchical_intelligence": {
    "tree_structure": {
      "level_1": "ML",
      "level_2": {
        "Logística": {
          "emissions": 59409.17,
          "scope_breakdown": {"scope1": 45000, "scope2": 8000, "scope3": 6409.17},
          "units": 4,
          "trend": "decreasing",
          "efficiency_score": 0.78
        },
        "Varejo": {
          "emissions": 36606.34,
          "scope_breakdown": {"scope1": 20000, "scope2": 12000, "scope3": 4606.34},
          "units": 3,
          "trend": "stable",
          "efficiency_score": 0.82
        }
      }
    },
    "benchmarks": {
      "logistics_avg": 14852.29,
      "retail_avg": 12202.11,
      "corporate_avg": 1627.13
    },
    "recommendations": [
      {
        "unit": "GFL Logística",
        "issue": "Highest emissions in logistics",
        "action": "Implement route optimization",
        "potential_savings": 15
      },
      {
        "unit": "CD 300 - Louveira",
        "issue": "High energy consumption",
        "action": "Upgrade to LED lighting",
        "potential_savings": 8
      }
    ]
  }
}
```

---

## Implementation Priority

### Phase 1: Operational Unit Performance Dashboard
- **Priority**: High
- **Complexity**: Medium
- **Impact**: High - provides actionable insights for operational managers
- **Development Time**: 4-5 days
- **Data Processing**: Moderate (aggregation and efficiency calculations)

### Phase 2: Process & Technology Emissions Analysis
- **Priority**: High
- **Complexity**: High
- **Impact**: High - supports technology investment decisions
- **Development Time**: 6-7 days
- **Data Processing**: Complex (flow analysis and efficiency modeling)

### Phase 3: Hierarchical Emissions Intelligence Dashboard
- **Priority**: Medium
- **Complexity**: High
- **Impact**: High - strategic planning and resource allocation
- **Development Time**: 7-8 days
- **Data Processing**: Complex (hierarchical analysis and benchmarking)

---

## Technical Requirements

### Backend API Endpoints Needed
1. `GET /api/emissions/operational-performance?year=2023&limit=15`
2. `GET /api/emissions/process-analysis?technology={tech}&scope={scope}`
3. `GET /api/emissions/hierarchical-intelligence?level={1-7}&year=2023`

### Data Processing Functions
```python
def analyze_operational_performance(df):
    """Analyze emissions performance across operational units"""
    return df.groupby(['Unidade operacional', 'Hierarquia nível 2']).agg({
        'Emissões (tCO2e)': 'sum',
        'Emissões (tGEE)': 'sum',
        'Valor': 'sum'  # Activity metric
    }).reset_index()

def calculate_process_efficiency(df):
    """Calculate process efficiency and identify optimization opportunities"""
    return df.groupby(['Tecnologia', 'Categoria']).agg({
        'Fator de conversão': 'mean',
        'Fator de emissão': 'mean',
        'Emissões (tCO2e)': 'sum'
    }).reset_index()

def build_hierarchical_intelligence(df):
    """Build comprehensive hierarchical analysis with benchmarks"""
    hierarchy_cols = [col for col in df.columns if 'Hierarquia nível' in col]
    return df.groupby(hierarchy_cols + ['Escopo']).agg({
        'Emissões (tCO2e)': 'sum',
        'Unidade operacional': 'nunique'
    }).reset_index()
```

### Frontend Components
1. `OperationalPerformanceDashboard.js` - Multi-panel performance tracking
2. `ProcessTechnologyAnalysis.js` - Sankey diagram with efficiency analysis
3. `HierarchicalIntelligenceDashboard.js` - Interactive tree map with recommendations

### Dependencies
- **Chart.js** (for basic charts)
- **D3.js** (for Sankey diagrams and tree maps)
- **React-chartjs-2** (for Chart.js integration)
- **Recharts** (for advanced visualizations)

---

## Key Improvements Over Previous Proposals

### 1. Single Company Focus
- Removed unnecessary company grouping
- Focus on internal operational analysis
- Emphasize performance tracking and improvement

### 2. Actionable Insights
- Include efficiency metrics and benchmarks
- Provide specific recommendations
- Track improvement opportunities

### 3. Operational Relevance
- Focus on business units and processes
- Include technology analysis
- Support decision-making at operational level

### 4. Strategic Value
- Hierarchical intelligence for resource allocation
- Process optimization opportunities
- Technology investment guidance

---

## Success Metrics

### Operational Impact
- Reduction in emissions per operational unit
- Improved efficiency scores
- Implementation of recommended actions

### User Engagement
- Time spent analyzing operational data
- Drill-down interactions on specific units
- Export of detailed performance reports

### Business Value
- Cost savings from emission reductions
- Improved operational efficiency
- Better resource allocation decisions

---

## Next Steps for Implementation

1. **Data Service Enhancement**: Add operational performance analysis methods
2. **API Endpoint Creation**: Implement the three new analysis endpoints
3. **Frontend Component Development**: Create React components for each dashboard
4. **Efficiency Calculations**: Implement normalized performance metrics
5. **Recommendation Engine**: Develop automated insight generation
6. **User Testing**: Validate with operational managers
7. **Documentation**: Update API docs and user guides 