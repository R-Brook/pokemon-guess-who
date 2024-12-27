import { useState } from "react"
import Image from "next/image"
import { Button } from "../Button"
import { Select } from "../Select"
import { pokemonsData } from "@/types/pokemons"

export interface ChoosePokemonProps {
  pokemons_data: pokemonsData[]
}

export const ChoosePokemon = ({ pokemons_data }: ChoosePokemonProps) => {
  const [chosenPokemon, setChosenPokemon] = useState<string>("")
  const [gameIsReady, setGameIsReady] = useState<boolean>(false)

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
                onClick={() => setChosenPokemon(item.name)}
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
          <span className="w-full">Chosen pokemon: {chosenPokemon}</span>
        </div>
      )}
    </>
  )
}
