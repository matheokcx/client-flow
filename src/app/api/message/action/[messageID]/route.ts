import authConfig from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// =============================================


export async function PUT (request: Request, { params } : { params: Promise<{messageID: string}>}){
    const body = await request.json();
    const { text } = body; 

    const messageID = (await params).messageID;

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

    const author = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    });

    const authorized = await prisma.message.findUnique({
        where: {
            id: messageID, 
            author_id: author?.id
        }
    });

    if(!authorized) return NextResponse.json({error: "Vous ne pouvez pas modifier un message qui n'est pas le vôtre."}, {status: 401});


    const modifiedMessage = await prisma.message.update({
        data:{
            text: text
        },
        where: {
            id: messageID
        }
    });

    return NextResponse.json({modifiedMessage: modifiedMessage, message: "Message modifié avec succès !"}, {status: 303});
}

export async function DELETE (request: Request, { params } : { params: Promise<{messageID: string}>}){
    const messageID = (await params).messageID;

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

    const author = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    });

    const authorized = await prisma.message.findUnique({
        where: {
            id: messageID, 
            author_id: author?.id
        }
    });

    if(!authorized) return NextResponse.json({error: "Vous ne pouvez pas supprimer un message qui n'est pas le vôtre."}, {status: 401});

    const modifiedMessage = await prisma.message.delete({
        where: {
            id: messageID
        }
    });

    return NextResponse.json({message: "Message supprimé avec succès !"}, {status: 200});
}