"""
Data service for processing ESG emissions data from TestData.xlsx
"""
import pandas as pd
import numpy as np
from typing import Dict, List, Any
import os

class EmissionsDataService:
    def __init__(self):
        # Try multiple paths for different environments
        possible_paths = [
            "../data/TestData.xlsx",  # Local development
            "./data/TestData.xlsx",   # Railway deployment
            "data/TestData.xlsx"      # Alternative
        ]
        
        self.data_file_path = None
        for path in possible_paths:
            if os.path.exists(path):
                self.data_file_path = path
                break
        
        if not self.data_file_path:
            print("Warning: TestData.xlsx not found in any expected location")
            self.data_file_path = "../data/TestData.xlsx"  # Fallback
        
        self._load_data()
    
    def _load_data(self):
        """Load and preprocess the emissions data"""
        try:
            # Load the Excel file
            self.df = pd.read_excel(self.data_file_path)
            
            # Clean and prepare the data
            self._clean_data()
            
        except Exception as e:
            print(f"Error loading data: {e}")
            self.df = pd.DataFrame()
    
    def _clean_data(self):
        """Clean and prepare the data for analysis"""
        # Remove rows with zero emissions (keeping only meaningful data)
        self.df = self.df[self.df['Emissões (tCO2e)'] > 0].copy()
        
        # Create a simplified parameter category for grouping
        self.df['parameter_category'] = self.df['Parâmetro'].apply(self._categorize_parameter)
        
        # Ensure year is properly formatted
        self.df['Ano'] = self.df['Ano'].astype(int)
    
    def _categorize_parameter(self, parameter: str) -> str:
        """Categorize parameters into emission scopes"""
        parameter_lower = parameter.lower()
        
        # Scope 1: Direct emissions
        if any(keyword in parameter_lower for keyword in [
            'diesel', 'gasolina', 'etanol', 'combustível', 'gerador', 'frota'
        ]):
            return 'scope1'
        
        # Scope 2: Energy-related emissions
        elif any(keyword in parameter_lower for keyword in [
            'energia', 'eletricidade', 'ar-condicionado', 'refrigeração'
        ]):
            return 'scope2'
        
        # Scope 3: Value chain emissions
        else:
            return 'scope3'
    
    def _categorize_transportation(self, parameter: str) -> bool:
        """Check if parameter is transportation-related"""
        transport_keywords = [
            'veículos', 'ônibus', 'frota', 'expedição', 
            'diesel', 'gasolina', 'etanol', 'combustível',
            'transporte', 'logística', 'entrega'
        ]
        return any(keyword in parameter.lower() for keyword in transport_keywords)
    
    def get_emissions_by_scope(self) -> Dict[str, Any]:
        """Get emissions data organized by scope for the dashboard"""
        if self.df.empty:
            return self._get_empty_data()
        
        # Group by scope and calculate totals
        scope_data = self.df.groupby('parameter_category')['Emissões (tCO2e)'].sum()
        
        # Create the data structure expected by the frontend
        companies = ['ML - Brasil']  # Single company in this dataset
        
        return {
            'companies': companies,
            'years': [str(year) for year in sorted(self.df['Ano'].unique())],
            'scope1': {
                'ML - Brasil': {
                    '2023': float(scope_data.get('scope1', 0))
                }
            },
            'scope2': {
                'ML - Brasil': {
                    '2023': float(scope_data.get('scope2', 0))
                }
            },
            'scope3': {
                'ML - Brasil': {
                    '2023': float(scope_data.get('scope3', 0))
                }
            }
        }
    
    def get_emissions_by_parameter(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Get top emissions by parameter type"""
        if self.df.empty:
            return []
        
        # Group by parameter and sum emissions
        param_emissions = self.df.groupby('Parâmetro')['Emissões (tCO2e)'].sum().sort_values(ascending=False)
        
        # Get top parameters
        top_params = param_emissions.head(limit)
        
        return [
            {
                'parameter': param,
                'emissions': float(emissions),
                'category': self._categorize_parameter(param)
            }
            for param, emissions in top_params.items()
        ]
    
    def get_emissions_by_hierarchy(self) -> Dict[str, float]:
        """Get emissions by hierarchy level"""
        if self.df.empty:
            return {}
        
        # Group by hierarchy level 1 and sum emissions
        hierarchy_emissions = self.df.groupby('Hierarquia nível 1')['Emissões (tCO2e)'].sum()
        
        return {level: float(emissions) for level, emissions in hierarchy_emissions.items()}
    
    def get_summary_stats(self) -> Dict[str, Any]:
        """Get summary statistics for the dashboard"""
        if self.df.empty:
            return self._get_empty_stats()
        
        total_emissions = self.df['Emissões (tCO2e)'].sum()
        avg_emissions = self.df['Emissões (tCO2e)'].mean()
        max_emissions = self.df['Emissões (tCO2e)'].max()
        unique_parameters = self.df['Parâmetro'].nunique()
        
        return {
            'total_emissions': float(total_emissions),
            'average_emissions': float(avg_emissions),
            'max_emissions': float(max_emissions),
            'unique_parameters': int(unique_parameters),
            'total_records': int(len(self.df)),
            'year_range': f"{self.df['Ano'].min()} - {self.df['Ano'].max()}"
        }
    
    # New methods for chart proposals
    def get_top_emission_parameters(self, limit: int = 15) -> List[Dict[str, Any]]:
        """Get top emission sources by parameter type for Chart 1"""
        if self.df.empty:
            return []
        
        # Group by parameter and sum emissions
        param_emissions = self.df.groupby('Parâmetro')['Emissões (tCO2e)'].sum().sort_values(ascending=False)
        
        # Get top parameters
        top_params = param_emissions.head(limit)
        
        return [
            {
                'name': param,
                'emissions': float(emissions),
                'scope': self._categorize_parameter(param),
                'count': int(self.df[self.df['Parâmetro'] == param].shape[0])
            }
            for param, emissions in top_params.items()
        ]
    
    def get_hierarchy_treemap_data(self, level: int = 3) -> Dict[str, Any]:
        """Get hierarchy data for treemap visualization for Chart 2"""
        if self.df.empty:
            return {"hierarchy": {}}
        
        # Get hierarchy columns
        hierarchy_cols = [col for col in self.df.columns if 'Hierarquia nível' in col]
        hierarchy_cols = hierarchy_cols[:level]  # Limit to specified level
        
        if not hierarchy_cols:
            return {"hierarchy": {}}
        
        # Build hierarchical structure
        hierarchy_data = {}
        
        # Start with the highest level
        for _, row in self.df.iterrows():
            current_level = hierarchy_data
            
            # Navigate through hierarchy levels
            for i, col in enumerate(hierarchy_cols):
                level_name = row[col] if pd.notna(row[col]) else f"Level_{i+1}"
                
                if level_name not in current_level:
                    current_level[level_name] = {
                        'emissions': 0.0,
                        'children': {}
                    }
                
                current_level[level_name]['emissions'] += float(row['Emissões (tCO2e)'])
                
                if i < len(hierarchy_cols) - 1:  # Not the last level
                    current_level = current_level[level_name]['children']
        
        return {"hierarchy": hierarchy_data}
    
    def get_transportation_emissions(self) -> Dict[str, Any]:
        """Get transportation emissions breakdown for Chart 3"""
        if self.df.empty:
            return {"transportation": {}}
        
        # Filter transportation-related parameters
        transport_mask = self.df['Parâmetro'].apply(self._categorize_transportation)
        transport_df = self.df[transport_mask].copy()
        
        if transport_df.empty:
            return {"transportation": {}}
        
        # Analyze fuel types
        fuel_types = {}
        for _, row in transport_df.iterrows():
            param_lower = row['Parâmetro'].lower()
            
            # Categorize by fuel type
            if 'gasolina' in param_lower:
                fuel_type = 'gasolina'
            elif 'diesel' in param_lower:
                fuel_type = 'diesel'
            elif 'etanol' in param_lower:
                fuel_type = 'etanol'
            else:
                fuel_type = 'outros'
            
            if fuel_type not in fuel_types:
                fuel_types[fuel_type] = {
                    'emissions': 0.0,
                    'distance': 0.0,
                    'efficiency': 0.0
                }
            
            fuel_types[fuel_type]['emissions'] += float(row['Emissões (tCO2e)'])
        
        # Calculate efficiency (emissions per unit distance if available)
        for fuel_type in fuel_types:
            if fuel_types[fuel_type]['distance'] > 0:
                fuel_types[fuel_type]['efficiency'] = (
                    fuel_types[fuel_type]['emissions'] / fuel_types[fuel_type]['distance']
                )
        
        # Categorize by vehicle/operation type
        categories = {
            'light_vehicles': 0.0,
            'fleet_operations': 0.0,
            'employee_commuting': 0.0,
            'product_shipping': 0.0
        }
        
        for _, row in transport_df.iterrows():
            param_lower = row['Parâmetro'].lower()
            emissions = float(row['Emissões (tCO2e)'])
            
            if 'veículos leves' in param_lower:
                categories['light_vehicles'] += emissions
            elif 'frota' in param_lower:
                categories['fleet_operations'] += emissions
            elif 'funcionários' in param_lower or 'colaboradores' in param_lower:
                categories['employee_commuting'] += emissions
            elif 'expedição' in param_lower or 'entrega' in param_lower:
                categories['product_shipping'] += emissions
        
        return {
            "transportation": {
                "fuel_types": fuel_types,
                "categories": categories
            }
        }

    def get_emissions_by_scope_category(self, year: int = 2023) -> Dict[str, Any]:
        """Get emissions data organized by scope and category for Chart 1"""
        if self.df.empty:
            return {"emissions_by_scope_category": {}}
        
        # Filter by year
        year_df = self.df[self.df['Ano'] == year].copy()
        
        if year_df.empty:
            return {"emissions_by_scope_category": {}}
        
        # Group by scope, category, and competency period
        grouped = year_df.groupby(['Escopo', 'Categoria', 'Competência'])['Emissões (tCO2e)'].sum().reset_index()
        
        # Structure data for the chart
        result = {}
        
        for _, row in grouped.iterrows():
            scope = row['Escopo']
            category = row['Categoria']
            month = row['Competência']
            emissions = float(row['Emissões (tCO2e)'])
            
            if scope not in result:
                result[scope] = {}
            
            if category not in result[scope]:
                result[scope][category] = []
            
            # Add target (placeholder - could be loaded from configuration)
            target = emissions * 0.9  # 10% reduction target
            
            result[scope][category].append({
                "month": month,
                "emissions": emissions,
                "target": target
            })
        
        return {"emissions_by_scope_category": result}

    def get_gas_emissions_breakdown(self, year: int = 2023) -> Dict[str, Any]:
        """Get gas emissions breakdown with conversion factors for Chart 2"""
        if self.df.empty:
            return {"gas_emissions_breakdown": {}}
        
        # Filter by year
        year_df = self.df[self.df['Ano'] == year].copy()
        
        if year_df.empty:
            return {"gas_emissions_breakdown": {}}
        
        # Group by gas family and individual gas
        gas_family_data = year_df.groupby('Família de gás')['Emissões (tCO2e)'].sum()
        individual_gas_data = year_df.groupby(['Gás', 'Família de gás']).agg({
            'Emissões (tGEE)': 'sum',
            'Emissões (tCO2e)': 'sum',
            'Fator de conversão': 'mean',
            'Fator de emissão': 'mean'
        }).reset_index()
        
        # Calculate percentages for gas families
        total_emissions = gas_family_data.sum()
        gas_families = {}
        for gas_family, emissions in gas_family_data.items():
            gas_families[gas_family] = {
                "total_emissions": float(emissions),
                "percentage": float((emissions / total_emissions) * 100) if total_emissions > 0 else 0
            }
        
        # Process individual gases
        individual_gases = {}
        for _, row in individual_gas_data.iterrows():
            gas_name = row['Gás']
            individual_gases[gas_name] = {
                "emissions": float(row['Emissões (tCO2e)']),
                "conversion_factor": float(row['Fator de conversão']),
                "emission_factor": float(row['Fator de emissão']),
                "trend": "stable"  # Placeholder - could calculate from historical data
            }
        
        return {
            "gas_emissions_breakdown": {
                "gas_families": gas_families,
                "individual_gases": individual_gases
            }
        }

    def get_hierarchical_emissions_heatmap(self, year: int = 2023) -> Dict[str, Any]:
        """Get hierarchical emissions data for heatmap visualization for Chart 3"""
        if self.df.empty:
            return {"hierarchical_emissions": {}}
        
        # Filter by year
        year_df = self.df[self.df['Ano'] == year].copy()
        
        if year_df.empty:
            return {"hierarchical_emissions": {}}
        
        # Get hierarchy columns
        hierarchy_cols = [col for col in year_df.columns if 'Hierarquia nível' in col]
        
        # Group by level 2 (business areas) and operational units
        level2_data = year_df.groupby(['Hierarquia nível 2', 'Unidade operacional']).agg({
            'Emissões (tCO2e)': 'sum',
            'Emissões de controle operacional (tCO2e)': 'sum',
            'Emissões de participação acionária (tCO2e)': 'sum'
        }).reset_index()
        
        # Structure data for the heatmap
        level2_breakdown = {}
        
        for _, row in level2_data.iterrows():
            business_area = row['Hierarquia nível 2']
            operational_unit = row['Unidade operacional']
            
            # Handle NaN and infinite values
            total_emissions = float(row['Emissões (tCO2e)'])
            if pd.isna(total_emissions) or np.isinf(total_emissions):
                total_emissions = 0.0
                
            operational_control = float(row['Emissões de controle operacional (tCO2e)'])
            if pd.isna(operational_control) or np.isinf(operational_control):
                operational_control = 0.0
                
            equity_share = float(row['Emissões de participação acionária (tCO2e)'])
            if pd.isna(equity_share) or np.isinf(equity_share):
                equity_share = 0.0
            
            if business_area not in level2_breakdown:
                level2_breakdown[business_area] = {
                    "total_emissions": 0.0,
                    "operational_units": {}
                }
            
            level2_breakdown[business_area]["total_emissions"] += total_emissions
            level2_breakdown[business_area]["operational_units"][operational_unit] = {
                "emissions": total_emissions,
                "scope_1": operational_control,
                "scope_2": equity_share
            }
        
        # Get drill-down data for one operational unit as example
        drill_down_data = {}
        if not year_df.empty:
            sample_unit = year_df['Unidade operacional'].iloc[0]
            unit_data = year_df[year_df['Unidade operacional'] == sample_unit].iloc[0]
            
            drill_down_data[sample_unit] = {
                "level_3": str(unit_data.get('Hierarquia nível 3', '')),
                "level_4": str(unit_data.get('Hierarquia nível 4', '')),
                "level_5": str(unit_data.get('Hierarquia nível 5', '')),
                "level_6": str(unit_data.get('Hierarquia nível 6', '')),
                "level_7": str(unit_data.get('Hierarquia nível 7', ''))
            }
        
        return {
            "hierarchical_emissions": {
                "level_2_breakdown": level2_breakdown,
                "drill_down_data": drill_down_data
            }
        }
    
    def get_operational_performance(self, year: int = 2023, limit: int = 15) -> Dict[str, Any]:
        """Analyze emissions performance across operational units for Chart Proposal 1"""
        if self.df.empty:
            return {"operational_performance": {}}
        
        # Filter by year
        year_df = self.df[self.df['Ano'] == year].copy()
        
        if year_df.empty:
            return {"operational_performance": {}}
        
        # Group by operational unit and business area
        operational_data = year_df.groupby(['Unidade operacional', 'Hierarquia nível 2']).agg({
            'Emissões (tCO2e)': 'sum',
            'Emissões (tGEE)': 'sum',
            'Valor': 'sum'  # Activity metric
        }).reset_index()
        
        # Calculate efficiency metrics (emissions per unit of activity)
        # Only calculate efficiency for units with meaningful activity values
        operational_data['efficiency_score'] = operational_data.apply(
            lambda row: row['Emissões (tCO2e)'] / row['Valor'] if row['Valor'] > 0 else None, 
            axis=1
        )
        
        # Get top units by emissions
        top_units = operational_data.nlargest(limit, 'Emissões (tCO2e)')
        
        # Calculate scope breakdown for each unit
        scope_breakdown = {}
        category_breakdown = {}
        for unit in top_units['Unidade operacional'].unique():
            unit_data = year_df[year_df['Unidade operacional'] == unit]
            
            # Scope breakdown
            scope_breakdown[unit] = {
                'scope1': float(unit_data[unit_data['parameter_category'] == 'scope1']['Emissões (tCO2e)'].sum()),
                'scope2': float(unit_data[unit_data['parameter_category'] == 'scope2']['Emissões (tCO2e)'].sum()),
                'scope3': float(unit_data[unit_data['parameter_category'] == 'scope3']['Emissões (tCO2e)'].sum())
            }
            
            # Category breakdown
            category_breakdown[unit] = unit_data.groupby('Categoria')['Emissões (tCO2e)'].sum().to_dict()
        
        # Generate monthly trend data for top units
        trend_data = {}
        for unit in top_units['Unidade operacional'].unique():
            unit_data = year_df[year_df['Unidade operacional'] == unit]
            monthly_trend = unit_data.groupby('Competência')['Emissões (tCO2e)'].sum().reset_index()
            trend_data[unit] = [
                {
                    'month': str(row['Competência']),
                    'emissions': float(row['Emissões (tCO2e)']),
                    'efficiency': float(row['Emissões (tCO2e)'] / unit_data[unit_data['Competência'] == row['Competência']]['Valor'].sum() if unit_data[unit_data['Competência'] == row['Competência']]['Valor'].sum() > 0 else 0)
                }
                for _, row in monthly_trend.iterrows()
            ]
        
        # Calculate efficiency metrics
        efficiency_metrics = []
        for _, row in top_units.iterrows():
            unit = row['Unidade operacional']
            efficiency_score = row['efficiency_score']
            
            if efficiency_score is not None and not pd.isna(efficiency_score):
                # Scale the efficiency score to be more meaningful (multiply by 1000)
                metric = round(efficiency_score * 1000, 2)
                target = round(metric * 0.9, 2)  # 10% improvement target
            else:
                # For units without activity data, use emissions-based ranking
                metric = round(row['Emissões (tCO2e)'] / 1000, 2)  # Normalize by 1000
                target = round(metric * 0.9, 2)
            
            efficiency_metrics.append({
                'unit': unit,
                'metric': metric,
                'target': target
            })
        
        # Generate alerts for units with high emissions
        alerts = []
        for _, row in top_units.head(5).iterrows():
            unit = row['Unidade operacional']
            if row['Emissões (tCO2e)'] > 10000:  # High emissions threshold
                alerts.append({
                    'unit': unit,
                    'issue': 'High emissions increase',
                    'severity': 'high',
                    'recommendation': 'Review operational processes and implement efficiency measures'
                })
        
        return {
            "operational_performance": {
                "top_units": [
                    {
                        "unit": row['Unidade operacional'],
                        "total_emissions": float(row['Emissões (tCO2e)']),
                        "scope_breakdown": scope_breakdown.get(row['Unidade operacional'], {}),
                        "category_breakdown": category_breakdown.get(row['Unidade operacional'], {}),
                        "efficiency_score": round(row['efficiency_score'] * 1000, 2) if row['efficiency_score'] is not None and not pd.isna(row['efficiency_score']) else round(row['Emissões (tCO2e)'] / 1000, 2),
                        "trend": "decreasing" if row['efficiency_score'] < 2.0 else "stable",
                        "target_achievement": round((1 - row['efficiency_score'] / 3.0) * 100, 1),
                        "business_area": row['Hierarquia nível 2']
                    }
                    for _, row in top_units.iterrows()
                ],
                "efficiency_metrics": efficiency_metrics,
                "trend_data": trend_data,
                "alerts": alerts
            }
        }
    
    def get_process_technology_analysis(self, technology: str = None, scope: str = None) -> Dict[str, Any]:
        """Analyze process and technology emissions for Chart Proposal 2"""
        if self.df.empty:
            return {"process_analysis": {}}
        
        # Filter by technology and scope if specified
        filtered_df = self.df.copy()
        if technology:
            filtered_df = filtered_df[filtered_df['Tecnologia'] == technology]
        if scope:
            filtered_df = filtered_df[filtered_df['parameter_category'] == scope]
        
        if filtered_df.empty:
            return {"process_analysis": {}}
        
        # Group by technology and category
        process_data = filtered_df.groupby(['Tecnologia', 'Categoria']).agg({
            'Fator de conversão': 'mean',
            'Fator de emissão': 'mean',
            'Emissões (tCO2e)': 'sum'
        }).reset_index()
        
        # Create nodes for Sankey diagram
        nodes = []
        links = []
        
        # Add process nodes
        for _, row in process_data.iterrows():
            technology_name = row['Tecnologia']
            category_name = row['Categoria']
            emissions = float(row['Emissões (tCO2e)'])
            
            # Add technology node
            if not any(node['id'] == technology_name for node in nodes):
                nodes.append({
                    'id': technology_name,
                    'name': technology_name,
                    'emissions': emissions
                })
            
            # Add category node
            if not any(node['id'] == category_name for node in nodes):
                nodes.append({
                    'id': category_name,
                    'name': category_name,
                    'emissions': emissions
                })
            
            # Add link
            links.append({
                'source': technology_name,
                'target': category_name,
                'value': emissions
            })
        
        # Calculate technology efficiency
        technology_efficiency = {}
        for _, row in process_data.iterrows():
            tech = row['Tecnologia']
            if tech not in technology_efficiency:
                technology_efficiency[tech] = {
                    'current_technology': tech,
                    'emission_factor': float(row['Fator de emissão']),
                    'conversion_factor': float(row['Fator de conversão']),
                    'total_emissions': float(row['Emissões (tCO2e)']),
                    'alternative': 'CO2 systems' if 'refrigeração' in tech.lower() else 'Electric systems',
                    'potential_savings': 60 if 'refrigeração' in tech.lower() else 80
                }
        
        return {
            "process_analysis": {
                "emissions_flow": {
                    "nodes": nodes,
                    "links": links
                },
                "technology_efficiency": technology_efficiency
            }
        }
    
    def get_hierarchical_intelligence(self, level: int = 1, year: int = 2023) -> Dict[str, Any]:
        """Build comprehensive hierarchical analysis with benchmarks for Chart Proposal 3"""
        if self.df.empty:
            return {"hierarchical_intelligence": {}}
        
        # Filter by year
        year_df = self.df[self.df['Ano'] == year].copy()
        
        if year_df.empty:
            return {"hierarchical_intelligence": {}}
        
        # Get hierarchy columns
        hierarchy_cols = [col for col in year_df.columns if 'Hierarquia nível' in col]
        
        # Group by specified hierarchy level
        if level <= len(hierarchy_cols):
            level_col = hierarchy_cols[level - 1]
            hierarchical_data = year_df.groupby([level_col, 'Escopo']).agg({
                'Emissões (tCO2e)': 'sum',
                'Unidade operacional': 'nunique'
            }).reset_index()
            
            # Build tree structure
            tree_structure = {}
            for _, row in hierarchical_data.iterrows():
                level_name = row[level_col]
                scope = row['Escopo']
                emissions = float(row['Emissões (tCO2e)'])
                units = int(row['Unidade operacional'])
                
                if level_name not in tree_structure:
                    tree_structure[level_name] = {
                        'emissions': 0.0,
                        'scope_breakdown': {},
                        'units': 0,
                        'trend': 'stable',
                        'efficiency_score': 0.8
                    }
                
                tree_structure[level_name]['emissions'] += emissions
                tree_structure[level_name]['scope_breakdown'][scope] = emissions
                tree_structure[level_name]['units'] = max(tree_structure[level_name]['units'], units)
            
            # Calculate benchmarks
            all_emissions = [data['emissions'] for data in tree_structure.values()]
            avg_emissions = sum(all_emissions) / len(all_emissions) if all_emissions else 0
            
            # Generate recommendations
            recommendations = []
            for level_name, data in tree_structure.items():
                if data['emissions'] > avg_emissions * 1.5:  # 50% above average
                    recommendations.append({
                        'unit': level_name,
                        'issue': f'Highest emissions in {level_name}',
                        'action': 'Implement efficiency measures and process optimization',
                        'potential_savings': 15
                    })
                elif data['emissions'] > avg_emissions:
                    recommendations.append({
                        'unit': level_name,
                        'issue': f'Above average emissions in {level_name}',
                        'action': 'Review operational processes',
                        'potential_savings': 8
                    })
            
            return {
                "hierarchical_intelligence": {
                    "tree_structure": tree_structure,
                    "benchmarks": {
                        "average_emissions": avg_emissions,
                        "max_emissions": max(all_emissions) if all_emissions else 0,
                        "min_emissions": min(all_emissions) if all_emissions else 0
                    },
                    "recommendations": recommendations
                }
            }
        else:
            return {"hierarchical_intelligence": {"error": "Invalid hierarchy level"}}
    
    def _get_empty_data(self) -> Dict[str, Any]:
        """Return empty data structure when no data is available"""
        return {
            'companies': [],
            'years': [],
            'scope1': {},
            'scope2': {},
            'scope3': {}
        }
    
    def _get_empty_stats(self) -> Dict[str, Any]:
        """Return empty stats when no data is available"""
        return {
            'total_emissions': 0.0,
            'average_emissions': 0.0,
            'max_emissions': 0.0,
            'unique_parameters': 0,
            'total_records': 0,
            'year_range': 'N/A'
        }

# Global instance
emissions_service = EmissionsDataService() 