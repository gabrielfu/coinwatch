import ClientOnly from "./components/ClientOnly";
import TokenOverview from "./components/token/TokenOverview";

export default function Home() {
  return (
      <ClientOnly>
        <TokenOverview />
      </ClientOnly>
  )
}