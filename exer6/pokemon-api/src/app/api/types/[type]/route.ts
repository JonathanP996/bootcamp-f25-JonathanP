import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const typeName = params.type.toLowerCase();
    
    const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${typeName}/`);
    
    if (!typeResponse.ok) {
      return NextResponse.json({ error: 'Type not found' }, { status: 400 });
    }
    
    const typeData = await typeResponse.json();
    
    const pokemonNames = typeData.pokemon.map((pokemon: any) => pokemon.pokemon.name);
    
    const pokemonDetails = await Promise.all(
      pokemonNames.slice(0, 20).map(async (name: string) => {
        try {
          const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
          if (!pokemonResponse.ok) return null;
          
          const pokemonData = await pokemonResponse.json();
          return {
            name: pokemonData.name,
            sprite: pokemonData.sprites.front_default,
            types: pokemonData.types.map((type: any) => type.type.name)
          };
        } catch (error) {
          return null;
        }
      })
    );
    
    const validPokemon = pokemonDetails.filter(pokemon => pokemon !== null);
    
    return NextResponse.json(validPokemon, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
