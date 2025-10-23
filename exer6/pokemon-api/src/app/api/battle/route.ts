import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pokemon1, pokemon2 } = body;
    
    // Validate request body
    if (!pokemon1 || !pokemon2) {
      return NextResponse.json({ error: 'Missing pokemon1 or pokemon2 in request body' }, { status: 400 });
    }
    
    // Fetch data for both Pokemon
    const [pokemon1Response, pokemon2Response] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1.toLowerCase()}/`),
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2.toLowerCase()}/`)
    ]);
    
    if (!pokemon1Response.ok) {
      return NextResponse.json({ error: `Pokemon ${pokemon1} not found` }, { status: 400 });
    }
    
    if (!pokemon2Response.ok) {
      return NextResponse.json({ error: `Pokemon ${pokemon2} not found` }, { status: 400 });
    }
    
    const [pokemon1Data, pokemon2Data] = await Promise.all([
      pokemon1Response.json(),
      pokemon2Response.json()
    ]);
    
    // Calculate total base stats for each Pokemon
    const pokemon1Stats = pokemon1Data.stats.reduce((total: number, stat: any) => total + stat.base_stat, 0);
    const pokemon2Stats = pokemon2Data.stats.reduce((total: number, stat: any) => total + stat.base_stat, 0);
    
    // Determine winner based on higher total stats
    let winner;
    if (pokemon1Stats > pokemon2Stats) {
      winner = {
        name: pokemon1Data.name,
        sprite: pokemon1Data.sprites.front_default,
        types: pokemon1Data.types.map((type: any) => type.type.name),
        totalStats: pokemon1Stats
      };
    } else if (pokemon2Stats > pokemon1Stats) {
      winner = {
        name: pokemon2Data.name,
        sprite: pokemon2Data.sprites.front_default,
        types: pokemon2Data.types.map((type: any) => type.type.name),
        totalStats: pokemon2Stats
      };
    } else {
      // Tie - return both Pokemon
      winner = {
        tie: true,
        pokemon1: {
          name: pokemon1Data.name,
          sprite: pokemon1Data.sprites.front_default,
          types: pokemon1Data.types.map((type: any) => type.type.name),
          totalStats: pokemon1Stats
        },
        pokemon2: {
          name: pokemon2Data.name,
          sprite: pokemon2Data.sprites.front_default,
          types: pokemon2Data.types.map((type: any) => type.type.name),
          totalStats: pokemon2Stats
        }
      };
    }
    
    return NextResponse.json(winner, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
