import authConfig from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Freelance } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// ==========================================================


export async function GET () {
    const freelances: Freelance[] = await prisma.freelance.findMany();
    return NextResponse.json({freelances: freelances, message: "Freelances trouvés avec succès !"});
}

export async function POST (request: Request){
    const body = await request.json();
    const { lastName, firstName, description, url, sexe, age, experienceLevel, averageDailRate } = body; 

    const session = await getServerSession(authConfig);

    if(!session?.user?.email){
        return NextResponse.json({error: "Vous devez être connecté pour effectuer cette action."}, {status: 401});
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if(age < 16){
        return NextResponse.json({error: "Vous êtes trop jeune pour vous inscrire. L'age minimum est de 16 ans."}, {status: 403});
    } 

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

    if(!user?.id) return NextResponse.json({error: "Erreur côté serveur."}, {status: 500});

    const newFreelance = await prisma.freelance.create({
        data: {
            last_name: lastName,
            first_name: firstName,
            description: description,
            url: url,
            sexe: sexe,
            age: age, 
            experience_level: experienceLevel,
            average_daily_rate: averageDailRate,
            userid: user?.id
        }
    })

    return NextResponse.json({newFreelance: newFreelance, message: "Freelance ajouté avec succès !"}, {status: 201});
}
