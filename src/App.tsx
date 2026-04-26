import { useFetch } from "./hooks/useFetch";
import type { PokemonListResponse } from "./types/pokemon";
import { PokemonCard } from "./components/PokemonCard";
import { useState } from "react";

function App() {
  const [offset, setOffset] = useState(0);
  const { data, loading, error } = useFetch<PokemonListResponse>(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`,
  );

  return (
    <div>
      <h1>Pokédex</h1>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}
      {data && (
        <div className="grid">
          {data.results.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
          ))}
        </div>
      )}

      <div>
        <button onClick={() => setOffset(offset - 20)} disabled={offset === 0}>
          Назад
        </button>
        <button onClick={() => setOffset(offset + 20)} disabled={!data?.next}>
          Вперед
        </button>
      </div>
    </div>
  );
}

export default App;
