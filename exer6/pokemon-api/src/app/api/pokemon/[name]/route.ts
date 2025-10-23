import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const pokemonName = params.name.toLowerCase();
    
    // Fetch Pokemon data from PokeAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Pokemon not found' }, { status: 400 });
    }
    
    const pokemonData = await response.json();
    
    // Extract name, sprite, and types
    const result = {
      name: pokemonData.name,
      sprite: pokemonData.sprites.front_default,
      types: pokemonData.types.map((type: any) => type.type.name)
    };
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
