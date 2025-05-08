import { useState } from "react"
import Image from "next/image"
import { Button } from "../Button"
import { pokemonsData, pokenmonTypes } from "@/types/pokemons"

export interface ChoosePokemonProps {
  pokemons_data: pokemonsData[]
}

export interface ChosenPokemonDataSummaryProps {
  name: string
  id: number
  image: string
  hp: number
  height: number
  weight: number
  type: string[]
}

export const ChoosePokemon = ({ pokemons_data }: ChoosePokemonProps) => {
  const chosenPokemonDataSummary: ChosenPokemonDataSummaryProps = {
    name: "",
    id: 0,
    image: "",
    hp: 0,
    height: 0,
    weight: 0,
    type: [],
  }

  const [chosenPokemon, setChosenPokemon] =
    useState<ChosenPokemonDataSummaryProps>(chosenPokemonDataSummary)
  const [gameIsReady, setGameIsReady] = useState<boolean>(false)

  const listTypes = (types: pokenmonTypes[]): string[] => {
    const typesArray: string[] = []
    types.map((type) => {
      typesArray.push(type.pokemon_v2_type.name)
    })
    return typesArray
  }

  return (
    <>
      {!gameIsReady && (
        <>
          <h2 className="text-2xl">Choose your Pokemon:</h2>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-1">
            {pokemons_data.map((item: pokemonsData) => (
              <button
                key={item.id}
                className="transition duration-100 bg-slate-300 hover:bg-amber-200 focus:bg-amber-300 flex flex-col justify-center items-center relative p-2 pb-6"
                onClick={() =>
                  setChosenPokemon({
                    ...chosenPokemon,
                    name: item.name,
                    id: item.id,
                    image:
                      item.pokemon_v2_pokemonsprites[0].sprites.other[
                        `official-artwork`
                      ].front_default,
                    hp: item.pokemon_v2_pokemonstats[0].base_stat,
                    height: item.height,
                    weight: item.weight,
                    type: listTypes(item.pokemon_v2_pokemontypes),
                  })
                }
              >
                <div>
                  <Image
                    className=""
                    src={
                      item.pokemon_v2_pokemonsprites[0].sprites.other[
                        `showdown`
                      ].front_default
                    }
                    alt={"type icon"}
                    width={0}
                    height={0}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
                <span className="absolute bottom-1 mt-1">{item.name}</span>
              </button>
            ))}
          </div>

          <Button full_width onClick={() => setGameIsReady(true)}>
            Start
          </Button>
        </>
      )}
      {gameIsReady && (
        <div>
          <span className="w-full">Chosen pokemon: {chosenPokemon.name}</span>
        </div>
      )}
    </>
  )
}
