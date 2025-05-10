import type { AppProps } from "next/app"
import "@/css/styles.css"
import { GameStateProvider } from "@/contexts/game"
import { PlayerProvider } from "@/contexts/player"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayerProvider>
      <GameStateProvider>
        <main className="bg-slate-100">
          <Component {...pageProps} />
        </main>
      </GameStateProvider>
    </PlayerProvider>
  )
}
