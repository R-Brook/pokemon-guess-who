import { createContext, useContext, useReducer } from "react"
import { IGameStatus } from "@/types/game"
import { Action, IGameDispatch } from "./types"

const initialGameStatus: IGameStatus = {
  player: {
    logged_in: false,
    room_id: "",
    name: "",
  },
  chosenPokemon: {
    pokemon_chosen: false,
    pokemon_name: "",
  },
}

const reducer = (state: IGameStatus, action: Action) => {
  switch (action.type) {
    case "loggedIn":
      return {
        ...state,
        player: action.payload,
      }
    case "setChoosePokemon":
      return {
        ...state,
        chosenPokemon: action.payload,
      }
    default:
      throw new Error("Game status error, not a valid action")
  }
}

const GameStateContext = createContext<IGameStatus | undefined>(undefined)
const GameDispatchContext = createContext<IGameDispatch | undefined>(undefined)

export const GameStateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialGameStatus)

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  )
}

export const useGameStatus = () => {
  const context = useContext(GameStateContext)
  if (context === undefined) {
    throw new Error("useGameStatus must be used within a GameStateProvider")
  }
  return context
}

export const useGameStatusDispatch = () => {
  const context = useContext(GameDispatchContext)
  if (context === undefined) {
    throw new Error(
      "useGameStatusDispatch must be used within a GameStateProvider"
    )
  }
  return context
}
