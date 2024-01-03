'use client'
import Link from "next/link";
import { useSession } from "next-auth/react";

function Navbar() {
    const { data: session } = useSession()

    console.log('aca la session', session);

    return (


        <div className="navbar bg-primary text-primary-content">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Grupo 360!</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 ">
                    {session?.user ? (
                        <>
                            <li className="">  <Link href="/dashboard">Dashboard</Link></li>
                            <li>  <Link href="/api/auth/signout">Logout</Link></li>
                        </>
                    ) : (
                        <>
                            <li>
                                <details>
                                    <summary>
                                        Auth
                                    </summary>
                                    <ul style={{ color: 'black' }} className="p-2 rounded-t-none">
                                        <li > <Link href="/auth/register">Register</Link></li>
                                        <li> <Link href="/auth/login">Login</Link></li>
                                    </ul>
                                </details>
                            </li>
                        </>

                    )
                    }
                </ul>
            </div >
        </div >


    )
}

export default Navbar;
