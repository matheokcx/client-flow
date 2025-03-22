// Component
import Image from "next/image"
// React
import React from "react";

// ===========================================


export function Footer() {
    return (
        <footer className="w-full bg-[#202020] text-white font-medium py-16 rounded-t-3xl flex flex-col md:flex-row justify-around items-center gap-10 ">
            <div className="flex gap-8">
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <Image src="/icons/instagram-icon.svg" alt="Instagram" width="45" height="45" className="transition-transform hover:rotate-3"></Image>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                    <Image src="/icons/facebook-icon.svg" alt="Instagram" width="40" height="40" className="transition-transform hover:-rotate-3"></Image>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                    <Image src="/icons/linkedin-icon.svg" alt="Instagram" width="40" height="40" className="transition-transform hover:rotate-3"></Image>
                </a>
            </div>
            <span className="flex gap-8">
                <a href="#">CGV</a>
                -
                <a href="#">Mentions légales</a>
            </span>
        </footer>
    )
}