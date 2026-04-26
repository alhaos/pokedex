import { useFetch } from "../hooks/useFetch";
import type { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
  name: string;
  onClick: (name: string) => void;
}

export function PokemonCard({ name, onClick }: PokemonCardProps) {
  const {
    data: pokemon,
    loading,
    error,
  } = useFetch<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (loading) {
    return <p>Загрузка...</p>;
  }
  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  if (!pokemon) {
    return null;
  }

  return (
    <div className="card" onClick={() => onClick(name)}>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />
      <h2>{pokemon.name}</h2>
      <div>
        {pokemon.types.map(({ type }) => (
          <span key={type.name}>{type.name}</span>
        ))}
      </div>
    </div>
  );
}
