import React, { FC } from "react"
import Image from "next/image"
import { pokenmonTypes } from "@/types/pokemons"
import { typeColours } from "@/data/type-colours"

export interface CardProps {
  name: string
  image: string
  hp: number
  height: number
  weight: number
  type: pokenmonTypes[]
}

export const Card: FC<CardProps> = ({
  name,
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

  getBackgroundColours()
  return (
    <div className="p-2" style={{ backgroundColor: getBackgroundColours() }}>
      <div className="flex justify-end font-semibold">
        <h2 className="block mr-auto text-lg">{name}</h2>
        <div className="text-lg">
          <span className="text-xs">HP</span>
          {hp}
        </div>
      </div>

      <Image
        src={image}
        alt={name}
        width="150"
        height="150"
        className="m-auto"
      />
      <ul>
        <li>Height: {height}</li>
        <li>Weight: {weight}</li>
        <li>
          Type:
          <ul>
            {type.map((foo) => (
              <li key={foo.pokemon_v2_type.name}>{foo.pokemon_v2_type.name}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}
