import { useFetch } from "./hooks/useFetch";
import type { PokemonListResponse } from "./types/pokemon";
import { PokemonCard } from "./components/PokemonCard";

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
        <div>
          {data.results.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
