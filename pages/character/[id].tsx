import Link from "next/link";

// Hooks
import { useRouter } from "next/router";
import { fetchData } from "../../hooks/fetchData";

// Components
import Page from "../../components/Page";
import { Film } from "../../components/Film";

// Types
import { NextPage } from "next";
import { StarwarsCharacter, StarwarsFilms, StarWarsPlanet, StarWarsStarship, StarWarsVehicle } from "../../types/TypesStarwars";
import { Planet } from "../../components/Planet";
import { getLastNumber } from "../../lib/helpers";

interface Props {
  character: StarwarsCharacter;
  films: StarwarsFilms[];
  starships: StarWarsStarship[];
  vehicles: StarWarsVehicle[];
  homeworld: StarWarsPlanet;
}

const Detail: NextPage<Props> = ({ character, films, starships, vehicles, homeworld }) => {
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
            <Film key={film.episode_id} data={film} />
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
            <div key={starship.name} className="border p-4 rounded-md bg-white">
              <h4>{starship.name}</h4>
              <p>{starship.model}</p>
            </div>
          ))}
      </section>

      <section>
        {vehicles.length != 0 && <h3>Vehicles:</h3>}
        {vehicles.map((vehicle) => (
          <div key={vehicle.name} className="border rounded-md p-4 ">
            <h4>{vehicle.name}</h4>
            <p>cargo_capacity {vehicle.cargo_capacity}</p>
            <p> manufacturer {vehicle.manufacturer}</p>
            <p>cost_in_credits {vehicle.cost_in_credits}</p>
          </div>
        ))}
      </section>
    </Page>
  );
};

export async function getStaticPaths() {
  // Get the list of post IDs from the API
  const res = await fetch("https://swapi.dev/api/people/");
  const characters = await res.json();

  // Generate a list of paths for the pre-rendered pages
  const paths = characters.results.map((character: StarwarsCharacter) => ({
    params: { id: getLastNumber(character.url) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(paths: any) {
  const character = await fetchData<StarwarsCharacter>(`https://swapi.dev/api/people/${paths.params.id}`);

  // Get all the films
  const films = await Promise.all(
    character.films.map(async (film) => {
      const filmData = await fetchData<StarwarsFilms>(film);
      return filmData;
    })
  );

  // Get all the starships
  const starships = await Promise.all(
    character.starships.map(async (film) => {
      const starshipData = await fetchData<StarWarsStarship>(film);
      return starshipData;
    })
  );

  // Get all the vehicles
  const vehicles = await Promise.all(
    character.starships.map(async (film) => {
      const vehicleData = await fetchData<StarWarsVehicle>(film);
      return vehicleData;
    })
  );

  const homeworld = await fetchData<StarWarsPlanet>(character.homeworld);

  return {
    props: {
      character,
      films,
      starships,
      vehicles,
      homeworld,
    },
  };
}

export default Detail;
