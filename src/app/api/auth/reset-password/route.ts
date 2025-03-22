// Global prisma client
import { prisma } from "@/lib/prisma";
// Password encrypt librairy
import bcrypt from "bcryptjs";
// API response
import { NextResponse } from "next/server";

// ================================================================


export async function PATCH(req: Request) {
    const { token, password } = await req.json();

    if (!token || !password) {
        return NextResponse.json({ error: "Token et mot de passe requis" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
        where: {
            resetToken: token,
            resetTokenExpires: { gt: new Date() },
        },
    });

    if (!user) {
        return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword, resetToken: null, resetTokenExpires: null },
    });

    return NextResponse.json({ success: true, message: "Mot de passe mis à jour !" });
}
