import React from "react";

interface Props {
  data: StarwarsPlanet;
}

interface StarwarsPlanet {
  name: string;
  population: string;
  gravity: string;
  terrain: string;
}

export const Planet: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <h4 className="font-semibold">{data.name}</h4>
      <p>Population: {data.population}</p>
      <p>Gravity: {data.gravity} </p>
      <p>Terrain: {data.terrain} </p>
    </div>
  );
};
