// Person feature barrel exports
export { default as PersonProfile } from './PersonProfile.jsx';

// Components
export { default as ProfileHeader } from './components/ProfileHeader.jsx';
export { default as ProfileTabs } from './components/ProfileTabs.jsx';
export { default as OverviewTab } from './components/OverviewTab.jsx';
export { default as StatisticsTab } from './components/StatisticsTab.jsx';
export { default as MatchesTab } from './components/MatchesTab.jsx';

// Hooks
export { default as usePersonProfile } from './hooks/usePersonProfile.js';
export { default as useWrestlerMatches } from './hooks/useWrestlerMatches.js';
export { default as useWrestlerStats } from './hooks/useWrestlerStats.js';

// Services
export { mockApiService } from './services/mockApiService.js';

// Types
export * from './types/person.types.js';