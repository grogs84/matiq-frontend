/**
 * Person Profile Type Definitions
 */

/**
 * @typedef {Object} PersonRole
 * @property {string} role_id - Unique identifier for the role
 * @property {string} role_type - Type of role (e.g., "wrestler")
 */

/**
 * @typedef {Object} PersonProfile
 * @property {string} person_id - Unique identifier for the person
 * @property {string} slug - URL-friendly identifier
 * @property {string} first_name - Person's first name
 * @property {string} last_name - Person's last name
 * @property {string} search_name - Searchable name
 * @property {string|null} profile_image_url - URL to profile image
 * @property {string|null} date_of_birth - Date of birth (ISO string)
 * @property {string|null} city_of_origin - City where person is from
 * @property {string|null} state_of_origin - State where person is from
 * @property {PersonRole[]} roles - Array of roles for this person
 */

/**
 * @typedef {Object} WrestlerYearlyStats
 * @property {number} year - The year for these stats
 * @property {number} weight_class - Weight class for the year
 * @property {number} wins - Number of wins
 * @property {number|null} placement - Tournament placement (if available)
 */

/**
 * @typedef {Object} WrestlerStats
 * @property {WrestlerYearlyStats[]} yearly_stats - Array of yearly statistics
 */

/**
 * @typedef {Object} WrestlerMatch
 * @property {number} year - Year of the match
 * @property {string} weight_class - Weight class (e.g., "86kg")
 * @property {string} round - Round name (e.g., "Final")
 * @property {number} round_order - Order of the round
 * @property {string} wrestler_name - Name of the wrestler
 * @property {string} wrestler_person_id - Wrestler's person ID
 * @property {string} wrestler_school_name - Wrestler's school
 * @property {boolean} is_winner - Whether the wrestler won
 * @property {string} opponent_name - Opponent's name
 * @property {string} opponent_person_id - Opponent's person ID
 * @property {string} opponent_slug - Opponent's slug for linking
 * @property {string} opponent_school_name - Opponent's school
 * @property {string} result_type - Type of result (e.g., "Decision")
 * @property {string} score - Match score
 */

/**
 * @typedef {Object} WrestlerMatchesResponse
 * @property {WrestlerMatch[]} matches - Array of matches
 * @property {number} total - Total number of matches
 * @property {number} page - Current page number
 * @property {number} page_size - Number of matches per page
 */

export {};