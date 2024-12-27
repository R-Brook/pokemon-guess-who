import { useEffect, useState } from "react"
import { POKEMONS_QUERY } from "@/apollo-graphql/queries/pokemons"
import client from "@/apollo-graphql/apollo-client"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card/index"
import ChatPage from "@/components/Chat"
import { Select } from "@/components/Select"
import { pokemonsData, PokemonsProps } from "@/types/pokemons"
import { shuffleArray } from "@/utilities/shuffle"

export default function Home({ pokemonsData }: PokemonsProps) {
  const [chosenPokemon, setChosenPokemon] = useState<string>("")
  const [gameIsReady, setGameIsReady] = useState<boolean>(false)
  const [pokemonCards, setPokemonCards] = useState<pokemonsData[]>(pokemonsData)
  const [pokemonCardsReady, setPokemonCardsReady] = useState<boolean>(false)

  useEffect(() => {
    setPokemonCards(shuffleArray(pokemonsData))
    setPokemonCardsReady(true)
    console.log(pokemonCards)
  }, [])

  const getPokemonNames = (): string[] => {
    const namesToChooseFrom: string[] = ["Please select a Pokemon"]

    pokemonsData.map((item: pokemonsData) => namesToChooseFrom.push(item.name))

    return namesToChooseFrom
  }

  return (
    <div className="w-full max-w-[1200px] m-auto">
      <h1 className="text-5xl">Pokemon Guess Who</h1>

      {/* Log in and chat section  */}
      <ChatPage />

      {/* Choose your pokemon section */}
      {!gameIsReady && (
        <div className="flex flex-wrap gap-2 border-2 border-blue my-4">
          <Select
            required={true}
            label={"Choose your pokemon"}
            name={"pokemon-select"}
            id={"player-pokemon"}
            value={chosenPokemon}
            options={getPokemonNames()}
            onChange={(event) => setChosenPokemon(event.target.value)}
          />
          <Button onClick={() => setGameIsReady(true)}>Start</Button>
        </div>
      )}
      {gameIsReady && (
        <span className="w-full">Chosen pokemon: {chosenPokemon}</span>
      )}

      {/* Pokemon to guess from section */}
      <section>
        <h2 className="text-2xl">Remaining Pokemon to guess from</h2>

        {pokemonCardsReady && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pb-16">
            {pokemonCards.map((item: pokemonsData) => (
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
