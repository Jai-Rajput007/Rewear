"use client";

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from './ui/button';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-foreground flex items-center gap-2">
          <span className="text-teal-500">Re</span>
          <span>Wear</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/items-listing" className="hover:text-teal-500 transition-colors">Browse</Link>
          <Link href="/#categories" className="hover:text-teal-500 transition-colors">Categories</Link>
          <Link href="/#how-it-works" className="hover:text-teal-500 transition-colors">How it Works</Link>
          {isAuthenticated && (
            <Link href="/add-item" className="hover:text-teal-500 transition-colors">List an Item</Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Button asChild variant="outline">
                <Link href="/add-item">List an Item</Link>
              </Button>
              <div className="relative group">
                <Link href="/user-dashboard">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.name}`} alt={user?.name} />
                    <AvatarFallback>{user?.name?.[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="absolute top-full right-0 mt-2 w-48 bg-background border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                  <div className="p-2">
                    <p className="font-semibold text-sm px-2 py-1">{user?.name}</p>
                    <p className="text-xs text-muted-foreground px-2 py-1 mb-2">{user?.email}</p>
                    <Link href="/user-dashboard" className="block w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded-sm">Dashboard</Link>
                    <Button onClick={logout} variant="ghost" className="w-full justify-start px-2 py-1.5 text-sm">Logout</Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
