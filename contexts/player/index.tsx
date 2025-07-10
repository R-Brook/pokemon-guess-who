import { createContext, useContext, useEffect, useReducer } from "react"
import localforage from "localforage"
import { Action, IPlayer, IPlayerDispatch } from "./types"

const initialPlayerStatus: IPlayer = {
  logged_in: false,
  room_id: "",
  player_name: "",
  initialised: false,
}

const reducer = (state: IPlayer, action: Action) => {
  switch (action.type) {
    case "initialised":
      return {
        ...state,
        ...action.payload,
        initialised: true,
      }
    case "loggedIn":
      return {
        ...state,
        logged_in: action.payload,
      }
    case "setPlayerNameandRoomId":
      return {
        ...state,
        player_name: action.payload.player_name,
        room_id: action.payload.room_id,
      }
    default:
      throw new Error("Player status error, not a valid action")
  }
}

const PlayerContext = createContext<IPlayer | undefined>(undefined)
const PlayerDispatchContext = createContext<IPlayerDispatch | undefined>(
  undefined
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PlayerProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialPlayerStatus)

  useEffect(() => {
    const getFromLocalStorage = async () => {
      try {
        const localStoragePlayerState: IPlayer =
          (await localforage.getItem("pokemon-guess-who-player")) ||
          initialPlayerStatus
        dispatch({ type: "initialised", payload: localStoragePlayerState })
      } catch (err) {
        console.log(err)
      }
    }

    getFromLocalStorage()
  }, [])

  useEffect(() => {
    if (!state.initialised) {
      return
    }

    const setToLocalStorage = async () => {
      try {
        await localforage.setItem("pokemon-guess-who-player", state)
      } catch (error) {
        console.log(error)
      }
    }

    setToLocalStorage()
  }, [state])

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
