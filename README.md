# Matiq Frontend - NCAA Wrestling Data Hub

A comprehensive React application for exploring NCAA D1 Wrestling Championship data, featuring wrestler profiles, school programs, and tournament information.

## Features

- **Search Functionality** - Search wrestlers, schools, coaches, and tournaments
- **Wrestler Profiles** - Detailed athlete information with statistics and match history  
- **School Programs** - Wrestling program information and team data
- **Tournament Brackets** - Championship brackets and results
- **Responsive Design** - Mobile-first design with dark mode support

## Tech Stack

- **Frontend Framework:** React 18 with Vite
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS with custom design system
- **API Client:** Custom fetch-based service with mock data fallback
- **Development:** ESLint, PostCSS, Autoprefixer

## Project Structure

The project follows a feature-based architecture for better maintainability and scalability:

```
src/
├── components/           # Shared/global components
│   ├── common/          # Common components (Layout, LoadingSpinner, etc.)
│   ├── ui/              # UI component library (Button, Card, etc.)
│   └── ...              # Route-level components (HomePage, ProfilePage)
├── features/            # Feature-based modules
│   ├── person/          # Person/wrestler related functionality
│   │   ├── components/  # Person-specific components
│   │   ├── hooks/       # Person-specific hooks
│   │   ├── services/    # Person-specific services
│   │   ├── types/       # Type definitions
│   │   └── index.js     # Barrel export
│   ├── search/          # Search functionality
│   │   ├── components/  # Search components (SearchBar, SearchResults, etc.)
│   │   ├── hooks/       # Search hooks (useSearch)
│   │   └── index.js     # Barrel export
│   └── items/           # Items feature
├── hooks/               # Global hooks
├── services/            # Global services (API client)
├── utils/               # Utility functions
└── config.js            # Application configuration
```

### Barrel Exports

Each feature and shared module uses barrel exports (`index.js`) for clean imports:

```javascript
// Instead of:
import SearchBar from '../features/search/components/SearchBar.jsx';
import SearchResults from '../features/search/components/SearchResults.jsx';

// Use:
import { SearchBar, SearchResults } from '../features/search';
```

## API Architecture

The application uses a custom API service layer with React hooks for data fetching:

- **API Service:** `/src/services/api.js` - Primary API client with error handling and mock data fallback
- **Custom Hooks:** Feature-specific hooks for clean component integration
- **Mock Data:** Comprehensive mock data service for development and testing

### Recent API Audit (December 2024)

A comprehensive API usage audit was completed as part of issue #11. Key documents:

- **[API Audit Executive Summary](./API_AUDIT_EXECUTIVE_SUMMARY.md)** - High-level findings and recommendations
- **[API Usage Audit Report](./API_USAGE_AUDIT_REPORT.md)** - Detailed technical analysis  
- **[API Usage Inventory](./API_USAGE_INVENTORY.md)** - Complete code inventory
- **[API Consolidation Roadmap](./API_CONSOLIDATION_ROADMAP.md)** - Implementation guide

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/grogs84/matiq-frontend.git
cd matiq-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://matiq-backend-production.up.railway.app
```

## Project Structure

```
src/
├── components/          # Shared UI components
│   ├── HomePage.jsx     # Main landing page with search
│   ├── ProfilePage.jsx  # Generic profile page
│   ├── SearchResults.jsx # Search results display
│   └── common/          # Reusable UI components
├── features/            # Feature-specific modules
│   └── person/          # Person/wrestler features
│       ├── PersonProfile.jsx
│       ├── components/  # Person-specific components
│       ├── hooks/       # Custom API hooks
│       └── services/    # Mock data services
├── services/            # Global services
│   └── api.js          # Main API service
├── hooks/              # Global custom hooks (planned)
├── utils/              # Utility functions
└── config.js           # Application configuration
```

## Component Architecture

### API Integration Patterns

1. **Custom Hooks Pattern** (Recommended)
   ```javascript
   const { data, loading, error } = usePersonProfile(slug);
   ```

2. **Direct Service Usage** (Legacy)
   ```javascript
   const data = await apiService.get('/api/endpoint');
   ```

### Current API Usage

- **HomePage:** Search functionality and health checks
- **ProfilePage:** Dynamic profile loading for different entity types  
- **Person Features:** Wrestler profiles, statistics, and match history via custom hooks

## Contributing

1. Follow the existing code patterns and API architecture
2. Use custom hooks for new API integrations
3. Maintain responsive design principles
4. Add proper error handling and loading states
5. Include JSDoc comments for new functions

## Development Notes

### API Service Features

- **Error Handling:** Automatic fallback to mock data on API failures
- **Mock Data:** Comprehensive mock data for offline development
- **Health Checks:** Built-in API health monitoring
- **Search:** Integrated search functionality with look-ahead

### Planned Improvements

- Migrate remaining components to custom hooks pattern
- Add TypeScript support
- Implement request caching
- Add comprehensive testing

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
