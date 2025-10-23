import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const randomId = Math.floor(Math.random() * 151) + 1;
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`);
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch Pokemon data' }, { status: 400 });
    }
    
    const pokemonData = await response.json();
    
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
