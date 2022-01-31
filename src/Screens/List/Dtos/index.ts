export interface IPokemonData {
  id: number,
  name: string,
  types: Array< { type: { name: string } } >,
  weight: number,
  sprites: {
    other: {
      home: {
        front_default: string
      },
      'official-artwork': {
        front_default: string
      }
    }
  }
}

export interface IRequestPokemonsOffset {
  count: number,
  next: string | null,
  previous: string | null,
  results: Array<{
    name: string,
    url: string
  }>
}