export interface SwapiResponse {
  results: StarwarsCharacter[];
}

export interface StarwarsCharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  url: string;
}
