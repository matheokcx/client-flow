"use client";

// AuthJS
import { signIn } from "next-auth/react";
// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";
// Components
import { PasswordInput } from "@/components/ui/PasswordInput";
import Image from "next/image";
import Link from "next/link";
// Toasts message manager
import { toast } from "react-toastify";
// React
import React from 'react';

// ====================================================================


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const request = await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        if (request?.error) {
            toast.error(request.error);
        }
        else {
            router.push("/profile");
        }
    };

    return (
        <main className="w-full h-full  flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-4/5 md:w-1/4 h-3/5 bg-white dark:bg-[#202020] dark:text-white p-8 rounded-2xl shadow-md flex flex-col items-center justify-center gap-6 transition-transform hover:-translate-y-2">
                <h2 className="text-3xl font-bold text-center">Connexion</h2>
                <input type="email" placeholder="Adresse mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-11/12 h-12 dark:bg-black border-2 border-[#303030] rounded-xl px-2 " required />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}></PasswordInput>
                <div className="w-full flex justify-center items-center gap-4">
                    <button type="submit" className="w-1/2 md:w-1/3 h-14 bg-[#303030] text-white rounded-xl transition-all hover:bg-black hover:rounded-2xl">Se connecter</button>
                </div>
                <div className="text-center">
                    <Link href="/forgot-password">Mot de passe oublié ?</Link>
                    <p className="mt-4 text-sm">
                        Pas encore de compte ?{" "}
                        <a href="/register" className="text-blue-400 hover:underline">Inscrivez-vous ici</a>
                    </p>
                </div>
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
