export interface SwapiResponse {
  results: StarwarsCharacter[];
}

export interface StarwarsCharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  url: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  homeworld: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  skin_color: string;
}

export interface StarwarsFilms {
  title: string;
  director: string;
  release_date: string;
  episode_id: number;
}
export interface StarWarsPlanet {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
}

export interface StarWarsStarship {
  name: string;
  cargo_capacity: string;
  consumables: string;
  length: string;
  manufacturer: string;
  model: string;
}

export interface StarWarsVehicle {
  name: string;
  cargo_capacity: string;
  consumables: string;
  length: string;
  manufacturer: string;
  model: string;
  vehicle_class: string;
  passengers: string;
  max_atmosphering_speed: string;
  crew: string;
  cost_in_credits: string;
  films: string[];
}
