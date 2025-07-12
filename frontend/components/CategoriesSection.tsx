"use client";

import Link from 'next/link';
import { Shirt, Wind, Sparkles, RectangleHorizontal, Diamond } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  {
    name: 'Tops',
    icon: <Shirt className="w-8 h-8" />,
    color: 'bg-blue-500',
  },
  {
    name: 'Bottoms',
    icon: <RectangleHorizontal className="w-8 h-8" />,
    color: 'bg-green-500',
  },
  {
    name: 'Dresses',
    icon: <Diamond className="w-8 h-8" />,
    color: 'bg-pink-500',
  },
  {
    name: 'Outerwear',
    icon: <Wind className="w-8 h-8" />,
    color: 'bg-purple-500',
  },
  {
    name: 'Accessories',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'bg-yellow-500',
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find your next favorite piece from our curated collections.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              href={`/items-listing?category=${category.name}`}
              className="group block"
            >
              <div className={cn(
                'flex flex-col items-center justify-center p-6 rounded-lg text-white text-center transition-all duration-300 hover:scale-105 hover:shadow-xl',
                category.color
              )}>
                <div className="mb-3">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
