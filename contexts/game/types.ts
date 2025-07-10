import { IChosenPokemon } from "@/types/game"

export type Action = {
  type: "setChoosePokemon"
  payload: IChosenPokemon
}

export type IGameDispatch = (action: Action) => void
