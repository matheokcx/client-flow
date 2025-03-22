// Components
import Link from "next/link";
import Image from "next/image";
// React
import React from 'react';

// ============================================


export default function DashboardLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <header className="w-full bg-white dark:bg-[#202020] flex justify-center md:justify-between p-8 md:border-b-2 border-gray-400/50 rounded-b-3xl">
                <nav className="hidden md:flex gap-10 items-center font-semibold">
                    <Link href="/">Accueil</Link>
                    <Link href="/profile">Dashboard</Link>
                    <Link href="/settings">Réglages</Link>
                </nav>
                <form action="/api/auth/signout" method="POST" className="w-1/2 md:w-1/12">
                    <button className="w-10/12 h-12 bg-red-500 text-white p-2 rounded-2xl">Déconnexion</button>
                </form>
            </header>
            <main className="w-full h-4/6 md:h-5/6 flex flex-col justify-center items-center gap-8 overflow-y-auto">{children}</main>
            <footer className="w-full absolute bottom-12 flex md:hidden justify-center items-center p-4 gap-10">
                <Link href="/">
                    <Image src="/icons/home-icon.svg" alt="Accueil" width="45" height="45" className="block dark:hidden"></Image>
                    <Image src="/icons/home-icon-dark.svg" alt="Accueil" width="45" height="45" className="hidden dark:block"></Image>
                </Link>
                <Link href="/profile">
                    <Image src="/icons/dashboard-icon.svg" alt="Dashboard" width="50" height="50" className="block dark:hidden"></Image>
                    <Image src="/icons/dashboard-icon-dark.svg" alt="Dashboard" width="50" height="50" className="hidden dark:block"></Image>
                </Link>
                <Link href="/settings">
                    <Image src="/icons/settings-icon.svg" alt="Paramètres" width="45" height="45" className="block dark:hidden"></Image>
                    <Image src="/icons/settings-icon-dark.svg" alt="Paramètres" width="45" height="45" className="hidden dark:block"></Image>
                </Link>
            </footer>
        </>
    );
}