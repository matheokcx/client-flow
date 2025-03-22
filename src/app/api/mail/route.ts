import { transporter } from "@/lib/mail";
import { NextResponse } from "next/server";

// =========================================================================


export async function POST(req: Request) {
    try {
        const { to, subject, html } = await req.json();

        if (!to || !subject || !html) {
            return NextResponse.json({ error: "Le destinataire, l'objet et le contenu du mail sont obligatoires." }, { status: 400 });
        }

        await transporter.sendMail({
            from: '"MonApp" <no-reply@localhost>',
            to,
            subject,
            html,
        });

        return NextResponse.json({ success: true });
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: "Erreur lors de l'envoit de l'email.", details: error.message }, { status: 500 });
        }
        else {
            return NextResponse.json({ error: "Une erreur inconnue est survenue" }, { status: 500 });
        }
    }
}
