'use client'

import Link from "next/link"


function DashboardPage() {
  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center bg-primary-content">


      <div
        className="rounded p-1 max-w-6xl"
      >
        <div className="glass w-80 h-80 rounded-box grid place-content-center">

          <div className="bg-white flex justify-center items-center text-black px-7 py-2 rounded-md mt-4">
            <Link href="/contact">Enviar Email</Link>
          </div>

          <div className="bg-white flex justify-center items-center text-black px-7 py-2 rounded-md mt-4">
            <Link href="/contact">Ejecutar servicio</Link>
          </div>


        </div>
      </div>

    </section >
  )
}
export default DashboardPage

