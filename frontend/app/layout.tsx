import "./globals.css";
import { Nunito } from 'next/font/google';
import Navbar from '@/app/components/navbar/Navbar';
import ClientOnly from "@/app/components/ClientOnly";
import ToasterProvider from '@/app/providers/ToasterProvider';
import MuiLocalizationProvider from "./providers/MuiLocalizationProvider";

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
    <div className="flex flex-col w-full items-center flex-1 overflow-y-auto overflow-x-hidden z-0 max-w-7xl lg:px-8 sm:px-8 px-6">
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
      <body className={nunito.className + " bg-backdrop"}>
        <main className="relative z-10 flex justify-center items-center flex-col">
          <BodyWrapper>
              <ToasterProvider />
              <Navbar />
              <ClientOnly>
                <MuiLocalizationProvider>
                  {children}
                </MuiLocalizationProvider>
              </ClientOnly>
          </BodyWrapper>
        </main>
      </body>
    </html>
   )
}