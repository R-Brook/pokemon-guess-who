import { IChosenPokemon, IPlayer } from "@/types/game"

export type Action =
  | {
      type: "loggedIn"
      payload: IPlayer
    }
  | {
      type: "setChoosePokemon"
      payload: IChosenPokemon
    }

export type IGameDispatch = (action: Action) => void
