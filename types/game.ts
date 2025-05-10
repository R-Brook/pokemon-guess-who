export interface IGameStatus {
  chosenPokemon: IChosenPokemon
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
