"use client"

import { Hero } from "@/components/ui/home/Hero";
import { Navbar } from "@/components/elements/Navbar";
import { Footer } from "@/components/elements/Footer";

export default function Home() {

  return (
    <>
      <Navbar/>
      <main className="h-screen">
        <Hero/>
      </main>
      <Footer/>
    </>
  );
}
