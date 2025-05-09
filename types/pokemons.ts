export interface IPokemons {
  pokemonsData: IPokemonsData[]
}

export interface IPokemonsDataSummary {
  height: number
  base_experience: number
  name: string
  id: number
  weight: number
}

export interface IPokemonsData extends IPokemonsDataSummary {
  pokemon_v2_pokemonstats: IPokemonStats[]
  pokemon_v2_pokemontypes: IPokemonTypes[]
  pokemon_v2_pokemonsprites: IPokemonSprites[]
}

export interface IPokemonStats {
  base_stat: number
  pokemon_v2_stat: IPokemonStat[]
}

export interface IPokemonStat {
  name: string
}

export interface IPokemonTypes {
  pokemon_v2_type: {
    name: string
    id: number
  }
}

export interface IPokemonSprites {
  sprites: {
    other: {
      "official-artwork": {
        front_default: string
      }
      showdown: {
        front_default: string
      }
    }
  }
}
