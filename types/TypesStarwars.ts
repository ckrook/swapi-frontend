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
  created: string;
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
