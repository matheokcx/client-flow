// Component
import Image from "next/image";
// React
import React from "react";

// ========================================================


export function ServiceCard({ serviceName, serviceDescription }: { serviceName: string, serviceDescription: string }) {
    return (
        <article className="w-full md:w-1/5 dark:bg-[#202020] text-center rounded-3xl shadow-xl flex flex-col items-center justify-center gap-10 px-6 py-10 transition-all hover:-translate-y-2 hover:shadow-2xl hover:cursor-pointer">
            <Image src={`/images/${serviceName}.jpeg`} alt="Image d'illustration" width="100" height="100" quality={100} className="w-full rounded-3xl"></Image>
            <h2 className="font-semibold text-2xl">{serviceName}</h2>
            <p>{serviceDescription}</p>
        </article>
    );
}