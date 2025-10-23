import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const pokemonName = name.toLowerCase();
    
    // Get Pokemon data first
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
    
    if (!pokemonResponse.ok) {
      return NextResponse.json({ error: 'Pokemon not found' }, { status: 400 });
    }
    
    const pokemonData = await pokemonResponse.json();
    
    // Get species data
    const speciesResponse = await fetch(pokemonData.species.url);
    
    if (!speciesResponse.ok) {
      return NextResponse.json({ error: 'Species data not found' }, { status: 400 });
    }
    
    const speciesData = await speciesResponse.json();
    
    // Get evolution chain
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    
    if (!evolutionResponse.ok) {
      return NextResponse.json({ error: 'Evolution chain not found' }, { status: 400 });
    }
    
    const evolutionData = await evolutionResponse.json();
    
    // Simple evolution logic - find next evolution
    const findNextEvolution = (chain: any, targetName: string): string => {
      if (chain.species.name === targetName) {
        if (chain.evolves_to && chain.evolves_to.length > 0) {
          return chain.evolves_to[0].species.name;
        }
        return chain.species.name; // Fully evolved
      }
      
      for (const evolution of chain.evolves_to || []) {
        const result = findNextEvolution(evolution, targetName);
        if (result) return result;
      }
      
      return targetName; // Fallback
    };
    
    const nextEvolutionName = findNextEvolution(evolutionData.chain, pokemonName);
    
    // Get the next evolution Pokemon data
    const nextEvolutionResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${nextEvolutionName}/`);
    
    if (!nextEvolutionResponse.ok) {
      return NextResponse.json({ error: 'Next evolution not found' }, { status: 400 });
    }
    
    const nextEvolutionData = await nextEvolutionResponse.json();
    
    const result = {
      name: nextEvolutionData.name,
      sprite: nextEvolutionData.sprites.front_default,
      types: nextEvolutionData.types.map((type: any) => type.type.name)
    };
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Evolution endpoint error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
