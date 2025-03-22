import authConfig from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(){
    const projects = await prisma.project.findMany();
    return NextResponse.json({projects: projects, message: "Projets trouvés avec succès !"});
}

export async function POST(request: Request){
    const body = await request.json();
    const { title, description, startDate, endDate } = body; 

    const session = await getServerSession(authConfig);

    if(!session?.user?.email){
        return NextResponse.json({error: "Vous devez être connecté pour effectuer cette action."}, {status: 401});
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if(!user?.email) return NextResponse.json({error: "nsm"}, {status: 500});

    const findAgency = await prisma.agency.findFirst({
        where: {
            userid: user?.id
        }
    });

    if(!findAgency) return NextResponse.json({error: "Vous n'êtes pas une agence."}, {status: 401});

    const newProject = await prisma.project.create({
        data: {
            title: title, 
            description: description, 
            startDate: startDate,
            endDate: endDate,
            clientid: findAgency.id
        }
    });

    return NextResponse.json({createdProject: newProject, message: "Projet créé avec succès !"}, {status: 201});
}