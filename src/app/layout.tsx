// Style
import "../styles/globals.css";
// Toasts imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Others
import React from "react";
import type { Metadata } from "next";

// =================================================================


export const metadata: Metadata = {
  title: "Nom de l'application",
  description: "Description de l'application.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="fr">
      <body className=" w-screen h-screen bg-[#f6f6f6] dark:bg-black text-black dark:text-white antialiased">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
