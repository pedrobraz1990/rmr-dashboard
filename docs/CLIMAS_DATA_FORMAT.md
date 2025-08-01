# Climas Data Format Documentation

## Overview

The Climas data format is a comprehensive greenhouse gas emissions tracking system used for environmental reporting and sustainability management. This document describes the structure and content of the data format based on analysis of the `TestData.xlsx` file.

## Data Structure

### File Information
- **File**: `TestData.xlsx`
- **Total Records**: 23,480 rows
- **Total Columns**: 31 columns
- **Data Period**: 2023 (monthly granularity)
- **Country**: Brazil (Brasil)

### Column Structure

The dataset contains 31 columns organized into the following categories:

#### 1. Identification Fields
| Column | Description | Data Type | Example |
|--------|-------------|-----------|---------|
| `ID do parâmetro` | Unique parameter identifier | Integer | 157122 |
| `PAG` | Process/Activity Group identifier | Integer | 1760 |

#### 2. Hierarchical Organization Fields
| Column | Description | Levels | Example |
|--------|-------------|--------|---------|
| `Hierarquia nível 1` | Top-level hierarchy | 1 level | ML |
| `Hierarquia nível 2` | Second-level hierarchy | 7 levels | Escritório de Negócios |
| `Hierarquia nível 3` | Third-level hierarchy | 53 levels | aiqfome |
| `Hierarquia nível 4` | Fourth-level hierarchy | 16 levels | Sistemas de refrigeração |
| `Hierarquia nível 5` | Fifth-level hierarchy | 40 levels | Ar-condicionado |
| `Hierarquia nível 6` | Sixth-level hierarchy | 9 levels | Malha Luiza |
| `Hierarquia nível 7` | Seventh-level hierarchy | 2 levels | Bases próprias |

#### 3. Operational Fields
| Column | Description | Data Type | Example |
|--------|-------------|-----------|---------|
| `Unidade operacional` | Operational unit | String | aiqfome |
| `País` | Country | String | Brasil |
| `Parâmetro` | Parameter description | String | Recarga de R-22 em ar-condicionado |
| `Unidade de medida` | Measurement unit | String | kg |
| `Tecnologia` | Technology/process type | String | Emissões fugitivas |
| `Precursor` | Chemical precursor | String | HCFC-22 |
| `Escopo` | Emission scope | String | Escopo 1 |
| `Categoria` | Emission category | String | Fugitivas |
| `Competência` | Competency period | String | 2023-01 |
| `Ano` | Year | Integer | 2023 |

#### 4. Gas Classification Fields
| Column | Description | Values |
|--------|-------------|--------|
| `Superfamília de gás` | Gas superfamily | Não-Kyoto |
| `Família de gás` | Gas family | Não-Kyoto, HFC, CO2, CH4, CO2 renovável, N2O |
| `Gás` | Specific gas | HCFC-22, HFC-125, HFC-32, CO2, CH4, CO2 renovável, N2O, etc. |

#### 5. Measurement and Conversion Fields
| Column | Description | Data Type | Purpose |
|--------|-------------|-----------|---------|
| `Valor` | Raw measurement value | Float | Primary data input |
| `Fator de conversão` | Conversion factor | Float | Unit conversion |
| `Fator de emissão` | Emission factor | Float | GHG calculation |

#### 6. Emissions Calculation Fields
| Column | Description | Unit | Notes |
|--------|-------------|------|-------|
| `Emissões (tGEE)` | Total emissions | tGEE | Greenhouse Gas Equivalent |
| `Emissões (tCO2e)` | Total emissions | tCO2e | Carbon Dioxide Equivalent |
| `Emissões de controle operacional (tGEE)` | Operational control emissions | tGEE | Currently all zero |
| `Emissões de participação acionária (tGEE)` | Equity share emissions | tGEE | Currently all zero |
| `Emissões de controle operacional (tCO2e)` | Operational control emissions | tCO2e | Currently all zero |
| `Emissões de participação acionária (tCO2e)` | Equity share emissions | tCO2e | Currently all zero |

## Data Categories

### Emission Scopes
The data covers three emission scopes as defined by the Greenhouse Gas Protocol:
- **Escopo 1**: Direct emissions from owned or controlled sources
- **Escopo 2**: Indirect emissions from purchased energy
- **Escopo 3**: Indirect emissions from the value chain

### Emission Categories
1. **Fugitivas**: Fugitive emissions
2. **Aquisição de energia elétrica**: Electricity procurement
3. **Resíduos gerados nas operações**: Waste generated in operations
4. **Transporte e distribuição (downstream)**: Downstream transport and distribution
5. **Combustão estacionária**: Stationary combustion
6. **Bens e Serviços comprados**: Purchased goods and services
7. **Combustão móvel**: Mobile combustion
8. **Viagens a negócios**: Business travel
9. **Transporte e distribuição (upstream)**: Upstream transport and distribution
10. **Deslocamento de funcionários (casa-trabalho)**: Employee commuting

### Gas Types
The system tracks multiple greenhouse gases:
- **HCFC-22**: Hydrochlorofluorocarbon-22
- **HFC-125, HFC-32, HFC-134a, HFC-143a**: Various hydrofluorocarbons
- **CO2**: Carbon dioxide
- **CO2 renovável**: Renewable carbon dioxide
- **CH4**: Methane
- **N2O**: Nitrous oxide

### Measurement Units
- **kg**: Kilograms
- **kWh**: Kilowatt-hours
- **m³**: Cubic meters
- **km**: Kilometers
- **L**: Liters
- **R$**: Brazilian Reais
- **un**: Units
- **pax*km**: Passenger-kilometers
- **t**: Tons
- **t*km**: Ton-kilometers
- **user*day**: User-days

## Data Quality and Characteristics

### Temporal Coverage
- **Period**: 2023 (full year)
- **Granularity**: Monthly (2023-01 to 2023-12)
- **Total Records**: 23,480 observations

### Data Completeness
- **Unique Parameters**: 751 different parameter IDs
- **Unique Parameters (by name)**: 103 different parameter types
- **Technologies**: 32 different technology types
- **Operational Units**: Multiple operational units tracked

### Emissions Data
- **Non-zero emissions records**: 12,191 records (52% of total)
- **Emissions range**: 0.00 to 12,047.77 tGEE/tCO2e
- **Average emissions**: 15.48 tGEE, 17.47 tCO2e
- **Operational control and equity share emissions**: Currently all zero (likely for future implementation)

## Hierarchical Structure

The data uses a 7-level hierarchical structure for organizational classification:

1. **Level 1**: ML (company level)
2. **Level 2**: Business areas (7 categories)
   - Escritório de Negócios
   - Escritório Corporativo
   - Escritório de Serviços Financeiros
   - Logística
   - Varejo
   - Escritório de tecnologia
   - Centro de Distribuição
3. **Level 3**: Operational units (53 unique values)
4. **Level 4**: Systems/processes (16 unique values)
5. **Level 5**: Equipment/activities (40 unique values)
6. **Level 6**: Transportation/logistics (9 unique values)
7. **Level 7**: Base types (2 values: Bases próprias, Bases terceiras)

## Usage Guidelines

### Data Import
When importing Climas data:
1. Ensure all required fields are present
2. Validate data types (especially numeric fields)
3. Check for missing values in critical fields
4. Verify emission calculations

### Data Processing
- Use parameter IDs for unique identification
- Group by hierarchical levels for organizational analysis
- Filter by scope and category for specific emission types
- Apply conversion factors for unit standardization

### Reporting
- Aggregate emissions by scope, category, and gas type
- Use hierarchical structure for organizational reporting
- Include both tGEE and tCO2e values for comprehensive reporting
- Consider temporal trends using competency periods

## Technical Notes

### File Format
- **Format**: Microsoft Excel (.xlsx)
- **Encoding**: UTF-8 (supports Portuguese characters)
- **Size**: ~2.8 MB

### Data Types
- **Numeric**: Integer and Float for measurements and calculations
- **Text**: String for descriptions and categorical data
- **Date**: String format for competency periods (YYYY-MM)

### Validation Rules
- Parameter IDs should be unique within the dataset
- Emission values should be non-negative
- Conversion factors should be positive
- Hierarchical levels should follow logical progression

## Future Considerations

1. **Operational Control Emissions**: Currently zero, may be implemented in future versions
2. **Equity Share Emissions**: Currently zero, may be implemented in future versions
3. **Multi-year Data**: Current dataset covers only 2023, may expand to multiple years
4. **Additional Gases**: System may include additional greenhouse gases in future versions

---

*This documentation is based on analysis of the TestData.xlsx file and represents the current understanding of the Climas data format.* 