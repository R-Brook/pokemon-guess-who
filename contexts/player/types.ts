export interface IPlayer {
  logged_in: boolean
  room_id: string
  player_name: string
}

export type Action = {
  type: "loggedIn"
  payload: IPlayer
}

export type IPlayerDispatch = (action: Action) => void
