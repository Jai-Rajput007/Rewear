"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Item } from '@/components/ui/item-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';

const ProductDetailSkeleton = () => (
  <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-pulse">
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <div className="aspect-square w-full rounded-lg bg-muted overflow-hidden"></div>
        <div className="grid grid-cols-5 gap-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-square rounded bg-muted"></div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="h-8 w-3/4 bg-muted rounded"></div>
        <div className="h-6 w-1/4 bg-muted rounded"></div>
        <div className="h-20 w-full bg-muted rounded"></div>
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-20 bg-muted rounded-full"></div>
          <div className="h-6 w-24 bg-muted rounded-full"></div>
          <div className="h-6 w-16 bg-muted rounded-full"></div>
        </div>
        <div className="h-10 w-full bg-muted rounded-lg"></div>
      </div>
    </div>
  </div>
);

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [swapRequested, setSwapRequested] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!params.id) return;

    const fetchItem = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8080/api/items/${params.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch item details');
        }
        const data = await res.json();
        setItem(data);
        if (data.imageUrls && data.imageUrls.length > 0) {
          setActiveImageUrl(`http://localhost:8080/${data.imageUrls[0].replace(/\\/g, '/')}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [params.id]);

  const handleRequestSwap = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to request a swap.');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/swaps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: item?._id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to request swap');
      }

      toast.success('Swap request sent successfully!');
      setSwapRequested(true);
    } catch (error: any) {
      console.error('Swap request error:', error);
      toast.error(error.message || 'An error occurred while sending the request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  if (!item) {
    return <div className="text-center py-20 text-muted-foreground">Item not found.</div>;
  }

  const getFullImageUrl = (path: string) => `http://localhost:8080/${path.replace(/\\/g, '/')}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <Link href="/items-listing" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all items
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="aspect-square w-full relative overflow-hidden rounded-lg border bg-card">
              {activeImageUrl ? (
                <Image
                  src={activeImageUrl}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">No Image</div>
              )}
            </div>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {item.imageUrls.map((url, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded border-2 ${getFullImageUrl(url) === activeImageUrl ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setActiveImageUrl(getFullImageUrl(url))}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-sm">
                    <Image
                      src={getFullImageUrl(url)}
                      alt={`${item.title} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{item.title}</h1>
              <p className="text-2xl font-semibold text-primary mt-1">Swap Available</p>
            </div>
            <Separator />
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{item.category}</Badge>
              <Badge variant="secondary">{item.type}</Badge>
              <Badge variant="secondary">Size: {item.size}</Badge>
              <Badge variant="outline">Condition: {item.condition}</Badge>
            </div>
            {item.tags && item.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => <Badge key={tag} variant="default">{tag}</Badge>)}
                </div>
              </div>
            )}
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Listed by</h3>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${item.listedBy.name}`} />
                  <AvatarFallback>{item.listedBy.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{item.listedBy.name}</p>
                  <p className="text-xs text-muted-foreground">View Profile</p>
                </div>
              </div>
            </div>
            <Button size="lg" className="w-full">Request Swap</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
