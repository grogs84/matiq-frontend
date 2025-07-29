# API Usage Inventory
**Complete inventory of all API calls across the Matiq Frontend codebase**

## API Client Definitions

### 1. apiService (ACTIVE)
- **File:** `/src/services/api.js`
- **Type:** ES6 Class (singleton instance)
- **HTTP Library:** fetch()

### 2. apiClient (UNUSED)
- **File:** `/src/api.js` 
- **Type:** Axios instance
- **HTTP Library:** axios
- **Status:** No usage found in codebase

## Component-Level API Usage

### Direct API Service Usage

#### HomePage.jsx
**Location:** `/src/components/HomePage.jsx`
**Import:** `import apiService from '../services/api.js';`
**Usage:**
```javascript
// Line 23: Health check
const response = await apiService.healthCheck();

// Line 286: Search functionality
const results = await apiService.search(query);

// Line 301: Look-ahead search
const results = await apiService.search(query, 5);
```
**Endpoints Called:**
- `/health` (via healthCheck() method)
- `/api/v1/search/` (via search() method)

#### ProfilePage.jsx
**Location:** `/src/components/ProfilePage.jsx`
**Import:** `import apiService from '../services/api.js';`
**Usage:**
```javascript
// Line 35: Dynamic profile fetching
const profileData = await apiService.get(apiEndpoint);
```
**Endpoints Called:**
- `/person/${slug}` (for person profiles)
- `/school/${slug}` (for school profiles) 
- `/tournament/${slug}` (for tournament profiles)

## Custom Hook API Usage

### usePersonProfile.js
**Location:** `/src/features/person/hooks/usePersonProfile.js`
**Import:** `import apiService from '../../../services/api.js';`
**Usage:**
```javascript
// Line 20: Person profile fetch
const data = await apiService.get(`/api/v1/person/${slug}`);
```
**Endpoints Called:**
- `/api/v1/person/${slug}`

### useWrestlerMatches.js
**Location:** `/src/features/person/hooks/useWrestlerMatches.js`
**Import:** `import apiService from '../../../services/api.js';`
**Usage:**
```javascript
// Line 28: Wrestler matches with pagination
const response = await apiService.get(`/api/v1/person/${slug}/wrestler/matches`, {
  page,
  page_size: pageSize
});
```
**Endpoints Called:**
- `/api/v1/person/${slug}/wrestler/matches`

### useWrestlerStats.js
**Location:** `/src/features/person/hooks/useWrestlerStats.js`
**Import:** `import apiService from '../../../services/api.js';`
**Usage:**
```javascript
// Line 21: Wrestler statistics
const data = await apiService.get(`/api/v1/person/${slug}/wrestler/stats`);
```
**Endpoints Called:**
- `/api/v1/person/${slug}/wrestler/stats`

## Components Using API Hooks

### PersonProfile.jsx
**Location:** `/src/features/person/PersonProfile.jsx`
**Hook Import:** `import usePersonProfile from './hooks/usePersonProfile.js';`
**Usage:**
```javascript
// Line 19: Uses usePersonProfile hook
const { profile, loading, error } = usePersonProfile(slug);
```
**Indirect API Calls:** `/api/v1/person/${slug}`

### StatisticsTab.jsx
**Location:** `/src/features/person/components/StatisticsTab.jsx`
**Hook Import:** `import useWrestlerStats from '../hooks/useWrestlerStats.js';`
**Usage:**
```javascript
// Line 12: Uses useWrestlerStats hook
const { stats, loading, error } = useWrestlerStats(slug);
```
**Indirect API Calls:** `/api/v1/person/${slug}/wrestler/stats`

### MatchesTab.jsx
**Location:** `/src/features/person/components/MatchesTab.jsx`
**Hook Import:** `import useWrestlerMatches from '../hooks/useWrestlerMatches.js';`
**Usage:**
```javascript
// Line 19: Uses useWrestlerMatches hook with pagination
const { matches, total, loading, error } = useWrestlerMatches(slug, currentPage, pageSize);
```
**Indirect API Calls:** `/api/v1/person/${slug}/wrestler/matches`

## Mock Data Service

### mockApiService.js
**Location:** `/src/features/person/services/mockApiService.js`
**Purpose:** Provides mock data for development and fallback scenarios
**Integration:** Used by apiService as fallback when API calls fail
**Coverage:**
- Person profiles
- Wrestler statistics  
- Wrestler matches
- Search results

## API Endpoints Summary

### Complete Endpoint List
| Endpoint | Method | Used By | Parameters |
|----------|--------|---------|------------|
| `/health` | GET | HomePage (healthCheck) | None |
| `/api/v1/search/` | GET | HomePage (search) | `q` (query), `limit` (optional) |
| `/person/{slug}` | GET | ProfilePage | `slug` (path param) |
| `/school/{slug}` | GET | ProfilePage | `slug` (path param) |
| `/tournament/{slug}` | GET | ProfilePage | `slug` (path param) |
| `/api/v1/person/{slug}` | GET | usePersonProfile | `slug` (path param) |
| `/api/v1/person/{slug}/wrestler/matches` | GET | useWrestlerMatches | `slug` (path), `page`, `page_size` |
| `/api/v1/person/{slug}/wrestler/stats` | GET | useWrestlerStats | `slug` (path param) |

## Import Pattern Analysis

### apiService Imports (All Active)
```javascript
// Pattern 1: Component level imports
import apiService from '../services/api.js';           // HomePage, ProfilePage
import apiService from '../../../services/api.js';     // Person hooks

// Pattern 2: Hook imports (component level)
import usePersonProfile from './hooks/usePersonProfile.js';     // PersonProfile
import useWrestlerStats from '../hooks/useWrestlerStats.js';    // StatisticsTab  
import useWrestlerMatches from '../hooks/useWrestlerMatches.js'; // MatchesTab
```

### apiClient Imports (None Found)
- No imports of `apiClient` found in any component
- No imports from `/src/api.js` found in codebase

## Error Handling Patterns

### apiService Error Handling
- Network error fallback to mock data
- HTTP status code specific error messages (404, 500)
- Person profile endpoints auto-fallback to mock data
- Console logging for debugging

### Hook Error Handling  
- Consistent error state management across all hooks
- Error messages stored in state
- Loading states during API calls
- Refetch functionality for retry scenarios

## Loading State Management

All API-consuming components implement consistent loading states:
- `loading` boolean state during API calls
- Loading spinners and messages
- Proper loading state transitions

## Configuration

### API Base URL
- **Source:** `/src/config.js`
- **Environment Variable:** `VITE_API_URL`
- **Default:** `https://matiq-backend-production.up.railway.app`
- **Usage:** Used by apiService constructor

## No Direct fetch/axios Usage Found

**Search Results:** No components use direct `fetch()` or `axios` calls outside of the API service layer, indicating good separation of concerns.

## Summary Statistics

- **Total API Clients:** 2 (1 active, 1 unused)
- **Components with Direct API Usage:** 2
- **Components with Hook-based API Usage:** 3  
- **Custom API Hooks:** 3
- **Total Unique Endpoints:** 8
- **Mock Data Integration:** ✅ Implemented
- **Error Handling:** ✅ Consistent across hooks
- **Loading States:** ✅ Implemented everywhere