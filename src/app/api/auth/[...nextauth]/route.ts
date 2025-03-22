import NextAuth from "next-auth";
import authConfig from "@/lib/auth";


// @ts-expect-error: Cette erreur est ignorée car la configuration se trouve dans un fichier dédié en tant que module pour plus de clareté
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
