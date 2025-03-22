// Authentification
import authConfig from "@/lib/auth";
import { getServerSession } from "next-auth";
// Others
import { redirect } from "next/navigation";
import React from 'react';

// =================================================================


export default async function Page() {
    // @ts-expect-error: Cette erreur est ignorée car arrivé sur cette page, la session n'est pas un problème si elle n'est pas présente.
    const session = await getServerSession(authConfig);

    if (!session) {
        redirect("/login");
    }

    return (
        <>
            <section className="w-10/12 md:w-2/3 h-5/6 bg-white dark:bg-[#202020] rounded-xl shadow-xl">
                <aside className="w-1/4 md:w-1/6 h-full border-r-2 border-black/50 dark:border-white/50  p-8">
                    <h3 className="hidden md:inline text-xl font-semibold"><u>Réglages:</u></h3>
                    <menu></menu>
                </aside>
                <div className="w-5/6"></div>
            </section>
        </>
    );
}
