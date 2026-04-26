import { useFetch } from "./hooks/useFetch";
import type { PokemonListResponse } from "./types/pokemon";
import { PokemonCard } from "./components/PokemonCard";
import { useState } from "react";

function App() {
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const { data, loading, error } = useFetch<PokemonListResponse>(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`,
  );

  const filtered =
    data?.results.filter((pokemon) =>
      pokemon.name.includes(search.toLowerCase()),
    ) ?? [];

  return (
    <div>
      <h1>Pokédex</h1>
      <input
        type="text"
        placeholder="Поиск покемона..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}
      {
        <div className="grid">
          {filtered.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
          ))}
        </div>
      }

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
