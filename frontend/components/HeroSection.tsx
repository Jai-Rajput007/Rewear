import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 h-[500px] md:h-[600px] w-full flex items-center">
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Sustainable Fashion, One Swap at a Time
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Join our community of eco-conscious fashion lovers. Swap, sell, or buy pre-loved clothing items and reduce fashion waste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              >
                Start Swapping
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-white border-white hover:bg-white/10 font-semibold"
              >
                How It Works
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
    </section>
  );
}
