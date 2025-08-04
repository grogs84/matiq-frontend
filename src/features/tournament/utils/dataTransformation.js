/**
 * Data transformation utilities for tournament brackets
 * Converts between MatIQ API format and react-tournament-brackets format
 */

/**
 * Transform MatIQ tournament data to bracket library format
 * @param {Object} matiqData - Tournament data from MatIQ API
 * @returns {Array|Object} Data formatted for react-tournament-brackets
 */
export const transformTournamentData = (matiqData) => {
  if (!matiqData || !matiqData.matches) {
    return [];
  }

  // Check if this is a double elimination tournament
  const isDoubleElimination = isDoubleEliminationTournament(matiqData);
  
  if (isDoubleElimination) {
    // Transform to double elimination format with upper and lower brackets
    const { upper, lower } = transformToDoubleEliminationFormat(matiqData);
    return {
      upper: upper,
      lower: lower
    };
  }

  // Return matches directly for single elimination as the library expects an array of matches
  return matiqData.matches;
};

/**
 * Check if tournament is double elimination
 * @param {Object} tournamentData - Tournament data
 * @returns {boolean} True if double elimination
 */
export const isDoubleEliminationTournament = (tournamentData) => {
  if (!tournamentData) return false;
  
  // Check tournament name for "Double Elimination"
  if (tournamentData.tournament?.name?.toLowerCase().includes('double elimination')) {
    return true;
  }
  
  // Check if any matches have WB (Winners Bracket) or LB (Losers Bracket) prefixes
  if (tournamentData.matches?.some(match => 
    match.name?.includes('WB ') || 
    match.name?.includes('LB ') ||
    match.name?.includes('Winners') ||
    match.name?.includes('Losers')
  )) {
    return true;
  }
  
  // Check tournament ID (ID 5 is our double elimination demo)
  if (tournamentData.tournament?.id === 5) {
    return true;
  }
  
  return false;
};

/**
 * Transform matches to double elimination format
 * @param {Object} matiqData - Tournament data from MatIQ API
 * @returns {Object} Data formatted with separate winners and consolation brackets
 */
export const transformToDoubleEliminationFormat = (matiqData) => {
  if (!matiqData || !matiqData.matches) {
    return { upper: [], lower: [] };
  }

  const winners = [];
  const consolation = [];

  matiqData.matches.forEach(match => {
    // Determine if match belongs to winners bracket or consolation bracket
    const matchName = match.name || '';
    
    if (matchName.includes('WB ') || 
        matchName === 'Championship' ||
        matchName === 'WB Final' ||
        matchName.includes('WB Semifinal') ||
        matchName.includes('Winners') ||
        matchName.includes('UB ')) {
      // Winners bracket matches - path to championship
      winners.push(match);
    } else if (matchName.includes('LB ') || 
               matchName === '3rd Place Match' ||
               matchName === 'Grand Final' ||
               matchName.includes('Consolation') ||
               matchName.includes('Losers')) {
      // Consolation bracket matches - path to 3rd place and below
      consolation.push(match);
    } else {
      // For unclear cases, look at the match flow to determine bracket
      const nextMatch = matiqData.matches.find(m => m.id === match.nextMatchId);
      if (nextMatch) {
        const nextMatchName = nextMatch.name || '';
        if (nextMatchName.includes('WB ') || 
            nextMatchName === 'Championship' ||
            nextMatchName === 'WB Final' ||
            nextMatchName.includes('Winners') ||
            nextMatchName.includes('UB ')) {
          winners.push(match);
        } else if (nextMatchName.includes('LB ') || 
                   nextMatchName === '3rd Place Match' ||
                   nextMatchName === 'Grand Final' ||
                   nextMatchName.includes('Consolation') ||
                   nextMatchName.includes('Losers')) {
          consolation.push(match);
        } else {
          // Default to winners bracket for ambiguous cases
          winners.push(match);
        }
      } else {
        // Terminal match - check if it's championship (winners) or 3rd place (consolation)
        if (matchName === 'Championship' || matchName === 'WB Final' || matchName.includes('Championship')) {
          winners.push(match);
        } else if (matchName === '3rd Place Match' || matchName.includes('3rd Place') || matchName === 'Grand Final') {
          consolation.push(match);
        } else {
          // Default to winners bracket
          winners.push(match);
        }
      }
    }
  });

  // Return with consistent naming for the component
  return { 
    upper: winners, 
    lower: consolation 
  };
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