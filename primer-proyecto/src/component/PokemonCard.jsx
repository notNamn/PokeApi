import React from 'react';
import '../css/pokemon.css'; // Importamos los estilos específicos para las tarjetas de Pokémon

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-img"
      />
      <div className="pokemon-info">
        <h2 className="pokemon-name">{pokemon.name}</h2>
        <p>ID: {pokemon.id}</p>
        <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p>Height: {pokemon.height / 10} m</p>
        <p>Weight: {pokemon.weight / 10} kg</p>
      </div>
    </div>
  );
}

export default PokemonCard;
