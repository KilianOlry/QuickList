import Banner from "../components/homepage/Banner.tsx";
import {useEffect, useState} from "react";
import {getList} from "../utils/endpoint.ts";

const Homepage = () => {


  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getPokemonsByGeneration() {
    return fetch(getList)
      .then((res) => res.json())
      .then((data) => data);
  }

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemonsByGeneration();
        setPokemons(data);
      } catch (error) {
        console.log(error);
        setError("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);


  return (

    <>
      {console.log(pokemons)}
    <Banner />
    </>
  )
}

export default Homepage