// Authentification
import authConfig from "@/lib/auth";
import { getServerSession } from "next-auth";
// Others
import { redirect } from "next/navigation";
import React from 'react';
// ===============================================================


export default async function Page() {
    // @ts-expect-error: Cette erreur est ignorée car arrivé sur cette page, la session n'est pas un problème si elle n'est pas présente.
    const session = await getServerSession(authConfig);

    if (!session) {
        redirect("/login");
    }

    return (
        <>
            <h1 className="text-2xl">Bienvenue <strong>{session.user?.name}</strong> !</h1>
            <section className="w-10/12 md:w-2/3 h-5/6 flex flex-col md:flex-row justify-center items-center gap-10">
                <div className="w-full md:w-1/2 h-full bg-white dark:bg-[#202020] rounded-2xl shadow-xl"></div>
                <div className="w-full md:w-1/2 h-full flex flex-col gap-10">
                    <div className="w-full h-1/2 bg-white dark:bg-[#202020] rounded-2xl shadow-xl"></div>
                    <div className="w-full h-1/2 bg-white dark:bg-[#202020] rounded-2xl shadow-xl"></div>
                </div>
            </section>
        </>
    );
}
