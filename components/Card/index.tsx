import React, { FC } from "react"
import Image from "next/image"
import { pokenmonTypes } from "@/types/pokemons"

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
  return (
    <div className="border-2">
      <div className="flex justify-end">
        <h2 className="block mr-auto">{name}</h2>
        <span>HP{hp}</span>
      </div>

      <Image src={image} alt={name} width="150" height="150" />
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
