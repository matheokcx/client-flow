import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =================================================================


export async function PATCH(req: Request) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ success: false, error: "Email requis" }, { status: 400 });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            return NextResponse.json({ success: false, error: "Vous n'avez pas de compte. Créez-en un !" }, { status: 404 });
        }

        if (existingUser.newsletterSubscribed) {
            return NextResponse.json({ success: false, error: "Vous êtes déjà inscrit à la newsletter" }, { status: 400 });
        }

        await prisma.user.update({
            where: { email },
            data: { newsletterSubscribed: true },
        });

        await fetch("http://localhost:3000/api/mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                to: email,
                subject: "Bienvenue à la newsletter",
                html: "<p>Merci de vous être inscrit ! Vous recevrez bientôt nos mises à jour.</p>",
            }),
        })

        return NextResponse.json({ success: true, message: "Inscription à la newsletter réussie !" });
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }
        else {
            return NextResponse.json({ error: "Une erreur inconnue est survenue" }, { status: 500 });
        }
    }
}
