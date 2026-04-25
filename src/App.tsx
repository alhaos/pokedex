import { useFetch } from "./hooks/useFetch";
import type { PokemonListResponse } from "./types/pokemon";

function App() {
  const { data, loading, error } = useFetch<PokemonListResponse>(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
  );

  return (
    <div>
      <h1>Pokédex</h1>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}
      {data && (
        <ul>
          {data.results.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
