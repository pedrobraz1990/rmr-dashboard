/**
 * API service for fetching emissions data from the backend
 */
import config from '../config';

const API_BASE_URL = config.API_BASE_URL;

class ApiService {
  /**
   * Fetch emissions data organized by scope
   */
  async getEmissionsData() {
    try {
      const response = await fetch(`${API_BASE_URL}/emissions`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching emissions data:', error);
      // Return fallback data structure
      return this.getFallbackData();
    }
  }

  /**
   * Fetch emissions data by parameter type
   */
  async getEmissionsByParameter(limit = 10) {
    try {
      const response = await fetch(`${API_BASE_URL}/emissions/parameters?limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching parameter data:', error);
      return [];
    }
  }

  /**
   * Fetch emissions data by hierarchy level
   */
  async getEmissionsByHierarchy() {
    try {
      const response = await fetch(`${API_BASE_URL}/emissions/hierarchy`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching hierarchy data:', error);
      return {};
    }
  }

  /**
   * Fetch summary statistics
   */
  async getSummaryStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/summary`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching summary stats:', error);
      return this.getFallbackStats();
    }
  }

  // New methods for chart proposals
  /**
   * Fetch top emission parameters for Chart 1
   */
  async getTopEmissionParameters(limit = 15) {
    try {
      const response = await fetch(`${API_BASE_URL}/emissions/top-parameters?limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching top emission parameters:', error);
      return [];
    }
  }

  /**
   * Fetch hierarchy treemap data for Chart 2
   */
  async getHierarchyTreemapData(level = 3) {
    try {
      const response = await fetch(`${API_BASE_URL}/emissions/hierarchy-treemap?level=${level}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching hierarchy treemap data:', error);
      return { hierarchy: {} };
    }
  }

  /**
   * Fetch transportation emissions data for Chart 3
   */
  async getTransportationEmissions() {
    try {
      const response = await fetch(`${API_BASE_URL}/emissions/transportation`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching transportation emissions:', error);
      return { transportation: {} };
    }
  }

  /**
   * Fetch emissions data organized by scope and category for Chart 1
   */
  async getEmissionsByScopeCategory(year = 2023) {
    try {
      const response = await fetch(`${API_BASE_URL}/emissions/scope-category?year=${year}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching scope-category emissions:', error);
      return { emissions_by_scope_category: {} };
    }
  }

  /**
   * Fetch gas emissions breakdown with conversion factors for Chart 2
   */
  async getGasEmissionsBreakdown(year = 2023) {
    try {
      const response = await fetch(`${API_BASE_URL}/emissions/gas-breakdown?year=${year}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching gas emissions breakdown:', error);
      return { gas_emissions_breakdown: {} };
    }
  }

  /**
   * Fetch hierarchical emissions data for heatmap visualization for Chart 3
   */
  async getHierarchicalEmissionsHeatmap(year = 2023) {
    try {
      const response = await fetch(`${API_BASE_URL}/emissions/hierarchical-heatmap?year=${year}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching hierarchical emissions heatmap:', error);
      return { hierarchical_emissions: {} };
    }
  }

  /**
   * Fetch operational performance data for Chart Proposal 1
   */
  async getOperationalPerformance(year = 2023, limit = 15) {
    try {
      const response = await fetch(`${API_BASE_URL}/emissions/operational-performance?year=${year}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching operational performance data:', error);
      return { operational_performance: {} };
    }
  }

  /**
   * Fetch process and technology analysis for Chart Proposal 2
   */
  async getProcessTechnologyAnalysis(technology = null, scope = null) {
    try {
      let url = `${API_BASE_URL}/emissions/process-technology-analysis`;
      const params = new URLSearchParams();
      if (technology) params.append('technology', technology);
      if (scope) params.append('scope', scope);
      if (params.toString()) url += `?${params.toString()}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching process technology analysis:', error);
      return { process_analysis: {} };
    }
  }

  /**
   * Fetch hierarchical intelligence data for Chart Proposal 3
   */
  async getHierarchicalIntelligence(level = 1, year = 2023) {
    try {
      const response = await fetch(`${API_BASE_URL}/emissions/hierarchical-intelligence?level=${level}&year=${year}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching hierarchical intelligence data:', error);
      return { hierarchical_intelligence: {} };
    }
  }

  /**
   * Check API health status
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking API health:', error);
      return { status: 'unhealthy', error: error.message };
    }
  }

  /**
   * Fallback data structure when API is unavailable
   */
  getFallbackData() {
    return {
      companies: ['ML - Brasil'],
      years: ['2023'],
      scope1: {
        'ML - Brasil': {
          '2023': 0
        }
      },
      scope2: {
        'ML - Brasil': {
          '2023': 0
        }
      },
      scope3: {
        'ML - Brasil': {
          '2023': 0
        }
      }
    };
  }

  /**
   * Fallback stats when API is unavailable
   */
  getFallbackStats() {
    return {
      total_emissions: 0,
      average_emissions: 0,
      max_emissions: 0,
      unique_parameters: 0,
      total_records: 0,
      year_range: 'N/A'
    };
  }
}

export default new ApiService(); 