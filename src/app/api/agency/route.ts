import authConfig from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Agency } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// ==========================================================


export async function GET () {
    const agencies: Agency[] = await prisma.agency.findMany();
    return NextResponse.json({agencies: agencies});
}

export async function POST (request: Request){
    const body = await request.json();
    const { name, pastExperience } = body; 

    const session = await getServerSession(authConfig);

    if(!session?.user?.email){
        return NextResponse.json({error: "Vous devez être connecté pour effectuer cette action."}, {status: 401});
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    const findAlreadyFreelance = await prisma.freelance.findFirst({
        where: {
            userid: user?.id
        }
    });

    const findAlreadyAgency = await prisma.agency.findFirst({
        where: {
            userid: user?.id
        }
    });

    if(findAlreadyAgency){
        return NextResponse.json({error: "Vous avez déjà un compte en tant qu'agence."}, {status: 403});
    }

    if(findAlreadyFreelance){
        return NextResponse.json({error: "Vous avez déjà un compte en tant que freelance."}, {status: 403});
    }

    if(!user?.id) return NextResponse.json({error: "Erreur côté serveur"}, {status: 500});

    const newAgency = await prisma.agency.create({
        data: {
            name: name,
            past_experience: pastExperience,
            userid: user.id
        }
    })

    return NextResponse.json({message: "Agence créée avec succès !"}, {status: 201});
}
