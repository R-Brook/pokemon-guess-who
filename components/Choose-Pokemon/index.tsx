import { pokemonsData } from "@/types/pokemons"
import { useState } from "react"
import { Button } from "../Button"
import { Select } from "../Select"

export interface ChoosePokemonProps {
  pokemons_data: pokemonsData[]
}

export const ChoosePokemon = ({ pokemons_data }: ChoosePokemonProps) => {
  const [chosenPokemon, setChosenPokemon] = useState<string>("")
  const [gameIsReady, setGameIsReady] = useState<boolean>(false)

  const getPokemonNames = (): string[] => {
    const namesToChooseFrom: string[] = ["Please select a Pokemon"]

    pokemons_data.map((item: pokemonsData) => namesToChooseFrom.push(item.name))

    return namesToChooseFrom
  }

  return (
    <>
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
      <div>
        <span className="w-full">Chosen pokemon: {chosenPokemon}</span>
      </div>
    </>
  )
}
