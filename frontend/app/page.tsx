import ClientOnly from "./components/ClientOnly";
import TokenOverview from "./components/token/TokenOverview";

const AppWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return ( 
    <div className="flex flex-col items-center overflow-x-hidden min-h-screen mx-16"> 
      {children}
    </div>
   );
}

const BodyWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return ( 
    <div className="flex flex-col w-full pt-20 items-center flex-1 overflow-y-auto overflow-x-hidden z-0 max-w-screen-lg">
      {children}
    </div>
   );
}

export default function Home() {
  return (
    <AppWrapper> 
      <BodyWrapper>
        <ClientOnly>
          <TokenOverview />
        </ClientOnly>
      </BodyWrapper>
    </AppWrapper>
  )
}