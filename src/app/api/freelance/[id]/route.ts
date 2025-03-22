import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// =================================================


export async function GET (request: Request, { params }: { params: Promise<{ id: string }> }){
    const freelanceID = (await params).id;

    const freelance = await prisma.freelance.findUnique({
        where: {
            id: parseInt(freelanceID)
        }
    })

    return NextResponse.json({freelance: freelance, message: "Compte freelance trouvé avec succès !"}, {status: 200});
}

export async function PUT (request: Request, { params }: { params: Promise<{ id: string }> }){
    const body = await request.json();
    const { lastName, firstName, description, url, sexe, age, experienceLevel, averageDailRate } = body; 

    if(age < 16){
        return NextResponse.json({error: "Vous êtes trop jeune pour vous inscrire. L'age minimum est de 16 ans."}, {status: 403});
    } 

    const freelanceID = (await params).id;

    const freelance = await prisma.freelance.update({
        where: {
            id: parseInt(freelanceID)
        },
        data: {
            last_name: lastName,
            first_name: firstName,
            description: description,
            url: url,
            sexe: sexe,
            age: age, 
            experience_level: experienceLevel,
            average_daily_rate: averageDailRate,
        }
    })

    return NextResponse.json({modifiedFreelance: freelance, message: "Freelance mis à jour avec succès !"}, {status: 303});
}

export async function DELETE (request: Request, { params }: { params: Promise<{ id: string }> }){
    const freelanceID = (await params).id;

    const freelance = await prisma.freelance.delete({
        where: {
            id: parseInt(freelanceID)
        }
    })

    return NextResponse.json({message: "Freelance supprimé avec succès !"}, {status: 200});
}