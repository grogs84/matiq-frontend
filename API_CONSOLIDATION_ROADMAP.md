# API Consolidation Implementation Roadmap
**Step-by-step guide for implementing single API pattern across the application**

## Overview

This roadmap provides a practical, phased approach to consolidate the API layer architecture based on the audit findings. The goal is to establish a single, consistent API pattern using custom hooks while maintaining application functionality.

## Phase 1: Immediate Cleanup (Week 1, Days 1-2)

### 1.1 Remove Unused API Client ⚡ HIGH PRIORITY
**Objective:** Eliminate dead code and reduce dependencies

**Steps:**
1. **Remove the unused apiClient file**
   ```bash
   rm src/api.js
   ```

2. **Remove axios dependency**
   ```bash
   npm uninstall axios
   ```

3. **Verify no broken imports**
   ```bash
   # Search for any remaining references
   grep -r "from.*api\.js" src/
   grep -r "import.*apiClient" src/
   ```

**Risk:** Low - File is completely unused
**Impact:** Reduces bundle size, eliminates confusion

### 1.2 Update Package.json
**File:** `package.json`
**Action:** Remove axios from dependencies (should happen automatically with npm uninstall)

## Phase 2: Extract API Logic to Custom Hooks (Week 1, Days 3-5)

### 2.1 Create useSearch Hook
**Objective:** Replace direct apiService usage in HomePage

**New File:** `/src/hooks/useSearch.js`
```javascript
import { useState, useCallback } from 'react';
import apiService from '../services/api.js';

/**
 * Hook for search functionality
 * @param {number} defaultLimit - Default search limit
 * @returns {Object} { search, lookAhead, results, loading, error }
 */
export function useSearch(defaultLimit = 20) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (query, limit = defaultLimit) => {
    if (!query.trim()) {
      setResults(null);
      setError(null);
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await apiService.search(query, limit);
      setResults(response);
      return response;
    } catch (err) {
      console.error('Search failed:', err);
      setError(err.message);
      setResults(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [defaultLimit]);

  const lookAhead = useCallback(async (query, limit = 5) => {
    const response = await apiService.search(query, limit);
    return response.results || [];
  }, []);

  return {
    search,
    lookAhead,
    results,
    loading,
    error
  };
}

export default useSearch;
```

**Update:** `/src/components/HomePage.jsx`
```javascript
// Replace direct apiService usage with custom hook
import useSearch from '../hooks/useSearch.js';

function HomePage() {
  const { search, lookAhead, results: searchResults, loading: isSearching, error: searchError } = useSearch();
  
  // Remove state management for search results - now handled by hook
  // Update handleSearch and handleLookAhead to use hook methods
}
```

### 2.2 Create useHealthCheck Hook
**New File:** `/src/hooks/useHealthCheck.js`
```javascript
import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api.js';

/**
 * Hook for API health check functionality
 * @param {boolean} autoCheck - Whether to automatically check on mount
 * @returns {Object} { status, loading, error, checkHealth }
 */
export function useHealthCheck(autoCheck = true) {
  const [status, setStatus] = useState('unknown');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.healthCheck();
      setStatus(response.status === 'healthy' ? 'healthy' : 'unhealthy');
    } catch (err) {
      console.error('Health check failed:', err);
      setError(err.message);
      setStatus('unhealthy');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoCheck) {
      checkHealth();
    }
  }, [autoCheck, checkHealth]);

  return {
    status,
    loading,
    error,
    checkHealth
  };
}

export default useHealthCheck;
```

### 2.3 Create useProfile Hook
**Objective:** Replace direct apiService usage in ProfilePage

**New File:** `/src/hooks/useProfile.js`
```javascript
import { useState, useEffect } from 'react';
import apiService from '../services/api.js';

/**
 * Hook to fetch profile data for different entity types
 * @param {string} slug - Entity slug
 * @param {string} entityType - 'person', 'school', or 'tournament'
 * @returns {Object} { profile, loading, error, refetch }
 */
export function useProfile(slug, entityType = 'person') {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      
      const apiEndpoint = `/${entityType}/${slug}`;
      const profileData = await apiService.get(apiEndpoint);
      
      setProfile({
        ...profileData,
        entityType: entityType,
        // Add additional demo data for consistency
        roles: entityType === 'person' ? ['Wrestler'] : [],
        achievements: [
          entityType === 'person' ? 'NCAA Division I Champion (2023)' : 
          entityType === 'school' ? 'Top Wrestling Program' :
          'Major Championship Tournament',
          'Excellence in Competition',
          'Outstanding Performance'
        ],
        stats: entityType === 'person' ? {
          career_wins: 156,
          career_losses: 23,
          pins: 45,
          tech_falls: 12,
          major_decisions: 28
        } : {}
      });
    } catch (err) {
      console.error('Profile loading failed:', err);
      setError(err.message);
      
      // Fallback to demo data
      setProfile({
        slug: slug,
        entityType: entityType,
        first_name: entityType === 'person' ? 'Demo' : undefined,
        last_name: entityType === 'person' ? 'Person' : undefined,
        search_name: entityType === 'person' ? `Demo Person ${slug}` : 
                    entityType === 'school' ? `Demo School ${slug}` :
                    `Demo Tournament ${slug}`,
        name: entityType !== 'person' ? `Demo ${entityType} ${slug}` : undefined,
        state_of_origin: entityType === 'person' ? 'PA' : undefined,
        location: entityType !== 'person' ? 'Demo Location' : undefined,
        roles: entityType === 'person' ? ['Wrestler', 'Coach'] : [],
        school: entityType === 'person' ? 'Penn State University' : undefined,
        weight_class: entityType === 'person' ? '184 lbs' : undefined,
        wins: entityType === 'person' ? 42 : undefined,
        losses: entityType === 'person' ? 8 : undefined,
        bio: `This is a dummy ${entityType} page for slug: ${slug}. In a real application, this would fetch actual data from the API.`,
        achievements: [
          entityType === 'person' ? 'NCAA Division I Champion (2023)' :
          entityType === 'school' ? 'Top Wrestling Program' :
          'Major Championship Tournament',
          'Excellence in Competition',
          'Outstanding Performance'
        ],
        stats: entityType === 'person' ? {
          career_wins: 156,
          career_losses: 23,
          pins: 45,
          tech_falls: 12,
          major_decisions: 28
        } : {}
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [slug, entityType]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile
  };
}

export default useProfile;
```

## Phase 3: Directory Organization (Week 1, Day 5)

### 3.1 Create Global Hooks Directory
```bash
mkdir -p src/hooks
```

### 3.2 Move Person-Specific Hooks (Optional)
Consider whether person hooks should remain in feature directory or move to global hooks. 
**Recommendation:** Keep in feature directory for feature-specific logic.

## Phase 4: Update Components (Week 2, Days 1-2)

### 4.1 Update HomePage.jsx
**Changes Required:**
- Import useSearch and useHealthCheck hooks
- Remove direct apiService imports and usage
- Remove manual state management for search and health check
- Update HealthCheck component to use useHealthCheck hook

### 4.2 Update ProfilePage.jsx  
**Changes Required:**
- Import useProfile hook
- Remove direct apiService imports and usage
- Remove manual profile loading logic
- Update to use hook's loading, error, and profile state

## Phase 5: Testing and Validation (Week 2, Days 3-4)

### 5.1 Functional Testing
**Test Scenarios:**
- [ ] Search functionality works identically
- [ ] Health check displays correct status
- [ ] Profile pages load correctly for all entity types
- [ ] Error handling maintains same behavior
- [ ] Loading states display properly
- [ ] Mock data fallback still works

### 5.2 Performance Testing
**Verify:**
- [ ] No performance regression
- [ ] API calls not duplicated
- [ ] Proper cleanup of hook resources

### 5.3 Code Quality
**Checks:**
- [ ] No eslint errors
- [ ] Build succeeds
- [ ] No console errors in browser

## Phase 6: Documentation and Cleanup (Week 2, Day 5)

### 6.1 Update Documentation
- Update README with new hook patterns
- Document new hooks in JSDoc format
- Create hook usage examples

### 6.2 Code Review
- Ensure consistent error handling across all hooks
- Verify proper cleanup and memory management
- Check for any remaining direct API service usage

## Implementation Notes

### Backwards Compatibility
- All changes maintain existing API behavior
- Component interfaces remain unchanged
- No breaking changes to existing functionality

### Error Handling Strategy
- Maintain existing fallback mechanisms
- Preserve mock data integration
- Keep consistent error message formats

### Testing Strategy
- Manual testing of all affected components
- Verify API calls in browser network tab
- Test error scenarios and fallbacks

## Success Criteria

- [ ] ✅ Single API pattern across all components
- [ ] ✅ No direct apiService usage in components
- [ ] ✅ All API logic encapsulated in custom hooks
- [ ] ✅ Consistent loading and error state management
- [ ] ✅ No functional regressions
- [ ] ✅ Eliminated unused code (apiClient)
- [ ] ✅ Improved code organization and reusability

## Risk Mitigation

### Low Risk Items
- Removing unused apiClient (no functional impact)
- Adding new hooks (additive changes)

### Medium Risk Items  
- Refactoring HomePage and ProfilePage components
- **Mitigation:** Thorough testing, maintain exact same behavior

### Rollback Plan
If issues arise:
1. Git revert to previous working state
2. Re-implement changes incrementally
3. Test each component individually

## Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| Phase 1 | 1-2 days | Remove unused code |
| Phase 2 | 3 days | Create custom hooks |
| Phase 3 | 0.5 days | Organize directories |
| Phase 4 | 2 days | Update components |
| Phase 5 | 2 days | Testing & validation |
| Phase 6 | 0.5 days | Documentation |
| **Total** | **8-9 days** | **Unified API pattern** |

This roadmap provides a safe, incremental approach to consolidating the API layer while maintaining all existing functionality.