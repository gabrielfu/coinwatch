import ClientOnly from "./components/ClientOnly";
import TokenPage from "./components/token/TokenPage";

export default function Home() {
  return (
    <ClientOnly>
      <div className="bg-gmx-dark">
        <TokenPage />       
      </div>
    </ClientOnly>
  )
}