// Global prisma client
import { prisma } from "@/lib/prisma";
// Nodemailer
import { transporter } from "@/lib/mail";
// Others
import crypto from "crypto";
import { NextResponse } from "next/server";

// ========================================================================


export async function PATCH(req: Request) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return NextResponse.json({ error: "Aucun utilisateur trouvé" }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 3600000);

    await prisma.user.update({
        where: { email },
        data: { resetToken, resetTokenExpires },
    });

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
        from: '"MonApp" <no-reply@monapp.com>',
        to: email,
        subject: "Réinitialisation de mot de passe",
        html: `<p>Pour réinitialiser votre mot de passe, cliquez sur le lien suivant :</p>
               <a href="${resetUrl}">${resetUrl}</a>
               <p>Ce lien est valide pendant 1 heure.</p>`,
    });

    return NextResponse.json({ success: true, message: "E-mail envoyé !" });
}
