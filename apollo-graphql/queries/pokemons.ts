import { gql } from "@apollo/client"

export const POKEMONS_QUERY = gql`
  query Pokemons {
    pokemon_v2_pokemon(limit: 40) {
      height
      base_experience
      name
      id
      weight
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
          id
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`
