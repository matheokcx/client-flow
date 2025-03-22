import authConfig from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// =====================================================


export async function GET(request: Request, {params} : {params: Promise<{id: string}>}) {
    const targetID = (await params).id;
    
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

    const yourMessages = await prisma.message.findMany({
        where: {
            target_id: targetID,
            author_id: author?.id
        }
    });

    const theirMessages = await prisma.message.findMany({
        where: {
            target_id: author?.id,
            author_id: targetID
        }
    });

    return NextResponse.json({yourMessages: yourMessages, hisMessages: theirMessages, message: "Messages chargés avec succès !"}, {status: 200})
}

export async function POST (request: Request, { params }: { params: Promise<{ id: string }> }){    
    const targetID = (await params).id;

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

    if(!author) return NextResponse.json({error: "Erreur interne"}, {status: 500});

    if(author.id === targetID) return NextResponse.json({error: "Vous ne pouvez pas vous envoyer un message à vous même."}, {status: 401});

    const body = await request.json();
    const { text } = body; 

    const newMessage = await prisma.message.create({
        data: {
            text: text,
            author_id: author.id,
            target_id: targetID
        }
    });

    return NextResponse.json({newMessage: newMessage, message: "Message envoyé avec succès !"}, {status: 201});
}
