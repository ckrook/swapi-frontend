import React from "react";
import { StarwarsFilms } from "../types/TypesStarwars";

interface Props {
  data: StarwarsFilms;
}

export const Film: React.FC<Props> = ({ data }) => {
  return (
    <div key={data.episode_id} className="col-span-1 border p-4  rounded-md cursor-pointer bg-white border-stone-200">
      <h4 className="font-semibold">{data.title}</h4>
      <p>director: {data.director}</p>
      <p>release date: {data.release_date}</p>
    </div>
  );
};
