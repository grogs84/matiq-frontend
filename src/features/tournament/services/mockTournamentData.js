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