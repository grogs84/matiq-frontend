// Mock data for testing when API is unavailable
export const mockPersonData = {
  "david-taylor": {
    person_id: "mock-uuid-david-taylor",
    slug: "david-taylor",
    first_name: "David",
    last_name: "Taylor",
    search_name: "David Taylor",
    profile_image_url: null,
    date_of_birth: "1990-12-05",
    city_of_origin: "St. Paris",
    state_of_origin: "Ohio",
    roles: [
      {
        role_id: "mock-role-uuid",
        role_type: "wrestler"
      }
    ]
  }
};

export const mockStatsData = {
  "david-taylor": {
    yearly_stats: [
      {
        year: 2023,
        weight_class: 86,
        wins: 15,
        placement: 1
      },
      {
        year: 2022,
        weight_class: 86,
        wins: 18,
        placement: 1
      },
      {
        year: 2021,
        weight_class: 86,
        wins: 12,
        placement: 2
      },
      {
        year: 2020,
        weight_class: 86,
        wins: 14,
        placement: 1
      }
    ]
  }
};

export const mockMatchesData = {
  "david-taylor": {
    matches: [
      {
        year: 2023,
        weight_class: "86kg",
        round: "Final",
        round_order: 1,
        wrestler_name: "David Taylor",
        wrestler_person_id: "mock-uuid-david-taylor",
        wrestler_school_name: "Penn State",
        is_winner: true,
        opponent_name: "John Smith",
        opponent_person_id: "mock-uuid-john-smith",
        opponent_slug: "john-smith",
        opponent_school_name: "Iowa",
        result_type: "Decision",
        score: "5-2"
      },
      {
        year: 2023,
        weight_class: "86kg",
        round: "Semifinal",
        round_order: 2,
        wrestler_name: "David Taylor",
        wrestler_person_id: "mock-uuid-david-taylor",
        wrestler_school_name: "Penn State",
        is_winner: true,
        opponent_name: "Mike Johnson",
        opponent_person_id: "mock-uuid-mike-johnson",
        opponent_slug: "mike-johnson",
        opponent_school_name: "Michigan",
        result_type: "Tech Fall",
        score: "15-3"
      },
      {
        year: 2023,
        weight_class: "86kg",
        round: "Quarterfinal",
        round_order: 3,
        wrestler_name: "David Taylor",
        wrestler_person_id: "mock-uuid-david-taylor",
        wrestler_school_name: "Penn State",
        is_winner: false,
        opponent_name: "Alex Rodriguez",
        opponent_person_id: "mock-uuid-alex-rodriguez",
        opponent_slug: "alex-rodriguez",
        opponent_school_name: "Nebraska",
        result_type: "Decision",
        score: "3-4"
      },
      {
        year: 2022,
        weight_class: "86kg",
        round: "Final",
        round_order: 1,
        wrestler_name: "David Taylor",
        wrestler_person_id: "mock-uuid-david-taylor",
        wrestler_school_name: "Penn State",
        is_winner: true,
        opponent_name: "Steve Wilson",
        opponent_person_id: "mock-uuid-steve-wilson",
        opponent_slug: "steve-wilson",
        opponent_school_name: "Oklahoma State",
        result_type: "Pin",
        score: "Pin 2:34"
      }
    ],
    total: 25,
    page: 1,
    page_size: 20
  }
};