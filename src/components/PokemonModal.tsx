import { useFetch } from "../hooks/useFetch";
import type { Pokemon } from "../types/pokemon";

interface PokemonModalProps {
  name: string;
  onClose: () => void;
}

export function PokemonModal({ name, onClose }: PokemonModalProps) {
  const {
    data: pokemon,
    loading,
    error,
  } = useFetch<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Закрыть</button>
        {loading && <p>Загрузка...</p>}
        {error && <p>Ошибка: {error}</p>}
        {pokemon && (
          <div>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
            />
            <h2>{pokemon.name}</h2>
            <p>Рост: {pokemon.height / 10} м</p>
            <p>Вес: {pokemon.weight / 10} кг</p>
          </div>
        )}
      </div>
    </div>
  );
}
