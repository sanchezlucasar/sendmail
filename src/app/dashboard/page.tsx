'use client'

import Link from "next/link"
import { signOut } from 'next-auth/react'

function DashboardPage() {
  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <div>

        <div className="bg-white text-black px-7 py-2 rounded-md mt-4">
          <Link href="/contact">Contact Me</Link>
        </div>

      </div>
    </section>
  )
}
export default DashboardPage

