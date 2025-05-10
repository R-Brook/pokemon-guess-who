export interface IGameStatus {
  player: IPlayer
  chosenPokemon: IChosenPokemon
}

export interface IPlayer {
  logged_in: boolean
  room_id: string
  name: string
}

export interface IChosenPokemon {
  pokemon_chosen: boolean
  pokemon_name: string
}

export interface IMsgDataTypes {
  roomId: string
  user: string
  msg: string
  time: string
}
