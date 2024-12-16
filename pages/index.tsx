import { POKEMONS_QUERY } from "@/apollo-graphql/queries/pokemons"
import { Card } from "@/components/Card/index"
import { pokemonsData, PokemonsProps } from "@/types/pokemons"
import client from "../apollo-graphql/apollo-client"

export default function Home({ pokemonsData }: PokemonsProps) {
  return (
    <main className="bg-slate-100">
      <div className="w-full max-w-[1200px] m-auto">
        <h1>Pokemon Guess Who</h1>
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {pokemonsData.map((item: pokemonsData) => (
            <Card
              key={item.name}
              name={item.name}
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
    </main>
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
