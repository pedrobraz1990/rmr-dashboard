"""
Data controller for emissions dashboard API endpoints
"""
from fastapi import APIRouter, HTTPException
from typing import Dict, List, Any
from app.services.data_service import emissions_service

router = APIRouter()

@router.get("/emissions")
async def get_emissions_data() -> Dict[str, Any]:
    """Get emissions data organized by scope"""
    try:
        return emissions_service.get_emissions_by_scope()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving emissions data: {str(e)}")

@router.get("/emissions/parameters")
async def get_emissions_by_parameter(limit: int = 10) -> List[Dict[str, Any]]:
    """Get top emissions by parameter type"""
    try:
        return emissions_service.get_emissions_by_parameter(limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving parameter data: {str(e)}")

@router.get("/emissions/hierarchy")
async def get_emissions_by_hierarchy() -> Dict[str, float]:
    """Get emissions by hierarchy level"""
    try:
        return emissions_service.get_emissions_by_hierarchy()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving hierarchy data: {str(e)}")

@router.get("/summary")
async def get_summary_stats() -> Dict[str, Any]:
    """Get summary statistics for the dashboard"""
    try:
        return emissions_service.get_summary_stats()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving summary stats: {str(e)}")

# New endpoints for chart proposals
@router.get("/emissions/top-parameters")
async def get_top_emission_parameters(limit: int = 15) -> List[Dict[str, Any]]:
    """Get top emission sources by parameter type for Chart 1"""
    try:
        return emissions_service.get_top_emission_parameters(limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving top parameters: {str(e)}")

@router.get("/emissions/hierarchy-treemap")
async def get_hierarchy_treemap_data(level: int = 3) -> Dict[str, Any]:
    """Get hierarchy data for treemap visualization for Chart 2"""
    try:
        return emissions_service.get_hierarchy_treemap_data(level)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving hierarchy treemap data: {str(e)}")

@router.get("/emissions/transportation")
async def get_transportation_emissions() -> Dict[str, Any]:
    """Get transportation emissions breakdown for Chart 3"""
    try:
        return emissions_service.get_transportation_emissions()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving transportation data: {str(e)}")

@router.get("/emissions/scope-category")
async def get_emissions_by_scope_category(year: int = 2023) -> Dict[str, Any]:
    """Get emissions data organized by scope and category for Chart 1"""
    try:
        return emissions_service.get_emissions_by_scope_category(year)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving scope-category data: {str(e)}")

@router.get("/emissions/gas-breakdown")
async def get_gas_emissions_breakdown(year: int = 2023) -> Dict[str, Any]:
    """Get gas emissions breakdown with conversion factors for Chart 2"""
    try:
        return emissions_service.get_gas_emissions_breakdown(year)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving gas breakdown data: {str(e)}")

@router.get("/emissions/hierarchical-heatmap")
async def get_hierarchical_emissions_heatmap(year: int = 2023) -> Dict[str, Any]:
    """Get hierarchical emissions data for heatmap visualization for Chart 3"""
    try:
        return emissions_service.get_hierarchical_emissions_heatmap(year)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving hierarchical heatmap data: {str(e)}")

# New endpoints for the three proposed charts
@router.get("/emissions/operational-performance")
async def get_operational_performance(year: int = 2023, limit: int = 15) -> Dict[str, Any]:
    """Get operational unit performance data for Chart Proposal 1"""
    try:
        return emissions_service.get_operational_performance(year, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving operational performance data: {str(e)}")

@router.get("/emissions/process-technology-analysis")
async def get_process_technology_analysis(technology: str = None, scope: str = None) -> Dict[str, Any]:
    """Get process and technology emissions analysis for Chart Proposal 2"""
    try:
        return emissions_service.get_process_technology_analysis(technology, scope)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving process technology analysis: {str(e)}")

@router.get("/emissions/hierarchical-intelligence")
async def get_hierarchical_intelligence(level: int = 1, year: int = 2023) -> Dict[str, Any]:
    """Get hierarchical emissions intelligence for Chart Proposal 3"""
    try:
        return emissions_service.get_hierarchical_intelligence(level, year)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving hierarchical intelligence data: {str(e)}")

@router.get("/health")
async def data_health_check() -> Dict[str, str]:
    """Health check for data service"""
    try:
        # Try to access the data service
        stats = emissions_service.get_summary_stats()
        return {
            "status": "healthy",
            "service": "Emissions Data Service",
            "records_loaded": str(stats.get('total_records', 0))
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Data service unhealthy: {str(e)}") 