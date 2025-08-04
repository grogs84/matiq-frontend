// Mock tournament data for bracket visualization
export const mockTournamentData = {
  tournament: {
    id: 1,
    name: "2024 NCAA Division I Wrestling Championship",
    weight_class: "174 lbs",
    year: 2024,
    division: "Division I"
  },
  matches: [
    {
      id: 1,
      name: "Quarterfinal 1",
      nextMatchId: 5,
      tournamentRoundText: "1",
      startTime: "2024-03-15",
      state: "DONE",
      participants: [
        {
          id: "p1",
          resultText: "7",
          isWinner: true,
          status: "PLAYED",
          name: "Alex Smith (Penn State)"
        },
        {
          id: "p2", 
          resultText: "4",
          isWinner: false,
          status: "PLAYED",
          name: "Mike Johnson (Iowa)"
        }
      ]
    },
    {
      id: 2,
      name: "Quarterfinal 2",
      nextMatchId: 5,
      tournamentRoundText: "1",
      startTime: "2024-03-15",
      state: "DONE",
      participants: [
        {
          id: "p3",
          resultText: "6",
          isWinner: true,
          status: "PLAYED",
          name: "Chris Davis (Oklahoma State)"
        },
        {
          id: "p4",
          resultText: "3",
          isWinner: false,
          status: "PLAYED",
          name: "Ryan Wilson (Ohio State)"
        }
      ]
    },
    {
      id: 3,
      name: "Quarterfinal 3",
      nextMatchId: 6,
      tournamentRoundText: "1",
      startTime: "2024-03-15",
      state: "DONE",
      participants: [
        {
          id: "p5",
          resultText: "2",
          isWinner: false,
          status: "PLAYED",
          name: "Tyler Brown (Michigan)"
        },
        {
          id: "p6",
          resultText: "8",
          isWinner: true,
          status: "PLAYED",
          name: "Jake Miller (Nebraska)"
        }
      ]
    },
    {
      id: 4,
      name: "Quarterfinal 4",
      nextMatchId: 6,
      tournamentRoundText: "1",
      startTime: "2024-03-15",
      state: "DONE",
      participants: [
        {
          id: "p7",
          resultText: "9",
          isWinner: true,
          status: "PLAYED",
          name: "Matt Anderson (Missouri)"
        },
        {
          id: "p8",
          resultText: "5",
          isWinner: false,
          status: "PLAYED",
          name: "Kevin Garcia (NC State)"
        }
      ]
    },
    {
      id: 5,
      name: "Semifinal 1",
      nextMatchId: 7,
      tournamentRoundText: "2",
      startTime: "2024-03-16",
      state: "DONE",
      participants: [
        {
          id: "p1",
          resultText: "12",
          isWinner: true,
          status: "PLAYED",
          name: "Alex Smith (Penn State)"
        },
        {
          id: "p3",
          resultText: "8",
          isWinner: false,
          status: "PLAYED",
          name: "Chris Davis (Oklahoma State)"
        }
      ]
    },
    {
      id: 6,
      name: "Semifinal 2",
      nextMatchId: 7,
      tournamentRoundText: "2",
      startTime: "2024-03-16",
      state: "DONE",
      participants: [
        {
          id: "p6",
          resultText: "4",
          isWinner: false,
          status: "PLAYED",
          name: "Jake Miller (Nebraska)"
        },
        {
          id: "p7",
          resultText: "11",
          isWinner: true,
          status: "PLAYED",
          name: "Matt Anderson (Missouri)"
        }
      ]
    },
    {
      id: 7,
      name: "Championship",
      nextMatchId: null,
      tournamentRoundText: "3",
      startTime: "2024-03-17",
      state: "DONE",
      participants: [
        {
          id: "p1",
          resultText: "15",
          isWinner: true,
          status: "PLAYED",
          name: "Alex Smith (Penn State)"
        },
        {
          id: "p7",
          resultText: "12",
          isWinner: false,
          status: "PLAYED",
          name: "Matt Anderson (Missouri)"
        }
      ]
    }
  ]
};

// Tournament in progress
export const mockTournamentInProgress = {
  tournament: {
    id: 2,
    name: "2024 Big Ten Wrestling Championship",
    weight_class: "165 lbs",
    year: 2024,
    division: "Big Ten Conference"
  },
  matches: [
    {
      id: 1,
      name: "Quarterfinal 1",
      nextMatchId: 3,
      tournamentRoundText: "1",
      startTime: "2024-03-10",
      state: "DONE",
      participants: [
        {
          id: "p1",
          resultText: "6",
          isWinner: true,
          status: "PLAYED",
          name: "John Williams (Iowa)"
        },
        {
          id: "p2",
          resultText: "3",
          isWinner: false,
          status: "PLAYED",
          name: "Steve Martinez (Penn State)"
        }
      ]
    },
    {
      id: 2,
      name: "Quarterfinal 2",
      nextMatchId: 3,
      tournamentRoundText: "1",
      startTime: "2024-03-10",
      state: "SCHEDULED",
      participants: [
        {
          id: "p3",
          resultText: null,
          isWinner: false,
          status: null,
          name: "David Lee (Ohio State)"
        },
        {
          id: "p4",
          resultText: null,
          isWinner: false,
          status: null,
          name: "Tom Jackson (Michigan)"
        }
      ]
    },
    {
      id: 3,
      name: "Semifinal",
      nextMatchId: null,
      tournamentRoundText: "2",
      startTime: "2024-03-11",
      state: "SCHEDULED",
      participants: [
        {
          id: "p1",
          resultText: null,
          isWinner: false,
          status: null,
          name: "John Williams (Iowa)"
        },
        {
          id: "tbp1",
          resultText: null,
          isWinner: false,
          status: null,
          name: "TBD"
        }
      ]
    }
  ]
};

// Empty tournament structure
export const mockEmptyTournament = {
  tournament: {
    id: 3,
    name: "Upcoming Tournament",
    weight_class: "157 lbs",
    year: 2024,
    division: "Division I"
  },
  matches: [
    {
      id: 1,
      name: "Championship",
      nextMatchId: null,
      tournamentRoundText: "1",
      startTime: "2024-04-01",
      state: "SCHEDULED",
      participants: [
        {
          id: "tbd1",
          resultText: null,
          isWinner: false,
          status: null,
          name: "TBD"
        },
        {
          id: "tbd2",
          resultText: null,
          isWinner: false,
          status: null,
          name: "TBD"
        }
      ]
    }
  ]
};

// 32-person single elimination tournament
export const mock32PersonTournament = {
  tournament: {
    id: 4,
    name: "2024 NCAA Division I Wrestling Championship - 32 Person Bracket",
    weight_class: "184 lbs",
    year: 2024,
    division: "Division I"
  },
  matches: [
    // Round 1 - 16 matches (32 → 16)
    { id: 1, name: "Round 1 - Match 1", nextMatchId: 17, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p1", resultText: "8", isWinner: true, status: "PLAYED", name: "Alex Rivera (Penn State)" }, { id: "p2", resultText: "3", isWinner: false, status: "PLAYED", name: "Brad Chen (Iowa)" }] },
    { id: 2, name: "Round 1 - Match 2", nextMatchId: 17, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p3", resultText: "5", isWinner: false, status: "PLAYED", name: "Carlos Martinez (Oklahoma State)" }, { id: "p4", resultText: "7", isWinner: true, status: "PLAYED", name: "David Wilson (Ohio State)" }] },
    { id: 3, name: "Round 1 - Match 3", nextMatchId: 18, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p5", resultText: "6", isWinner: true, status: "PLAYED", name: "Erik Johnson (Michigan)" }, { id: "p6", resultText: "4", isWinner: false, status: "PLAYED", name: "Frank Davis (Nebraska)" }] },
    { id: 4, name: "Round 1 - Match 4", nextMatchId: 18, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p7", resultText: "9", isWinner: true, status: "PLAYED", name: "George Taylor (Minnesota)" }, { id: "p8", resultText: "2", isWinner: false, status: "PLAYED", name: "Henry Brown (Wisconsin)" }] },
    { id: 5, name: "Round 1 - Match 5", nextMatchId: 19, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p9", resultText: "7", isWinner: true, status: "PLAYED", name: "Ian Miller (Illinois)" }, { id: "p10", resultText: "5", isWinner: false, status: "PLAYED", name: "Jake Anderson (Northwestern)" }] },
    { id: 6, name: "Round 1 - Match 6", nextMatchId: 19, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p11", resultText: "4", isWinner: false, status: "PLAYED", name: "Kyle Williams (Purdue)" }, { id: "p12", resultText: "8", isWinner: true, status: "PLAYED", name: "Luke Smith (Indiana)" }] },
    { id: 7, name: "Round 1 - Match 7", nextMatchId: 20, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p13", resultText: "6", isWinner: true, status: "PLAYED", name: "Mike Jones (Missouri)" }, { id: "p14", resultText: "3", isWinner: false, status: "PLAYED", name: "Nick Garcia (NC State)" }] },
    { id: 8, name: "Round 1 - Match 8", nextMatchId: 20, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p15", resultText: "5", isWinner: false, status: "PLAYED", name: "Oscar Lopez (Virginia Tech)" }, { id: "p16", resultText: "9", isWinner: true, status: "PLAYED", name: "Paul Rodriguez (Arizona State)" }] },
    { id: 9, name: "Round 1 - Match 9", nextMatchId: 21, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p17", resultText: "8", isWinner: true, status: "PLAYED", name: "Quinn Thompson (Stanford)" }, { id: "p18", resultText: "4", isWinner: false, status: "PLAYED", name: "Ryan Lee (Cal Poly)" }] },
    { id: 10, name: "Round 1 - Match 10", nextMatchId: 21, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p19", resultText: "6", isWinner: false, status: "PLAYED", name: "Sam White (Oregon State)" }, { id: "p20", resultText: "7", isWinner: true, status: "PLAYED", name: "Tyler Black (Utah Valley)" }] },
    { id: 11, name: "Round 1 - Match 11", nextMatchId: 22, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p21", resultText: "9", isWinner: true, status: "PLAYED", name: "Victor Nash (Wyoming)" }, { id: "p22", resultText: "3", isWinner: false, status: "PLAYED", name: "Will Parker (North Dakota State)" }] },
    { id: 12, name: "Round 1 - Match 12", nextMatchId: 22, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p23", resultText: "5", isWinner: false, status: "PLAYED", name: "Xavier Cruz (South Dakota State)" }, { id: "p24", resultText: "8", isWinner: true, status: "PLAYED", name: "Yuki Tanaka (Fresno State)" }] },
    { id: 13, name: "Round 1 - Match 13", nextMatchId: 23, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p25", resultText: "7", isWinner: true, status: "PLAYED", name: "Zach Foster (Rutgers)" }, { id: "p26", resultText: "4", isWinner: false, status: "PLAYED", name: "Adam King (Princeton)" }] },
    { id: 14, name: "Round 1 - Match 14", nextMatchId: 23, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p27", resultText: "6", isWinner: false, status: "PLAYED", name: "Blake Harper (Harvard)" }, { id: "p28", resultText: "9", isWinner: true, status: "PLAYED", name: "Cole Evans (Cornell)" }] },
    { id: 15, name: "Round 1 - Match 15", nextMatchId: 24, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p29", resultText: "8", isWinner: true, status: "PLAYED", name: "Dylan Scott (Columbia)" }, { id: "p30", resultText: "2", isWinner: false, status: "PLAYED", name: "Ethan Moore (Brown)" }] },
    { id: 16, name: "Round 1 - Match 16", nextMatchId: 24, tournamentRoundText: "1", startTime: "2024-03-15", state: "DONE", participants: [{ id: "p31", resultText: "5", isWinner: false, status: "PLAYED", name: "Felix Clark (Drexel)" }, { id: "p32", resultText: "7", isWinner: true, status: "PLAYED", name: "Grant Phillips (Lehigh)" }] },
    
    // Round 2 - 8 matches (16 → 8)
    { id: 17, name: "Round 2 - Match 1", nextMatchId: 25, tournamentRoundText: "2", startTime: "2024-03-16", state: "DONE", participants: [{ id: "p1", resultText: "12", isWinner: true, status: "PLAYED", name: "Alex Rivera (Penn State)" }, { id: "p4", resultText: "7", isWinner: false, status: "PLAYED", name: "David Wilson (Ohio State)" }] },
    { id: 18, name: "Round 2 - Match 2", nextMatchId: 25, tournamentRoundText: "2", startTime: "2024-03-16", state: "DONE", participants: [{ id: "p5", resultText: "8", isWinner: false, status: "PLAYED", name: "Erik Johnson (Michigan)" }, { id: "p7", resultText: "10", isWinner: true, status: "PLAYED", name: "George Taylor (Minnesota)" }] },
    { id: 19, name: "Round 2 - Match 3", nextMatchId: 26, tournamentRoundText: "2", startTime: "2024-03-16", state: "DONE", participants: [{ id: "p9", resultText: "11", isWinner: true, status: "PLAYED", name: "Ian Miller (Illinois)" }, { id: "p12", resultText: "5", isWinner: false, status: "PLAYED", name: "Luke Smith (Indiana)" }] },
    { id: 20, name: "Round 2 - Match 4", nextMatchId: 26, tournamentRoundText: "2", startTime: "2024-03-16", state: "DONE", participants: [{ id: "p13", resultText: "6", isWinner: false, status: "PLAYED", name: "Mike Jones (Missouri)" }, { id: "p16", resultText: "9", isWinner: true, status: "PLAYED", name: "Paul Rodriguez (Arizona State)" }] },
    { id: 21, name: "Round 2 - Match 5", nextMatchId: 27, tournamentRoundText: "2", startTime: "2024-03-16", state: "DONE", participants: [{ id: "p17", resultText: "13", isWinner: true, status: "PLAYED", name: "Quinn Thompson (Stanford)" }, { id: "p20", resultText: "4", isWinner: false, status: "PLAYED", name: "Tyler Black (Utah Valley)" }] },
    { id: 22, name: "Round 2 - Match 6", nextMatchId: 27, tournamentRoundText: "2", startTime: "2024-03-16", state: "DONE", participants: [{ id: "p21", resultText: "7", isWinner: false, status: "PLAYED", name: "Victor Nash (Wyoming)" }, { id: "p24", resultText: "10", isWinner: true, status: "PLAYED", name: "Yuki Tanaka (Fresno State)" }] },
    { id: 23, name: "Round 2 - Match 7", nextMatchId: 28, tournamentRoundText: "2", startTime: "2024-03-16", state: "DONE", participants: [{ id: "p25", resultText: "8", isWinner: false, status: "PLAYED", name: "Zach Foster (Rutgers)" }, { id: "p28", resultText: "12", isWinner: true, status: "PLAYED", name: "Cole Evans (Cornell)" }] },
    { id: 24, name: "Round 2 - Match 8", nextMatchId: 28, tournamentRoundText: "2", startTime: "2024-03-16", state: "DONE", participants: [{ id: "p29", resultText: "14", isWinner: true, status: "PLAYED", name: "Dylan Scott (Columbia)" }, { id: "p32", resultText: "6", isWinner: false, status: "PLAYED", name: "Grant Phillips (Lehigh)" }] },
    
    // Round 3 - Quarterfinals (8 → 4)
    { id: 25, name: "Quarterfinal 1", nextMatchId: 29, tournamentRoundText: "3", startTime: "2024-03-17", state: "DONE", participants: [{ id: "p1", resultText: "15", isWinner: true, status: "PLAYED", name: "Alex Rivera (Penn State)" }, { id: "p7", resultText: "8", isWinner: false, status: "PLAYED", name: "George Taylor (Minnesota)" }] },
    { id: 26, name: "Quarterfinal 2", nextMatchId: 29, tournamentRoundText: "3", startTime: "2024-03-17", state: "DONE", participants: [{ id: "p9", resultText: "9", isWinner: false, status: "PLAYED", name: "Ian Miller (Illinois)" }, { id: "p16", resultText: "11", isWinner: true, status: "PLAYED", name: "Paul Rodriguez (Arizona State)" }] },
    { id: 27, name: "Quarterfinal 3", nextMatchId: 30, tournamentRoundText: "3", startTime: "2024-03-17", state: "DONE", participants: [{ id: "p17", resultText: "16", isWinner: true, status: "PLAYED", name: "Quinn Thompson (Stanford)" }, { id: "p24", resultText: "12", isWinner: false, status: "PLAYED", name: "Yuki Tanaka (Fresno State)" }] },
    { id: 28, name: "Quarterfinal 4", nextMatchId: 30, tournamentRoundText: "3", startTime: "2024-03-17", state: "DONE", participants: [{ id: "p28", resultText: "7", isWinner: false, status: "PLAYED", name: "Cole Evans (Cornell)" }, { id: "p29", resultText: "13", isWinner: true, status: "PLAYED", name: "Dylan Scott (Columbia)" }] },
    
    // Round 4 - Semifinals (4 → 2)
    { id: 29, name: "Semifinal 1", nextMatchId: 31, tournamentRoundText: "4", startTime: "2024-03-18", state: "DONE", participants: [{ id: "p1", resultText: "18", isWinner: true, status: "PLAYED", name: "Alex Rivera (Penn State)" }, { id: "p16", resultText: "14", isWinner: false, status: "PLAYED", name: "Paul Rodriguez (Arizona State)" }] },
    { id: 30, name: "Semifinal 2", nextMatchId: 31, tournamentRoundText: "4", startTime: "2024-03-18", state: "DONE", participants: [{ id: "p17", resultText: "15", isWinner: false, status: "PLAYED", name: "Quinn Thompson (Stanford)" }, { id: "p29", resultText: "17", isWinner: true, status: "PLAYED", name: "Dylan Scott (Columbia)" }] },
    
    // Round 5 - Championship (2 → 1)
    { id: 31, name: "Championship", nextMatchId: null, tournamentRoundText: "5", startTime: "2024-03-19", state: "DONE", participants: [{ id: "p1", resultText: "20", isWinner: true, status: "PLAYED", name: "Alex Rivera (Penn State)" }, { id: "p29", resultText: "16", isWinner: false, status: "PLAYED", name: "Dylan Scott (Columbia)" }] }
  ]
};

// Double elimination tournament
export const mockDoubleEliminationTournament = {
  tournament: {
    id: 5,
    name: "2024 Big Ten Conference Double Elimination Championship",
    weight_class: "197 lbs", 
    year: 2024,
    division: "Big Ten Conference"
  },
  matches: [
    // Winners Bracket Round 1 (4 matches: 8 → 4)
    { 
      id: 1, 
      name: "WB Round 1 - Match 1", 
      nextMatchId: 5, 
      nextLooserMatchId: 9, // Loser goes to LB Round 1 - Match 1
      tournamentRoundText: "UB 1", 
      startTime: "2024-03-20", 
      state: "DONE", 
      participants: [
        { id: "p1", resultText: "8", isWinner: true, status: "PLAYED", name: "Marcus Johnson (Iowa)" }, 
        { id: "p2", resultText: "5", isWinner: false, status: "PLAYED", name: "Tony Davis (Penn State)" }
      ] 
    },
    { 
      id: 2, 
      name: "WB Round 1 - Match 2", 
      nextMatchId: 5, 
      nextLooserMatchId: 9, // Loser goes to LB Round 1 - Match 1
      tournamentRoundText: "UB 1", 
      startTime: "2024-03-20", 
      state: "DONE", 
      participants: [
        { id: "p3", resultText: "6", isWinner: false, status: "PLAYED", name: "Carlos White (Ohio State)" }, 
        { id: "p4", resultText: "9", isWinner: true, status: "PLAYED", name: "Derek Brown (Michigan)" }
      ] 
    },
    { 
      id: 3, 
      name: "WB Round 1 - Match 3", 
      nextMatchId: 6, 
      nextLooserMatchId: 10, // Loser goes to LB Round 1 - Match 2
      tournamentRoundText: "UB 1", 
      startTime: "2024-03-20", 
      state: "DONE", 
      participants: [
        { id: "p5", resultText: "7", isWinner: true, status: "PLAYED", name: "Eric Wilson (Minnesota)" }, 
        { id: "p6", resultText: "4", isWinner: false, status: "PLAYED", name: "Frank Miller (Wisconsin)" }
      ] 
    },
    { 
      id: 4, 
      name: "WB Round 1 - Match 4", 
      nextMatchId: 6, 
      nextLooserMatchId: 10, // Loser goes to LB Round 1 - Match 2
      tournamentRoundText: "UB 1", 
      startTime: "2024-03-20", 
      state: "DONE", 
      participants: [
        { id: "p7", resultText: "5", isWinner: false, status: "PLAYED", name: "Gary Taylor (Illinois)" }, 
        { id: "p8", resultText: "8", isWinner: true, status: "PLAYED", name: "Henry Garcia (Nebraska)" }
      ] 
    },
    
    // Winners Bracket Round 2 (2 matches: 4 → 2)  
    { 
      id: 5, 
      name: "WB Semifinal 1", 
      nextMatchId: 7, 
      nextLooserMatchId: 13, // Loser goes to LB Round 3 - Match 1
      tournamentRoundText: "UB 2", 
      startTime: "2024-03-21", 
      state: "DONE", 
      participants: [
        { id: "p1", resultText: "12", isWinner: true, status: "PLAYED", name: "Marcus Johnson (Iowa)" }, 
        { id: "p4", resultText: "8", isWinner: false, status: "PLAYED", name: "Derek Brown (Michigan)" }
      ] 
    },
    { 
      id: 6, 
      name: "WB Semifinal 2", 
      nextMatchId: 7, 
      nextLooserMatchId: 14, // Loser goes to LB Round 3 - Match 2
      tournamentRoundText: "UB 2", 
      startTime: "2024-03-21", 
      state: "DONE", 
      participants: [
        { id: "p5", resultText: "9", isWinner: false, status: "PLAYED", name: "Eric Wilson (Minnesota)" }, 
        { id: "p8", resultText: "11", isWinner: true, status: "PLAYED", name: "Henry Garcia (Nebraska)" }
      ] 
    },

    // Winners Bracket Final (1 match: 2 → 1)
    { 
      id: 7, 
      name: "WB Final", 
      nextMatchId: 15, 
      nextLooserMatchId: 14, // Loser goes to LB Semifinal
      tournamentRoundText: "UB 3", 
      startTime: "2024-03-22", 
      state: "DONE", 
      participants: [
        { id: "p1", resultText: "15", isWinner: true, status: "PLAYED", name: "Marcus Johnson (Iowa)" }, 
        { id: "p8", resultText: "12", isWinner: false, status: "PLAYED", name: "Henry Garcia (Nebraska)" }
      ] 
    },

    // Losers Bracket Round 1 (2 matches: 4 first-round losers → 2)
    { 
      id: 9, 
      name: "LB Round 1 - Match 1", 
      nextMatchId: 11, 
      nextLooserMatchId: null,
      tournamentRoundText: "LB 1", 
      startTime: "2024-03-20", 
      state: "DONE", 
      participants: [
        { id: "p2", resultText: "6", isWinner: true, status: "PLAYED", name: "Tony Davis (Penn State)" }, 
        { id: "p3", resultText: "3", isWinner: false, status: "PLAYED", name: "Carlos White (Ohio State)" }
      ] 
    },
    { 
      id: 10, 
      name: "LB Round 1 - Match 2", 
      nextMatchId: 12, 
      nextLooserMatchId: null,
      tournamentRoundText: "LB 1", 
      startTime: "2024-03-20", 
      state: "DONE", 
      participants: [
        { id: "p6", resultText: "7", isWinner: true, status: "PLAYED", name: "Frank Miller (Wisconsin)" }, 
        { id: "p7", resultText: "4", isWinner: false, status: "PLAYED", name: "Gary Taylor (Illinois)" }
      ] 
    },

    // Losers Bracket Round 2 (2 matches: 2 LB R1 winners vs 2 WB semifinal losers → 2)
    { 
      id: 11, 
      name: "LB Round 2 - Match 1", 
      nextMatchId: 13, 
      nextLooserMatchId: null,
      tournamentRoundText: "LB 2", 
      startTime: "2024-03-21", 
      state: "DONE", 
      participants: [
        { id: "p2", resultText: "10", isWinner: true, status: "PLAYED", name: "Tony Davis (Penn State)" }, 
        { id: "p4", resultText: "7", isWinner: false, status: "PLAYED", name: "Derek Brown (Michigan)" }
      ] 
    },
    { 
      id: 12, 
      name: "LB Round 2 - Match 2", 
      nextMatchId: 14, 
      nextLooserMatchId: null,
      tournamentRoundText: "LB 2", 
      startTime: "2024-03-21", 
      state: "DONE", 
      participants: [
        { id: "p6", resultText: "8", isWinner: false, status: "PLAYED", name: "Frank Miller (Wisconsin)" }, 
        { id: "p5", resultText: "11", isWinner: true, status: "PLAYED", name: "Eric Wilson (Minnesota)" }
      ] 
    },

    // Losers Bracket Round 3 (1 match: 2 LB R2 winners → 1)
    { 
      id: 13, 
      name: "LB Round 3 - Match 1", 
      nextMatchId: 14, 
      nextLooserMatchId: null,
      tournamentRoundText: "LB 3", 
      startTime: "2024-03-22", 
      state: "DONE", 
      participants: [
        { id: "p2", resultText: "13", isWinner: true, status: "PLAYED", name: "Tony Davis (Penn State)" }, 
        { id: "p5", resultText: "9", isWinner: false, status: "PLAYED", name: "Eric Wilson (Minnesota)" }
      ] 
    },

    // Losers Bracket Semifinal (1 match: LB R3 winner vs WB Final loser → 1)
    { 
      id: 14, 
      name: "LB Semifinal", 
      nextMatchId: 15, 
      nextLooserMatchId: null,
      tournamentRoundText: "LB 4", 
      startTime: "2024-03-22", 
      state: "DONE", 
      participants: [
        { id: "p2", resultText: "16", isWinner: true, status: "PLAYED", name: "Tony Davis (Penn State)" }, 
        { id: "p8", resultText: "12", isWinner: false, status: "PLAYED", name: "Henry Garcia (Nebraska)" }
      ] 
    },

    // Championship Final (Grand Final - WB winner vs LB winner)
    { 
      id: 15, 
      name: "Championship", 
      nextMatchId: null, 
      nextLooserMatchId: null,
      tournamentRoundText: "UB 4", 
      startTime: "2024-03-23", 
      state: "DONE", 
      participants: [
        { id: "p1", resultText: "18", isWinner: true, status: "PLAYED", name: "Marcus Johnson (Iowa)" }, 
        { id: "p2", resultText: "14", isWinner: false, status: "PLAYED", name: "Tony Davis (Penn State)" }
      ] 
    }
  ]
}