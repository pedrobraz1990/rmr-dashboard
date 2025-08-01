"""
Data models for ESG Dashboard using Pydantic
"""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class ChartType(str, Enum):
    """Supported chart types"""
    BAR = "bar"
    LINE = "line"
    PIE = "pie"
    SCATTER = "scatter"
    AREA = "area"

class ESGCategory(str, Enum):
    """ESG categories"""
    ENVIRONMENTAL = "environmental"
    SOCIAL = "social"
    GOVERNANCE = "governance"

class ESGDataPoint(BaseModel):
    """Individual ESG data point"""
    id: Optional[int] = None
    company_name: str
    category: ESGCategory
    metric_name: str
    value: float
    unit: str
    year: int
    quarter: Optional[int] = None
    source: Optional[str] = None
    created_at: Optional[datetime] = None

class ChartConfig(BaseModel):
    """Configuration for charts"""
    chart_type: ChartType
    title: str
    x_axis: str
    y_axis: str
    data_source: str
    filters: Optional[Dict[str, Any]] = None

class DashboardTab(BaseModel):
    """Dashboard tab configuration"""
    id: str
    title: str
    description: Optional[str] = None
    charts: List[ChartConfig]
    is_active: bool = True

class DataFilter(BaseModel):
    """Data filtering options"""
    companies: Optional[List[str]] = None
    categories: Optional[List[ESGCategory]] = None
    years: Optional[List[int]] = None
    metrics: Optional[List[str]] = None

class ChartData(BaseModel):
    """Chart data response"""
    labels: List[str]
    datasets: List[Dict[str, Any]]
    metadata: Optional[Dict[str, Any]] = None 