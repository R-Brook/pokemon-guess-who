import { useEffect, useState } from "react"
import { POKEMONS_QUERY } from "@/apollo-graphql/queries/pokemons"
import client from "@/apollo-graphql/apollo-client"
import { Card } from "@/components/Card/index"
import { ChatPage } from "@/components/Chat"
import { ChoosePokemon } from "@/components/Choose-Pokemon"
import { IPokemonsData, IPokemons } from "@/types/pokemons"
import { shuffleArray } from "@/utilities/shuffle"
// import { useGameStatus } from "@/contexts/game"
// import { usePlayer } from "@/contexts/player"

export default function Home({ pokemonsData }: IPokemons) {
  // const { chosenPokemon } = useGameStatus()
  // const { logged_in, room_id, player_name } = usePlayer()

  const [pokemonCards, setPokemonCards] =
    useState<IPokemonsData[]>(pokemonsData)
  const [pokemonCardsReady, setPokemonCardsReady] = useState<boolean>(false)

  useEffect(() => {
    setPokemonCards(shuffleArray(pokemonsData))
    setPokemonCardsReady(true)
  }, [])

  return (
    <div className="w-full max-w-[1200px] m-auto">
      <h1 className="text-5xl">Pokemon Guess Who</h1>

      {/* Log in and chat section  */}
      <ChatPage />

      {/* Choose your pokemon section */}
      <ChoosePokemon pokemons_data={pokemonsData} />

      {/* Pokemon to guess from section */}
      <section>
        <h2 className="text-2xl">Remaining Pokemon to guess from</h2>

        {pokemonCardsReady && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pb-16">
            {pokemonCards.map((item: IPokemonsData) => (
              <Card
                key={item.name}
                name={item.name}
                id={item.id}
                image={
                  item.pokemon_v2_pokemonsprites[0].sprites.other[
                    `official-artwork`
                  ].front_default
                }
                hp={item.pokemon_v2_pokemonstats[0].base_stat}
                height={item.height}
                weight={item.weight}
                type={item.pokemon_v2_pokemontypes}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export async function getStaticProps() {
  let pokemonsData = {}

  await client
    .query({
      query: POKEMONS_QUERY,
    })
    .then((res) => {
      pokemonsData = res.data.pokemon_v2_pokemon
    })

  return {
    props: {
      pokemonsData,
    },
  }
}
