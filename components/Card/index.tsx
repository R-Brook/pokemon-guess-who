import React, { FC } from "react"
import Image from "next/image"
import { pokenmonTypes } from "@/types/pokemons"
import { typeColours } from "@/data/type-colours"
import { hectogramsToPounds } from "@/utilities/data-conversion"

export interface CardProps {
  name: string
  id: number
  image: string
  hp: number
  height: number
  weight: number
  type: pokenmonTypes[]
}

export const Card: FC<CardProps> = ({
  name,
  id,
  image,
  hp,
  height,
  weight,
  type,
}) => {
  const getBackgroundColours = (): string => {
    const backgroundColour =
      (Object.keys(typeColours).find(
        (typeName) => typeName === type[0].pokemon_v2_type.name
      ) as keyof typeof typeColours) ?? ""

    return typeColours[backgroundColour]
  }

  return (
    <div
      className="p-2 border-8 border-black/15"
      style={{ backgroundColor: getBackgroundColours() }}
    >
      <div className="flex justify-end font-semibold">
        <h2 className="block mr-auto text-lg">{name}</h2>
        <div className="text-lg">
          <span className="text-xs">HP</span>
          {hp}
        </div>
        <div className="overflow-hidden">
          <Image
            className=""
            src={`/images/${type[0].pokemon_v2_type.id}.png`}
            alt={"type icon"}
            width="32"
            height="32"
          />
        </div>
      </div>

      <div className="border-slate-400 border-4 bg-black/15">
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

      <ul>
        <li>
          Type:
          <ul>
            {type.map((foo) => (
              <li>
                <Image
                  className=""
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/${foo.pokemon_v2_type.id}.png`}
                  alt={"type icon"}
                  width="114"
                  height="27"
                />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}
