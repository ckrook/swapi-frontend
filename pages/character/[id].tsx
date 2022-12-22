import Link from "next/link";

// Hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchData } from "../../hooks/fetchData";

// Components
import Page from "../../components/Page";
import { Film } from "../../components/Film";

// Types
import { StarwarsCharacter, StarwarsFilms, StarWarsPlanet, StarWarsStarship, StarWarsVehicle } from "../../types/TypesStarwars";
import { Planet } from "../../components/Planet";

function Detail() {
  const router = useRouter();
  const { id } = router.query;

  const [character, setCharacter] = useState<StarwarsCharacter>();
  const [films, setFilms] = useState<StarwarsFilms[]>([]);
  const [homeworld, setHomeworld] = useState<StarWarsPlanet>();
  const [starships, setStarships] = useState<StarWarsStarship[]>([]);
  const [vehicles, setVehicles] = useState<StarWarsVehicle[]>([]);

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

      const starships = await Promise.all(
        data.starships.map(async (film) => {
          const starshipData = await fetchData<StarWarsStarship>(film);
          return starshipData;
        })
      );
      const vehicle = await Promise.all(
        data.starships.map(async (film) => {
          const vehicleData = await fetchData<StarWarsVehicle>(film);
          return vehicleData;
        })
      );

      const homeworld = await fetchData<StarWarsPlanet>(data.homeworld);

      setVehicles(vehicle);
      setStarships(starships);
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
      <section className="gap-5 mb-4">
        <Link href="/">
          <span className="underline text-xl">← Go back</span>
        </Link>
        <h1 className="text-3xl w-96">Character: {character.name}</h1>
      </section>

      <section>
        <h3>Personal details:</h3>
        <div className="col-span-2 gap-2 mb-4">
          <ul>
            <li>Birth year: {character.birth_year}</li>
            <li>Eye Color: {character.eye_color}</li>
            <li>Height: {character.height}</li>
            <li>Mass: {character.mass}</li>
            <li>Gender: {character.gender}</li>
            <li>Skin Color: {character.skin_color}</li>
          </ul>
        </div>
      </section>

      {/* Films */}
      <section>
        <h3>Films:</h3>
        <div className="flex flex-col gap-4 col-span-2">
          {films.map((film) => (
            <Film data={film} />
          ))}
        </div>
      </section>

      <section>
        <h3>Planet:</h3>
        <div className=" col-span-2 border p-4 rounded-md bg-white">{homeworld && <Planet data={homeworld} />}</div>
      </section>

      <section>
        {starships.length != 0 && <h3>Starships:</h3>}
        {starships &&
          starships.map((starship) => (
            <div className="border p-4 rounded-md bg-white">
              <h4>{starship.name}</h4>
              <p>{starship.model}</p>
            </div>
          ))}
      </section>

      <section>
        {vehicles.length != 0 && <h3>Vehicles:</h3>}
        {vehicles.map((vehicle) => (
          <div className="border rounded-md p-4 ">
            <h4>{vehicle.name}</h4>
            <p>cargo_capacity {vehicle.cargo_capacity}</p>
            <p> manufacturer {vehicle.manufacturer}</p>
            <p>cost_in_credits {vehicle.cost_in_credits}</p>
          </div>
        ))}
      </section>
    </Page>
  );
}

export default Detail;
