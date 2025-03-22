// Providers
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// AuthJS imports
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
// Library
import bcrypt from "bcryptjs";
// Types
import { Account, User } from "@prisma/client";

// ========================================================================


interface CustomSession extends Session {
    user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
};

export const authConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email et mot de passe requis.");
                }

                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user) {
                    throw new Error("Utilisateur non trouvé.");
                }

                if (!user.password) {
                    throw new Error("Ce compte utilise l'authentification Google. Connectez-vous avec Google.");
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isValidPassword) {
                    throw new Error("Mot de passe incorrect.");
                }

                return { id: user.id, email: user.email, name: user.name };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account }: { user: User, account: Account }) {
            if (user.email) {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email as string },
                    include: { accounts: true },
                });

                if (existingUser) {
                    const hasGoogleAccount = existingUser.accounts.some((acc: Account) => acc.provider === "google");

                    if (!hasGoogleAccount) {
                        const existingAccount = await prisma.account.findUnique({
                            where: {
                                provider_providerAccountId: {
                                    provider: account.provider,
                                    providerAccountId: account.providerAccountId,
                                },
                            },
                        });

                        if (!existingAccount) {
                            await prisma.account.create({
                                data: {
                                    userId: existingUser.id,
                                    provider: account.provider,
                                    providerAccountId: account.providerAccountId,
                                },
                            });
                        }
                    }
                }
            }
            else {
                await prisma.user.create({
                    data: {
                        email: user.email as string,
                        name: user.name,
                        image: user.image,
                        accounts: {
                            create: {
                                provider: account.provider,
                                providerAccountId: account.providerAccountId,
                            },
                        },
                    },
                });

                try {
                    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
                    await fetch(`${baseUrl}/api/mail`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            to: "test@example.com",
                            subject: "Bienvenue sur MonApp !",
                            html: `<h1>Salut ${user.name || "Utilisateur"} 👋</h1><p>Bienvenue sur notre plateforme.</p>`,
                        }),
                    });
                }
                catch (error) {
                    console.error("Erreur lors de l'envoi du mail :", error);
                }

            }
            return true;
        },
        async session({ session, token }: { session: CustomSession; token: JWT; }) {
            if (token.sub) {
                session.user.id = token.sub;
            }
            return session;
        }
    }
};

export default authConfig;
