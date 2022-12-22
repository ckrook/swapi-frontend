import { useEffect, useState } from "react";
import { fetchData } from "../../hooks/fetchData";
import { useRouter } from "next/router";
import { StarwarsCharacter, StarwarsFilms, StarWarsPlanet } from "../../types/TypesStarwars";
import Page from "../../components/Page";
import Link from "next/link";

function Detail() {
  const router = useRouter();
  const { id } = router.query;

  const [character, setCharacter] = useState<StarwarsCharacter>();
  const [films, setFilms] = useState<StarwarsFilms[]>([]);
  const [homeworld, setHomeworld] = useState<StarWarsPlanet>();

  useEffect(() => {
    if (!id) return;
    const fetchDataFromAPI = async () => {
      const data = await fetchData<StarwarsCharacter>(`https://swapi.dev/api/people/${id}`);
      setCharacter(data);

      const films = await Promise.all(
        data.films.map(async (film) => {
          const filmData = await fetchData<StarwarsFilms>(film);
          return filmData;
        })
      );
      const homeworld = await fetchData<StarWarsPlanet>(data.homeworld);

      setFilms(films);
      setHomeworld(homeworld);
    };
    fetchDataFromAPI();
  }, [id]);

  if (!character) {
    return (
      <Page>
        <h1>Loading...</h1>
      </Page>
    );
  }

  return (
    <Page>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Character: {character.name}</h1>
        <Link href="/">
          <span className="underline">Go back</span>
        </Link>
      </div>
      <div className="bg-blue-50 grid grid-cols-2 gap-2 border p-5 rounded-md border-blue-200 mb-4">
        <p>Birth year: {character.birth_year}</p>
        <p>Eye Color: {character.eye_color}</p>
        <p>Height: {character.height}</p>
        <p>Mass: {character.mass}</p>
        <p>Gender: {character.gender}</p>
        <p>Skin Color: {character.skin_color}</p>
      </div>
      <div className="border rounded-md p-5">
        <h2 className="text-xl mb-2">Films:</h2>
        <div className="flex gap-4">
          {films.map((film) => (
            <Link href={`/film/${film.episode_id.toString()}`} key={film.episode_id}>
              <div className="border p-4 mb-2 rounded-md hover:bg-green-50 cursor-pointer">
                <p>{film.title}</p>
                <p>{film.director}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {character.species.map((specie) => (
        <p>{specie}</p>
      ))}
      {character.starships.map((starship) => (
        <p>{starship}</p>
      ))}
      {character.vehicles.map((vehicle) => (
        <p>{vehicle}</p>
      ))}
      <div className="border p-4 rounded-md">
        {homeworld && (
          <div>
            <p>{homeworld.name}</p>
            <p>{homeworld.population}</p>
            <p>{homeworld.gravity} </p>
            <p>{homeworld.population} </p>
            <p>{homeworld.terrain} </p>
          </div>
        )}
      </div>
    </Page>
  );
}

export default Detail;
