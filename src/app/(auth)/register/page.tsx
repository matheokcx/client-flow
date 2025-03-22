"use client";

// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";
// Components
import { PasswordInput } from "@/components/ui/PasswordInput";
import Image from "next/image";
// AuthJS
import { signIn } from "next-auth/react";
// Toasts message manager
import { toast } from "react-toastify";
// React
import React from 'react';

// ======================================================================


export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const request = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, name })
        });

        const response = await request.json();

        if (!request.ok) {
            toast.error(response.error || "Une erreur est survenue");
        }
        else {
            toast.success(response.message);
            setTimeout(() => {
                router.push(`/login`);
            }, 2000);
        }
    };

    return (
        <main className="w-full h-full flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-4/5 md:w-1/4 h-3/5 bg-white dark:bg-[#202020] dark:text-white flex flex-col items-center justify-center gap-6 p-6 md:p-8 rounded-2xl shadow-md transition-transform hover:-translate-y-2">
                <h2 className="text-center text-3xl font-bold">Inscription</h2>
                <input type="text" placeholder="Votre nom" value={name} onChange={(e) => setName(e.target.value)} className="w-11/12 h-12 dark:bg-black border-2 border-[#303030] rounded-xl px-2 " required />
                <input type="email" placeholder="Adresse mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-11/12 h-12 dark:bg-black border-2 border-[#303030] rounded-xl px-2 " required />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}></PasswordInput>
                <button type="submit" className="w-2/3 h-14 bg-[#303030] dark:bg-white text-white dark:text-black rounded-xl transition-all hover:bg-black hover:rounded-2xl">S&apos;inscrire</button>
                <p className="mt-4 text-sm">
                    Déjà un compte ?{" "}
                    <a href="/login" className="text-blue-400 hover:underline">Connectez-vous ici</a>
                </p>
                <div className="w-full flex justify-center items-center gap-10">
                    <button onClick={() => signIn("google", { callbackUrl: "/profile" })} className="w-1/2 md:w-1/3 h-14 bg-[#303030] flex justify-center items-center gap-2 text-white rounded-xl transition-all hover:bg-black hover:rounded-2xl">
                        <Image src="/images/google-logo.png" alt="Google" width="40" height="40"></Image>
                        Google
                    </button>
                </div>
            </form>
        </main>
    );
}
