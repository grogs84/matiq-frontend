/**
 * Data transformation utilities for tournament brackets
 * Converts between MatIQ API format and react-tournament-brackets format
 */

/**
 * Transform MatIQ tournament data to bracket library format
 * @param {Object} matiqData - Tournament data from MatIQ API
 * @returns {Array} Data formatted for react-tournament-brackets
 */
export const transformTournamentData = (matiqData) => {
  if (!matiqData || !matiqData.matches) {
    return [];
  }

  // Return matches directly as the library expects an array of matches
  return matiqData.matches;
};

/**
 * Transform bracket library data back to MatIQ format
 * @param {Array} bracketData - Data from react-tournament-brackets
 * @returns {Object} Data formatted for MatIQ API
 */
export const transformBracketToMatiq = (bracketData) => {
  if (!bracketData || !Array.isArray(bracketData)) {
    return { matches: [] };
  }

  return {
    matches: bracketData
  };
};

/**
 * Validate tournament data structure
 * @param {Object} tournamentData - Tournament data to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validateTournamentData = (tournamentData) => {
  const errors = [];
  
  if (!tournamentData) {
    errors.push('Tournament data is required');
    return { isValid: false, errors };
  }

  if (!tournamentData.matches || !Array.isArray(tournamentData.matches)) {
    errors.push('Tournament must have matches array');
  }

  if (tournamentData.matches) {
    tournamentData.matches.forEach((match, matchIndex) => {
      if (!match.id) {
        errors.push(`Match ${matchIndex + 1} must have an id`);
      }
      
      if (!match.name) {
        errors.push(`Match ${matchIndex + 1} must have a name`);
      }
      
      if (!match.participants || !Array.isArray(match.participants)) {
        errors.push(`Match ${matchIndex + 1} must have participants array`);
      }
      
      if (match.participants && match.participants.length !== 2) {
        errors.push(`Match ${matchIndex + 1} must have exactly 2 participants`);
      }
      
      if (match.participants) {
        match.participants.forEach((participant, participantIndex) => {
          if (!participant.id) {
            errors.push(`Match ${matchIndex + 1}, participant ${participantIndex + 1} must have an id`);
          }
          
          if (!participant.name) {
            errors.push(`Match ${matchIndex + 1}, participant ${participantIndex + 1} must have a name`);
          }
        });
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Get tournament statistics
 * @param {Object} tournamentData - Tournament data
 * @returns {Object} Tournament statistics
 */
export const getTournamentStats = (tournamentData) => {
  if (!tournamentData || !tournamentData.matches) {
    return {
      totalRounds: 0,
      totalMatches: 0,
      completedMatches: 0,
      remainingMatches: 0
    };
  }

  const matches = tournamentData.matches;
  const totalMatches = matches.length;
  let completedMatches = 0;

  // Count rounds by checking tournamentRoundText
  const rounds = new Set();
  
  matches.forEach(match => {
    if (match.tournamentRoundText) {
      rounds.add(match.tournamentRoundText);
    }
    
    // Check if match is completed based on state
    if (match.state === 'DONE' || match.state === 'SCORE_DONE') {
      completedMatches++;
    }
  });

  return {
    totalRounds: rounds.size,
    totalMatches,
    completedMatches,
    remainingMatches: totalMatches - completedMatches
  };
};

/**
 * Group matches by round for display purposes
 * @param {Object} tournamentData - Tournament data
 * @returns {Object} Matches grouped by round
 */
export const groupMatchesByRound = (tournamentData) => {
  if (!tournamentData || !tournamentData.matches) {
    return {};
  }

  const rounds = {};
  
  tournamentData.matches.forEach(match => {
    const roundText = match.tournamentRoundText || 'Unknown';
    
    if (!rounds[roundText]) {
      rounds[roundText] = [];
    }
    
    rounds[roundText].push(match);
  });

  return rounds;
};