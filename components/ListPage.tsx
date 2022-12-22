import { useEffect, useState } from "react";
import { fetchData } from "../hooks/fetchData";
import Link from "next/link";
import { StarwarsCharacter, SwapiResponse } from "../types/TypesStarwars";

export function ListPage() {
  const [characters, setCharacters] = useState<StarwarsCharacter[]>([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const data = await fetchData<SwapiResponse>("https://swapi.dev/api/people/");
      setCharacters(data.results as StarwarsCharacter[]);
    };

    fetchDataFromAPI();
  }, []);

  return (
    <div>
      {characters?.map((character) => (
        <Link key={character.name} href="/character?id={p.id}" as={`/character/${character.url.slice(-2)}`}>
          <div key={character.name} className="flex justify-between py-3 border m-4 rounded-md  p-5 cursor-pointe hover:bg-blue-50">
            <p>{character.name}</p>
            <div>→</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
