export interface IPlayer {
  logged_in: boolean
  room_id: string
  player_name: string
  initialised: boolean
}

export type Action =
  | {
      type: "initialised"
      payload: IPlayer
    }
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
