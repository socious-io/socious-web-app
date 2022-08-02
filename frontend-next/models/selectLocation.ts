export interface GoogleLocation {
  results: Array<{
    formatted_address?: string;
    place_id?: string;
    plus_code?: {
      compound_code?: string;
      global_code?: string;
    };
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
}
