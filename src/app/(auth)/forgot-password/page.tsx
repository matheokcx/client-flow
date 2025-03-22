"use client";

// Hook
import { useState } from "react";
// React
import React from 'react';

// ======================================================


export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const request = await fetch("/api/auth/reset-request", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const response = await request.json();

        if (!request.ok) {
            setError(response.error);
        }
        else {
            setSuccess("Un e-mail a été envoyé si l'adresse existe.");
        }
    }

    return (
        <main className="w-full h-screen dark:bg-black flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-4/5 md:w-1/4 bg-white dark:bg-[#202020] p-8 rounded-2xl shadow-md flex flex-col items-center justify-center gap-6 transition-transform hover:-translate-y-2">
                <h2 className="text-3xl font-bold text-center">Mot de passe oublié</h2>
                <input type="email" placeholder="Votre adresse email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-11/12 h-12 dark:bg-black border-2 border-gray-300 rounded-xl px-2" required />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <button type="submit" className="w-1/3 h-14 bg-[#303030] text-white rounded-xl transition-all hover:bg-black hover:rounded-2xl">
                    Envoyer
                </button>
            </form>
        </main>
    );
}
