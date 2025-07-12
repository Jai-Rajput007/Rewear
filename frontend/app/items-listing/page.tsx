"use client";

import React, { useState, useEffect } from 'react';
import { Search, ListFilter } from 'lucide-react';
import { Item, ItemCard, ItemCardSkeleton } from '@/components/ui/item-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ItemListingPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:8080/api/items');
        if (!res.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await res.json();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <header className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Discover Items</h1>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for clothes, shoes, accessories..."
                className="w-full pl-10"
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <ListFilter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </header>

        <main>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => <ItemCardSkeleton key={i} />)}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500">{error}</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No items found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {items.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
