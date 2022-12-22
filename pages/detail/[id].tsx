import { useEffect, useState } from "react";
import { fetchData } from "../../hooks/fetchData";
import { useRouter } from "next/router";
import { StarwarsCharacter } from "../../types/TypesStarwars";

function Detail() {
  const router = useRouter();
  const { id } = router.query;

  const [character, setCharacter] = useState<StarwarsCharacter>();

  useEffect(() => {
    if (!id) return;
    const fetchDataFromAPI = async () => {
      const data = await fetchData<StarwarsCharacter>(`https://swapi.dev/api/people/${id}`);

      setCharacter(data);
    };

    fetchDataFromAPI();
  }, [id]);

  console.log(character);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
    </div>
  );
}

export default Detail;
