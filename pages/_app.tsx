import type { AppProps } from "next/app"
import "@/css/styles.css"
import { GameStateProvider } from "@/contexts/game-status"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GameStateProvider>
      <main className="bg-slate-100">
        <Component {...pageProps} />
      </main>
    </GameStateProvider>
  )
}
