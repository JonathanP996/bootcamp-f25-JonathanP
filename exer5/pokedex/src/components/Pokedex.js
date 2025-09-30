import React, { useState } from 'react';
import './Pokedex.css';

const Pokedex = () => {
  const [activeTab, setActiveTab] = useState('moves');

  return (
    <div className="pokedex-container">
      <h1>Exercise 5 - PokeDex!</h1>
      
      <div className="pokedex-content">
        {/* Left Side - Pokemon Display */}
        <div className="pokemon-display">
          <div className="pokemon-image-container">
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" 
              alt="ditto"
              className="pokemon-image"
            />
          </div>
          
          <div className="pokemon-name">
            ditto
          </div>
          
          <div className="pokemon-types">
            <span className="types-label">Types:</span>
            <span className="type-badge normal">
              normal
            </span>
          </div>
          
          <div className="navigation-buttons">
            <button className="nav-button">
              &lt;
            </button>
            <button className="nav-button">
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
                <div className="move-item">transform</div>
              </div>
            ) : (
              <div className="info-content">
                <div className="stat-item">
                  <span className="stat-label">height:</span>
                  <span className="stat-value">0.3m</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">weight:</span>
                  <span className="stat-value">4.0kg</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">hp:</span>
                  <span className="stat-value">48</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">attack:</span>
                  <span className="stat-value">48</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">defense:</span>
                  <span className="stat-value">48</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">special-attack:</span>
                  <span className="stat-value">48</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">special-defense:</span>
                  <span className="stat-value">48</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">speed:</span>
                  <span className="stat-value">48</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
