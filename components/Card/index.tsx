import React, { FC, useState } from "react"
import Image from "next/image"
import { IPokemonTypes } from "@/types/pokemons"
import { typeColours } from "@/data/type-colours"
import { hectogramsToPounds } from "@/utilities/data-conversion"

export interface ICard {
  name: string
  id: number
  image: string
  hp: number
  height: number
  weight: number
  type: IPokemonTypes[]
}

export const Card: FC<ICard> = ({
  name,
  id,
  image,
  hp,
  height,
  weight,
  type,
}) => {
  const [cardInPlay, setCardInPlay] = useState<boolean>(true)

  const getBackgroundColours = (): string => {
    const backgroundColour =
      (Object.keys(typeColours).find(
        (typeName) => typeName === type[0].pokemon_v2_type.name
      ) as keyof typeof typeColours) ?? ""

    return typeColours[backgroundColour]
  }

  return (
    <button
      style={{ backgroundColor: getBackgroundColours() }}
      onClick={() => setCardInPlay(!cardInPlay)}
    >
      {/* Card front */}
      {cardInPlay && (
        <div className="p-2 border-8 border-black/15">
          <div className="flex justify-end font-semibold gap-2 mb-3">
            <h2 className="block mr-auto text-xl">{name}</h2>
            <div className="text-lg">
              <span className="text-xs">HP</span>
              {hp}
            </div>
            <Image
              className="rounded-full outline-2 outline-black/15 outline"
              src={`/images/${type[0].pokemon_v2_type.id}.png`}
              alt={"type icon"}
              width="32"
              height="32"
            />
          </div>

          <div className="bg-black/15">
            <Image
              src={image}
              alt={name}
              width="150"
              height="150"
              className="m-auto"
            />
          </div>

          <ul className="flex bg-slate-200 justify-center gap-2">
            <li>NO. {id}</li>
            <li>HT: {height}</li>
            <li>WT: {hectogramsToPounds(weight).toFixed(1)} lbs</li>
          </ul>

          <ul className="my-2">
            {type.map((foo) => (
              <li
                key={foo.pokemon_v2_type.name}
                className="inline-block m-1 px-2 py-1 bg-black/15 rounded-full"
              >
                {foo.pokemon_v2_type.name.toUpperCase()}
                {/* <Image
                  className="h-auto w-28"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/${foo.pokemon_v2_type.id}.png`}
                  alt={foo.pokemon_v2_type.name}
                  width="114"
                  height="27"
                /> */}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Card back */}
      {!cardInPlay && <div className="h-[306px] bg-black/15"></div>}
    </button>
  )
}
