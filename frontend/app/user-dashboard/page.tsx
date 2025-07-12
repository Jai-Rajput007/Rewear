"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { ItemCard, ItemCardSkeleton } from '@/components/ui/item-card';
import MySwaps from '@/components/MySwaps';

interface Item {
  _id: string;
  title: string;
  imageUrls: string[];
  category: string;
  size: string;
}

const UserDashboardSkeleton = () => (
  <div className="min-h-screen bg-background text-foreground p-4 sm:p-6">
    <div className="max-w-7xl mx-auto bg-card rounded-2xl border p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <Button variant="outline" disabled>Edit Profile</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center md:w-48 flex-shrink-0">
          <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mt-4 animate-pulse"></div>
          <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mt-2 animate-pulse"></div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border bg-card">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Items Listed</h3>
              <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="p-4 rounded-xl border bg-card">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Items Purchased</h3>
              <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="p-4 rounded-xl border bg-card">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Bio</h3>
            <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2"></div>
            <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2"></div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">My Listings</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <ItemCardSkeleton key={`listing-${i}`} />)}
        </div>
      </div>
    </div>
  </div>
);

export default function UserDashboard() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [myItems, setMyItems] = useState<Item[]>([]);
  const [isFetchingItems, setIsFetchingItems] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    const fetchMyItems = async () => {
      if (isAuthenticated) {
        setIsFetchingItems(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setIsFetchingItems(false);
          return;
        }

        try {
          const response = await fetch('http://localhost:8080/api/items/my-items', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user items');
          }

          const data = await response.json();
          setMyItems(data.items || []);
        } catch (error) {
          console.error('Error fetching my items:', error);
          setMyItems([]);
        } finally {
          setIsFetchingItems(false);
        }
      }
    };

    if (isAuthenticated) {
      fetchMyItems();
    }
  }, [isAuthenticated]);

  if (isLoading || !user) {
    return <UserDashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6">
      <div className="max-w-7xl mx-auto bg-card rounded-2xl border p-6 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <Button onClick={() => alert('Edit profile functionality to be implemented!')} variant="outline">Edit Profile</Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center md:w-48 flex-shrink-0">
            <Avatar className="w-32 h-32 text-4xl border-2 border-primary">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold mt-4 text-center">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <Button onClick={logout} variant="ghost" className="mt-2 text-red-500 hover:text-red-600">Logout</Button>
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border bg-card">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Items Listed</h3>
                <p className="text-3xl font-bold">{isFetchingItems ? '...' : myItems.length}</p>
              </div>
              <div className="p-4 rounded-xl border bg-card">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Points Balance</h3>
                <p className="text-3xl font-bold">{user.points || 0}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl border bg-card h-full">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Bio</h3>
              <p className="text-sm text-muted-foreground italic">{user.bio || "No bio yet. Click 'Edit Profile' to add one."}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">My Listings</h2>
          {isFetchingItems ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => <ItemCardSkeleton key={i} />)}
            </div>
          ) : myItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {myItems.map(item => <ItemCard key={item._id} item={item} />)}
            </div>
          ) : (
            <div className="p-16 text-center border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">You haven't listed any items yet.</p>
              <Button asChild className="mt-4">
                <Link href="/add-item">List an Item</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <MySwaps />
        </div>
      </div>
    </div>
  );
}
