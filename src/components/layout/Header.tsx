// Components
import Image from "next/image";
import Link from "next/link";
// Authentification
import authConfig from "@/lib/auth";
import { getServerSession } from "next-auth"
// React
import React from "react";

// ===========================================================


export async function Header() {
    // @ts-expect-error: Cette erreur est ignorée car arrivé au niveau de ce composant, la session peut être négligée.
    const session = await getServerSession(authConfig);

    return (
        <header>
            <nav className="w-full px-8 py-4 flex justify-center md:justify-between items-center">
                <div className="h-full hidden md:flex justify-start items-center gap-10 font-bold">
                    <Image src="/images/logo.png" alt="Logo du site" width="80" height="80" className="block dark:hidden"></Image>
                    <Image src="/images/logo-dark.png" alt="Logo du site" width="80" height="80" className="hidden dark:block"></Image>
                    <Link href="/">Accueil</Link>
                    <Link href="">A propos</Link>
                    <Link href="">Services</Link>
                    <Link href="">Contact</Link>
                </div>
                <div className="h-full mt-20 md:mt-0 flex items-center justify-end gap-8">
                    {
                        session?.user ? <Link href="/profile" className="rounded-2xl flex items-center justify-center bg-[#79ec83] text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">Dashboard</Link> : (
                            <>
                                <a className="rounded-2xl flex items-center justify-center bg-[#202020] text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" href="/login">Connexion</a>
                                <a className="rounded-2xl flex items-center justify-center bg-[#202020] text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" href="/register">Inscription</a>
                            </>
                        )
                    }
                </div>
            </nav>
        </header>
    )
}