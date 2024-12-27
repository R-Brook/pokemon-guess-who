export interface PokemonsProps {
  pokemonsData: pokemonsData[]
}

export interface pokemonsData {
  height: number
  base_experience: number
  name: string
  id: number
  weight: number
  pokemon_v2_pokemonstats: pokemonStats[]
  pokemon_v2_pokemontypes: pokenmonTypes[]
  pokemon_v2_pokemonsprites: pokemonSprites[]
}

export interface pokemonStats {
  base_stat: number
  pokemon_v2_stat: pokemonStat[]
}

export interface pokemonStat {
  name: string
}

export interface pokenmonTypes {
  pokemon_v2_type: {
    name: string
    id: number
  }
}

export interface pokemonSprites {
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
