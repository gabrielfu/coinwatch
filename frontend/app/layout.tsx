import "./globals.css"
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from "./components/ClientOnly"

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'CoinWatch',
  description: 'Crypto Portfolio Tracker',
}

const BodyWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return ( 
    <div className="flex flex-col w-full items-center flex-1 overflow-y-auto overflow-x-hidden z-0 max-w-7xl lg:px-16 sm:px-0 px-2">
      {children}
    </div>
   );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={nunito.className + " bg-gmx-dark"}>
        <main className="relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
          <BodyWrapper>
            <Navbar />
            <ClientOnly>
              {children}
            </ClientOnly>
          </BodyWrapper>
        </main>
      </body>
    </html>
   )
}