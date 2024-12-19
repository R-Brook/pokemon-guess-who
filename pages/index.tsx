import Image from "next/image"
import { POKEMONS_QUERY } from "@/apollo-graphql/queries/pokemons"
import { Card } from "@/components/Card/index"
import { pokemonsData, PokemonsProps } from "@/types/pokemons"
import client from "../apollo-graphql/apollo-client"
import ChatPage from "@/components/Chat"
import { useState } from "react"
import { io } from "socket.io-client"

export default function Home({ pokemonsData }: PokemonsProps) {
  const [showChat, setShowChat] = useState(false)
  const [userName, setUserName] = useState("")
  const [showSpinner, setShowSpinner] = useState(false)
  const [roomId, setroomId] = useState("")

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
      <h1>Pokemon Guess Who</h1>
      <div>
        <div
          className="flex justify-center align-middle flex-col gap-4 h-screen w-screen "
          style={{ display: showChat ? "none" : "" }}
        >
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
        <div style={{ display: !showChat ? "none" : "" }}>
          <ChatPage socket={socket} roomId={roomId} username={userName} />
        </div>
      </div>

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
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
