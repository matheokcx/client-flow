import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ===========================================


export async function GET (request: Request, { params }: { params: Promise<{ id: string }> }){
    const agencyID = (await params).id;

    const agency = await prisma.agency.findUnique({
        where: {
            id: parseInt(agencyID)
        }
    })

    return NextResponse.json({agency: agency, message: "Agence trouvée avec succès !"}, {status: 200});
}

export async function PUT (request: Request, { params }: { params: Promise<{ id: string }> }){
    const body = await request.json();
    const { name, pastExperience } = body; 

    const agencyID = (await params).id;

    const agency = await prisma.agency.update({
        where: {
            id: parseInt(agencyID)
        },
        data: {
            name: name, 
            past_experience: pastExperience
        }
    })

    return NextResponse.json({agency: agency, message: "Agence mise à jour avec succès !"}, {status: 303});
}

export async function DELETE (request: Request, { params }: { params: Promise<{ id: string }> }){
    const agencyID = (await params).id;

    const agency = await prisma.agency.delete({
        where: {
            id: parseInt(agencyID)
        }
    })

    return NextResponse.json({message: "Agence supprimée avec succès !"}, {status: 200});
}
