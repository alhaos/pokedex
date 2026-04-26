import { useFetch } from "./hooks/useFetch";
import type { PokemonListResponse } from "./types/pokemon";
import { PokemonCard } from "./components/PokemonCard";
import { useState } from "react";
import { PokemonModal } from "./components/PokemonModal";

function App() {
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const { data, loading, error } = useFetch<PokemonListResponse>(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`,
  );

  const filtered =
    data?.results.filter((pokemon) =>
      pokemon.name.includes(search.toLowerCase()),
    ) ?? [];

  return (
    <div className="app">
      <header className="header">
        <h1>Pokédex</h1>
        <input
          type="text"
          placeholder="Поиск покемона..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <main>
        {loading && <p>Загрузка...</p>}
        {error && <p>Ошибка: {error}</p>}
        <div className="grid">
          {filtered.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              onClick={setSelected}
            />
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={() => setOffset(offset - 20)}
            disabled={offset === 0}
          >
            ← Назад
          </button>
          <span>{offset / 20 + 1}</span>
          <button onClick={() => setOffset(offset + 20)} disabled={!data?.next}>
            Вперёд →
          </button>
        </div>
      </main>

      {selected && (
        <PokemonModal name={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

export default App;
