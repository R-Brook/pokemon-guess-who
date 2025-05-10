export interface IPlayer {
  logged_in: boolean
  room_id: string
  player_name: string
}

export type Action =
  | {
      type: "loggedIn"
      payload: boolean
    }
  | {
      type: "setPlayerName"
      payload: string
    }
  | {
      type: "setRoomId"
      payload: string
    }

export type IPlayerDispatch = (action: Action) => void
