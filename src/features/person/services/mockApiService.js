/**
 * Mock data service for testing person profile components
 */

export const mockPersonProfile = {
  person_id: "123e4567-e89b-12d3-a456-426614174000",
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
      role_id: "456e7890-e89b-12d3-a456-426614174001",
      role_type: "wrestler"
    }
  ]
};

export const mockWrestlerStats = {
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
      wins: 20,
      placement: 1
    }
  ]
};

export const mockWrestlerMatches = {
  matches: [
    {
      year: 2023,
      weight_class: "86kg",
      round: "Final",
      round_order: 1,
      wrestler_name: "David Taylor",
      wrestler_person_id: "123e4567-e89b-12d3-a456-426614174000",
      wrestler_school_name: "Penn State",
      is_winner: true,
      opponent_name: "John Smith",
      opponent_person_id: "234e5678-e89b-12d3-a456-426614174002",
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
      wrestler_person_id: "123e4567-e89b-12d3-a456-426614174000",
      wrestler_school_name: "Penn State",
      is_winner: true,
      opponent_name: "Mike Johnson",
      opponent_person_id: "345e6789-e89b-12d3-a456-426614174003",
      opponent_slug: "mike-johnson",
      opponent_school_name: "Oklahoma State",
      result_type: "Technical Fall",
      score: "15-0"
    },
    {
      year: 2023,
      weight_class: "86kg",
      round: "Quarterfinal",
      round_order: 3,
      wrestler_name: "David Taylor",
      wrestler_person_id: "123e4567-e89b-12d3-a456-426614174000",
      wrestler_school_name: "Penn State",
      is_winner: true,
      opponent_name: "Alex Brown",
      opponent_person_id: "456e7890-e89b-12d3-a456-426614174004",
      opponent_slug: "alex-brown",
      opponent_school_name: "Wisconsin",
      result_type: "Pin",
      score: "Pin"
    },
    {
      year: 2022,
      weight_class: "86kg",
      round: "Final",
      round_order: 1,
      wrestler_name: "David Taylor",
      wrestler_person_id: "123e4567-e89b-12d3-a456-426614174000",
      wrestler_school_name: "Penn State",
      is_winner: false,
      opponent_name: "Carter Wilson",
      opponent_person_id: "567e8901-e89b-12d3-a456-426614174005",
      opponent_slug: "carter-wilson",
      opponent_school_name: "Minnesota",
      result_type: "Decision",
      score: "3-4"
    }
  ],
  total: 25,
  page: 1,
  page_size: 20
};

/**
 * Mock API service for testing
 */
export const mockApiService = {
  async get(endpoint) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Handle search endpoints
    if (endpoint.includes('/search/')) {
      return {
        results: [
          {
            person_id: "123e4567-e89b-12d3-a456-426614174000",
            slug: "david-taylor",
            first_name: "David",
            last_name: "Taylor",
            search_name: "David Taylor",
            result_type: "person",
            roles: ["wrestler"],
            metadata: "Penn State"
          },
          {
            person_id: "456e7890-e89b-12d3-a456-426614174001", 
            slug: "cael-sanderson",
            first_name: "Cael",
            last_name: "Sanderson",
            search_name: "Cael Sanderson",
            result_type: "person",
            roles: ["coach"],
            metadata: "Penn State"
          }
        ],
        total: 2,
        page: 1,
        page_size: 20
      };
    }
    
    if (endpoint.includes('/person/david-taylor/wrestler/stats')) {
      return mockWrestlerStats;
    }
    
    if (endpoint.includes('/person/david-taylor/wrestler/matches')) {
      return mockWrestlerMatches;
    }
    
    if (endpoint.includes('/person/david-taylor')) {
      return mockPersonProfile;
    }
    
    // For other persons, return a generic profile
    const slug = endpoint.split('/').pop();
    return {
      ...mockPersonProfile,
      slug: slug,
      first_name: "Demo",
      last_name: "Person",
      search_name: `Demo Person (${slug})`,
      city_of_origin: "Demo City",
      state_of_origin: "Demo State"
    };
  }
};

export default mockApiService;