"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ItemCard, ItemCardSkeleton } from '@/components/ui/item-card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface Item {
  _id: string;
  title: string;
  images: string[];
  category: string;
  size: string;
}

export default function ProductListingsSection() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/api/items?limit=4');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Latest Additions</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Check out the newest items from our community.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => <ItemCardSkeleton key={index} />)
            : items.map(item => <ItemCard key={item._id} item={item} />)}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/items-listing">
              View All Items <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}