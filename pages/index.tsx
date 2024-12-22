import { useState } from "react"
import { POKEMONS_QUERY } from "@/apollo-graphql/queries/pokemons"
import client from "@/apollo-graphql/apollo-client"
import { Card } from "@/components/Card/index"
import ChatPage from "@/components/Chat"
import { Select } from "@/components/Select"
import { pokemonsData, PokemonsProps } from "@/types/pokemons"
import { io } from "socket.io-client"

export default function Home({ pokemonsData }: PokemonsProps) {
  const [showChat, setShowChat] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>("")
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [roomId, setroomId] = useState<string>("")
  const [chosenPokemon, setChosenPokemon] = useState<string>("")
  const [gameIsReady, setGameIsReady] = useState<boolean>(false)

  const getPokemonNames = (): string[] => {
    const namesToChooseFrom: string[] = ["Please select a Pokemon"]

    pokemonsData.map((item: pokemonsData) => namesToChooseFrom.push(item.name))

    return namesToChooseFrom
  }

  var socket: any
  socket = io("http://localhost:3001")

  const handleJoin = () => {
    if (userName !== "" && roomId !== "") {
      console.log(userName, "userName", roomId, "roomId")
      socket.emit("join_room", roomId)
      setShowSpinner(true)
      // You can remove this setTimeout and add your own logic
      setTimeout(() => {
        setShowChat(true)
        setShowSpinner(false)
      }, 4000)
    } else {
      alert("Please fill in Username and Room Id")
    }
  }

  return (
    <div className="w-full max-w-[1200px] m-auto">
      <h1 className="text-5xl">Pokemon Guess Who</h1>

      {!showChat && (
        <section className="border-2 border-green">
          <div className="flex justify-center align-middle flex-col gap-4 h-screen w-screen ">
            <input
              className="h-8 w-60 p-2"
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              disabled={showSpinner}
            />
            <input
              className="h-8 w-60 p-2"
              type="text"
              placeholder="room id"
              onChange={(e) => setroomId(e.target.value)}
              disabled={showSpinner}
            />
            <button
              className="h-8 w-60 flex justify-center align-middle"
              onClick={() => handleJoin()}
            >
              {!showSpinner ? (
                "Join"
              ) : (
                <div className="border-2 border-gray border-t-2 border-top-blue w-5 h-5 animate-spin"></div>
              )}
            </button>
          </div>
        </section>
      )}

      {userName && roomId && !gameIsReady && (
        <div className="flex flex-wrap gap-2 border-2 border-blue my-4">
          <Select
            required={true}
            label={"Choose your pokemon"}
            name={"pokemon-select"}
            id={"player-pokemon"}
            value={chosenPokemon}
            options={getPokemonNames()}
            onChange={(event) => setChosenPokemon(event.target.value)}
          />
          <button onClick={() => setGameIsReady(true)}>Start</button>
        </div>
      )}
      {gameIsReady && (
        <span className="w-full">Chosen pokemon: {chosenPokemon}</span>
      )}

      {showChat && (
        <ChatPage socket={socket} roomId={roomId} username={userName} />
      )}

      <section>
        <h2 className="text-2xl">Remaining Pokemon to guess from</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pb-16">
          {pokemonsData.map((item: pokemonsData) => (
            <Card
              key={item.name}
              name={item.name}
              id={item.id}
              image={
                item.pokemon_v2_pokemonsprites[0].sprites.other[
                  `official-artwork`
                ].front_default
              }
              hp={item.pokemon_v2_pokemonstats[0].base_stat}
              height={item.height}
              weight={item.weight}
              type={item.pokemon_v2_pokemontypes}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export async function getStaticProps() {
  let pokemonsData = {}

  await client
    .query({
      query: POKEMONS_QUERY,
    })
    .then((res) => {
      pokemonsData = res.data.pokemon_v2_pokemon
    })

  return {
    props: {
      pokemonsData,
    },
  }
}
