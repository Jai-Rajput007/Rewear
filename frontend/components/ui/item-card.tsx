"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export interface Item {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: string;
  tags: string[];
  imageUrls: string[];
  listedBy: {
    _id: string;
    name:string;
  };
  createdAt: string;
}

interface ItemCardProps {
  item: Item;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  // Construct absolute URL for images from backend
  const imageUrl = item.imageUrls && item.imageUrls.length > 0 
    ? `http://localhost:8080/${item.imageUrls[0].replace(/\\/g, '/')}` 
    : "/placeholder.svg"; // A fallback image

  return (
    <Link href={`/item/${item._id}`} className="block group">
      <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="aspect-[4/5] relative">
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-base font-semibold truncate group-hover:text-primary">{item.title}</h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p className="capitalize">{item.category}</p>
            <Badge variant="outline">{item.size}</Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ItemCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="aspect-[4/5] bg-muted animate-pulse"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
        <div className="flex items-center justify-between">
          <div className="h-3 w-1/4 bg-muted rounded animate-pulse"></div>
          <div className="h-6 w-10 bg-muted rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
