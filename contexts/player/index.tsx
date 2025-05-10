import { createContext, useContext, useReducer } from "react"

import { Action, IPlayer, IPlayerDispatch } from "./types"

const initialPlayerStatus: IPlayer = {
  logged_in: false,
  room_id: "",
  player_name: "",
}

const reducer = (state: IPlayer, action: Action) => {
  switch (action.type) {
    case "loggedIn":
      return {
        ...state,
        logged_in: action.payload.logged_in,
        room_id: action.payload.room_id,
        player_name: action.payload.player_name,
      }
    default:
      throw new Error("Player status error, not a valid action")
  }
}

const PlayerContext = createContext<IPlayer | undefined>(undefined)
const PlayerDispatchContext = createContext<IPlayerDispatch | undefined>(
  undefined
)

export const PlayerProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialPlayerStatus)

  return (
    <PlayerContext.Provider value={state}>
      <PlayerDispatchContext.Provider value={dispatch}>
        {children}
      </PlayerDispatchContext.Provider>
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}

export const usePlayerDispatch = () => {
  const context = useContext(PlayerDispatchContext)
  if (context === undefined) {
    throw new Error("PlayerDispatch must be used within a PlayerProvider")
  }
  return context
}
