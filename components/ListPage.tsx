import { useEffect, useState } from "react";
import { fetchData } from "../hooks/fetchData";
import Link from "next/link";
import { StarwarsCharacter, SwapiResponse } from "../types/TypesStarwars";

export function ListPage() {
  const [characters, setCharacters] = useState<StarwarsCharacter[]>([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const data = await fetchData<SwapiResponse>("https://swapi.dev/api/people/");
      console.log(data.results as StarwarsCharacter[]);

      setCharacters(data.results as StarwarsCharacter[]);
    };

    fetchDataFromAPI();
  }, []);
  console.log(characters);

  return (
    <div>
      {characters?.map((character) => (
        <div key={character.name} className="py-3 border-b px-5 ">
          <Link href="/character?id={p.id}" as={`/detail/${character.url.slice(-2)}`}>
            {character.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
