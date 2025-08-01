# Tech Stack Configuration

## 🎯 Final Tech Stack Decision

This document reflects the **chosen tech stack** for the ESG Dashboard project. All future development should follow this stack.

### Backend Stack
```
Framework: FastAPI
Language: Python 3.8+
Data Processing: Pandas
Database ORM: SQLAlchemy
Data Validation: Pydantic
Database: SQLite (dev) / PostgreSQL (prod)
```

### Frontend Stack
```
Framework: React 18+
Charts: Chart.js 4.x
Styling: Bootstrap 5.x
Routing: React Router 6.x
HTTP Client: Axios
```

### Development Tools
```
Package Manager (Backend): pip
Package Manager (Frontend): npm
API Documentation: FastAPI auto-docs
Development Server: uvicorn
```

## 🏗️ Architecture Rationale

### Why Chart.js over Plotly/Streamlit?
- **Best Power BI-style interactivity** - Cross-filtering, drill-downs, selections
- **Professional dashboard performance** - Faster rendering, smoother interactions
- **Maximum customization** - Not limited by framework constraints
- **Industry standard** - Most enterprise dashboards use this approach

### Why React over Streamlit?
- **Professional UI/UX** - Consulting firms expect polished interfaces
- **Scalable architecture** - Can handle complex state management
- **Component reusability** - Modular design for maintainability
- **Custom interactions** - Full control over user experience

### Why FastAPI over Flask/Django?
- **Modern and fast** - Better performance for data-heavy applications
- **Automatic API docs** - Built-in Swagger documentation
- **Type safety** - Pydantic models ensure data consistency
- **Async support** - Better handling of concurrent requests

## 📋 Development Guidelines

### File Naming Conventions
- **Python**: snake_case (`data_controller.py`, `esg_model.py`)
- **JavaScript**: camelCase (`chartComponent.js`, `dataService.js`)
- **CSS**: kebab-case (`dashboard-styles.css`)
- **Components**: PascalCase (`ChartComponent.jsx`)

### Code Organization
- **Backend**: Follow FastAPI best practices with clear separation of concerns
- **Frontend**: Component-based architecture with reusable chart components
- **Data**: Structured ESG data models with Pydantic validation

### Chart Implementation
- Use Chart.js for all visualizations
- Implement Power BI-style cross-filtering
- Support multiple chart types (bar, line, pie, scatter)
- Ensure responsive design for all screen sizes

## 🚀 Getting Started

1. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Access Points**:
   - Backend API: http://localhost:8000
   - Frontend App: http://localhost:3000
   - API Docs: http://localhost:8000/docs

## 📝 Notes for Future Agents

- **Stick to this stack** - No framework changes without strong justification
- **Focus on Chart.js interactivity** - This is the core value proposition
- **Maintain professional UI** - Consulting clients expect polished interfaces
- **Follow modular design** - Keep components and services well-organized
- **Use type hints** - Python type hints and TypeScript where possible 