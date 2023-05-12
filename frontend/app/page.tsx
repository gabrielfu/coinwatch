import ClientOnly from "./components/ClientOnly";
import TokenOverview from "./components/token/TokenOverview";
import TokenPage from "./token/[tokenAddress]/page";

export default function Home() {
  return (
    <ClientOnly>
      <div className="bg-gmx-dark">
        <TokenOverview />
      </div>
    </ClientOnly>
  )
}