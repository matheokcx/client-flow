// Components
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceCard } from "@/components/ui/ServiceCard";
import NewsletterSignup from "@/components/ui/NewsLetterForm";
import Image from "next/image";
// React
import React from "react";

// ========================================================================


export default function Home() {
  return (
    <>
      <Header></Header>
      <main className="w-full flex flex-col items-center justify-center px-10 py-32 md:py-14 gap-32">
        <video controls width="600" autoPlay muted={true} loop={true} className="w-full md:w-1/2 rounded-2xl shadow-xl shadow-purple-500/50">
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>
        <Image src="/icons/down-arrow-icon.svg" alt="Down arrow" width="40" height="40" className="block dark:hidden animate-bounce"></Image>
        <Image src="/icons/down-arrow-icon-dark.svg" alt="Down arrow" width="40" height="40" className="hidden dark:block animate-bounce"></Image>
        <h3 className="text-center md:text-left text-4xl font-bold">Le futur est entre vos mains !</h3>
        <section className="w-full flex flex-col md:flex-row justify-center items-center gap-28">
          <ServiceCard serviceName="Montage" serviceDescription="Gestion de la création des vidéos après le tournage."></ServiceCard>
          <ServiceCard serviceName="Montage" serviceDescription="Gestion de la création des vidéos après le tournage."></ServiceCard>
          <ServiceCard serviceName="Montage" serviceDescription="Gestion de la création des vidéos après le tournage."></ServiceCard>
        </section>
        <NewsletterSignup></NewsletterSignup>
      </main>
      <Footer></Footer>
    </>
  );
}
