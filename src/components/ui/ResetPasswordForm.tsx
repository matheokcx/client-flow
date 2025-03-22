'use client'

// Hooks
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// React
import React from 'react';

// ===========================================================================


export function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        const request = await fetch("/api/auth/reset-password", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password }),
        });

        const response = await request.json();

        if (!request.ok) {
            setError(response.error);
        }
        else {
            setSuccess("Mot de passe mis à jour avec succès ! Redirection...");
            setTimeout(() => router.push("/login"), 3000);
        }
    }

    return (
        <main className="w-full h-screen dark:bg-black flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-4/5 md:w-1/4 bg-white dark:bg-[#202020] p-8 rounded-2xl shadow-md flex flex-col items-center justify-center gap-6 transition-transform hover:-translate-y-2">
                <h2 className="text-xl md:text-3xl font-bold text-center">Réinitialisation du mot de passe</h2>
                <input type="password" placeholder="Nouveau mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="w-11/12 h-12 dark:bg-black border-2 border-gray-300 rounded-xl px-2" required />
                <input type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-11/12 h-12 dark:bg-black border-2 border-gray-300 rounded-xl px-2" required />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <button type="submit" className="w-1/3 h-14 bg-[#303030] text-white rounded-xl transition-all hover:bg-black hover:rounded-2xl">
                    Changer
                </button>
            </form>
        </main>
    );
}
