"use client";

import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  const router = useRouter();

  const handleAvatarClick = () => {
    router.push('/user-dashboard');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-sm">
      {/* Top Row */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-900 dark:text-white">Rewear</div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={handleAvatarClick}
            className="rounded-full hover:opacity-80 transition-opacity"
            aria-label="Go to user dashboard"
          >
            <Avatar>
              <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                U
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
      
      {/* Bottom Row - Search Bar */}
      <div className="bg-gray-50 dark:bg-gray-800 py-3 border-t border-gray-100 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for items..."
              className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-gray-600"
            />
            <FiSearch className="absolute right-3 top-2.5 text-gray-400 text-xl" />
          </div>
        </div>
      </div>
    </header>
  );
}
