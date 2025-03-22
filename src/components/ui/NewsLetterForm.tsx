"use client";

// Hook
import { useState } from "react";
// React
import React from "react";

// =======================================================


export default function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const response = await fetch("/api/mail/newsletter", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();
        setLoading(false);

        if (result.success) {
            setMessage("Inscription réussie !");
            setEmail("");
        }
        else {
            setMessage(result.error || "Une erreur est survenue.");
        }
    };

    return (
        <div className="w-1/3 flex flex-col items-center gap-8 mx-auto py-12 px-4 text-center bg-white dark:bg-[#202020] text-black dark:text-white rounded-2xl shadow-md">
            <div>
                <h2 className="text-2xl font-bold  mb-4">Abonne-toi à notre newsletter</h2>
                {message && <p className="text-sm mt-3 text-center">{message}</p>}
            </div>
            <form onSubmit={handleSubmit} className="w-10/12 flex flex-col items-center gap-6">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Votre email" required className="w-full text-black p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" disabled={loading} className="w-1/4 py-4 px-2 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600" >
                    {loading ? "Inscription..." : "S'inscrire"}
                </button>
            </form>
        </div>
    );
}
