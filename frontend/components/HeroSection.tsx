"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-cover bg-center text-white py-32 md:py-48 flex items-center justify-center text-center"
      style={{ backgroundImage: 'url(/hero-background.jpg)' }} // Add a cool background image to your /public folder
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
          Give Your Wardrobe a Second Life
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10">
          Join ReWear, the community-driven platform to swap, share, and discover pre-loved fashion. Reduce waste, refresh your style, and embrace sustainability.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/items-listing">Browse Items</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/add-item">List an Item</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
