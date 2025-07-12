"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Particles } from "@/components/ui/particles";


export default function UserDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userListings, setUserListings] = useState([]);
  const [userSwaps, setUserSwaps] = useState([]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setUserListings([
        { id: 1, title: 'Gaming Laptop', image: '/laptop.jpg' },
        { id: 2, title: 'Smartphone', image: '/phone.jpg' },
        { id: 3, title: 'Tablet', image: '/tablet.jpg' },
      ]);
      setUserSwaps([
        { id: 1, title: 'Camera Swap', status: 'pending', with: 'John Doe' },
        { id: 2, title: 'Watch Swap', status: 'completed', with: 'Jane Smith' },
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background">
      <Particles className="absolute inset-0 -z-10" quantity={100} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/avatar.jpg" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Welcome back, User!</h1>
            <p className="text-muted-foreground">Manage your listings and swaps</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Your Active Listings</h2>
          <Separator className="mb-4" />
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <Carousel className="w-full">
              <CarouselContent>
                {userListings.map((listing) => (
                  <CarouselItem key={listing.id} className="md:basis-1/3">
                    <Card>
                      <CardHeader>
                        <CardTitle>{listing.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="aspect-square relative">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="absolute inset-0 h-full w-full object-cover rounded-md"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Recent Swaps</h2>
          <Separator className="mb-4" />
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-[100px] w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4">
              {userSwaps.map((swap) => (
                <Card key={swap.id}>
                  <CardHeader>
                    <CardTitle>{swap.title}</CardTitle>
                    <CardDescription>
                      With {swap.with} • Status: {swap.status}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button size="lg" className="min-w-[200px]">
            Create New Listing
          </Button>
        </div>
      </main>
    </div>
  );
}
