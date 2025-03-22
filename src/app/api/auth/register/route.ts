// Global Prisma Client
import { prisma } from "@/lib/prisma";
// Password crypting librairy
import bcrypt from "bcryptjs";
// API response
import { NextResponse } from "next/server";

// ========================================================


export async function POST(request: Request) {
    try {
        const { email, password, name } = await request.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: "Nom, email et mot de passe requis" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                resetToken: null,
                resetTokenExpires: null
            }
        });

        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
        await fetch(`${baseUrl}/api/mail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                to: "test@example.com",
                subject: "Bienvenue sur MonApp !",
                html: `<h1>Salut ${name || "Utilisateur"} 👋</h1><p>Bienvenue sur notre plateforme.</p>`,
            }),
        });

        return NextResponse.json({ message: "Compte créé avec succès !", user: newUser }, { status: 201 });
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        else {
            return NextResponse.json({ error: "Une erreur inconnue est survenue" }, { status: 500 });
        }
    }

}
