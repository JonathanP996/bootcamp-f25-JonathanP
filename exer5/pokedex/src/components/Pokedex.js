import React, { useState, useEffect } from 'react';
import './Pokedex.css';

const Pokedex = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);
  const [activeTab, setActiveTab] = useState('moves');
  const [loading, setLoading] = useState(true);

  const fetchPokemon = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(pokemonId);
  }, [pokemonId]);

  const handlePrevious = () => {
    if (pokemonId > 1) {
      setPokemonId(pokemonId - 1);
    }
  };

  const handleNext = () => {
    setPokemonId(pokemonId + 1);
  };

  const getTypeColor = (typeName) => {
    const typeColors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    return typeColors[typeName] || '#A8A878';
  };

  if (loading) {
    return <div className="pokedex-container">Loading...</div>;
  }

  if (!pokemon) {
    return <div className="pokedex-container">Pokemon not found</div>;
  }

  return (
    <div className="pokedex-container">
      <h1>Exercise 5 - PokeDex!</h1>
      
      <div className="pokedex-content">
        {/* Left Side - Pokemon Display */}
        <div className="pokemon-display">
          <div className="pokemon-image-container">
            <img 
              src={pokemon.sprites.front_default} 
              alt={pokemon.name}
              className="pokemon-image"
            />
          </div>
          
          <div className="pokemon-name">
            {pokemon.name}
          </div>
          
          <div className="pokemon-types">
            <span className="types-label">Types:</span>
            {pokemon.types.map((type, index) => (
              <span 
                key={index}
                className="type-badge"
                style={{ backgroundColor: getTypeColor(type.type.name) }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
          
          <div className="navigation-buttons">
            <button 
              className="nav-button"
              onClick={handlePrevious}
              disabled={pokemonId <= 1}
            >
              &lt;
            </button>
            <button 
              className="nav-button"
              onClick={handleNext}
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Right Side - Stats Panel */}
        <div className="stats-panel">
          <div className="tab-buttons">
            <button 
              className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              Info
            </button>
            <button 
              className={`tab-button ${activeTab === 'moves' ? 'active' : ''}`}
              onClick={() => setActiveTab('moves')}
            >
              Moves
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'moves' ? (
              <div className="moves-content">
                {pokemon.moves.slice(0, 20).map((move, index) => (
                  <div key={index} className="move-item">
                    {move.move.name}
                  </div>
                ))}
              </div>
            ) : (
              <div className="info-content">
                <div className="stat-item">
                  <span className="stat-label">height:</span>
                  <span className="stat-value">{(pokemon.height / 10).toFixed(1)}m</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">weight:</span>
                  <span className="stat-value">{(pokemon.weight / 10).toFixed(1)}kg</span>
                </div>
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <span className="stat-label">{stat.stat.name}:</span>
                    <span className="stat-value">{stat.base_stat}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
