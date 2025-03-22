import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ==================================================


export async function GET (request: Request, { params }: { params: Promise<{ id: string }> }){
    const projectID = (await params).id;

    const project = await prisma.project.findUnique({
        where: {
            id: parseInt(projectID)
        }
    });

    return NextResponse.json({project: project, message: "Projet trouvé avec succès !"}, {status: 200});
}

export async function PUT (request: Request, { params }: { params: Promise<{ id: string }> }){
    const projectID = (await params).id;

    const body = await request.json();
    const { title, description, startDate, endDate } = body; 


    const modifiedProject = await prisma.project.update({
        where: {
            id: parseInt(projectID)
        },
        data: {
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate
        }
    });

    return NextResponse.json({project: modifiedProject, message: "Projet modifié avec succès !"}, {status: 303});
}

export async function DELETE (equest: Request, { params }: { params: Promise<{ id: string }> }){
    const projectID = (await params).id;

    const project = await prisma.project.delete({
        where: {
            id: parseInt(projectID)
        }
    });

    return NextResponse.json({message: "Projet supprimé avec succès !"}, {status: 200});
}
