import React, { useState, useEffect } from 'react';
import PokemonCard from '../component/PokemonCard'; // Importamos el componente PokemonCard
import '../css/app.css'; // Importamos los estilos globales

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRandomPokemons();
  }, []);

  // Función para obtener 6 Pokémon aleatorios
  const fetchRandomPokemons = async () => {
    const randomIds = Array.from({ length: 6 }, () => Math.floor(Math.random() * 898) + 1);
    setLoading(true);
    setError(null);

    try {
      const pokemonPromises = randomIds.map(id =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
      );
      const pokemons = await Promise.all(pokemonPromises);
      setPokemonList(pokemons);
    } catch (error) {
      setError('Error fetching Pokémon data');
    } finally {
      setLoading(false);
    }
  };

  // Función para buscar Pokémon por nombre
  const fetchPokemonByName = async (name) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemonList([data]);
    } catch (error) {
      setError('Pokémon not found');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchPokemonByName(query.toLowerCase());
    } else {
      fetchRandomPokemons();
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Pokémon Explorer</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a Pokémon"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      {loading ? (
        <p className="loading">Loading Pokémon...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="pokemon-grid">
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
