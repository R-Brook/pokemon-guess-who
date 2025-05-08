import type { AppProps } from "next/app"
import "@/css/styles.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="bg-slate-100">
      <Component {...pageProps} />
    </main>
  )
}
