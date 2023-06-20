'use client'

import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex text-text justify-center items-center min-h-[80vh]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
        <br />
        <div>Return to <Link href="/tokens" className="text-white">Tokens</Link> or <Link href="/portfolios" className="text-white">Portfolios</Link></div>
      </div>
    </div>
  )
}