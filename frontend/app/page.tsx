"use client";

import dynamic from 'next/dynamic';

// Import components with dynamic imports for better performance
const Header = dynamic(() => import('@/components/Header'), { ssr: true });
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: true });
const CategoriesSection = dynamic(() => import('@/components/CategoriesSection'), { ssr: true });
const ProductListingsSection = dynamic(() => import('@/components/ProductListingsSection'), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <div className="pt-28 pb-16"> {/* Add padding to account for fixed header */}
        <HeroSection />
        <div className="container mx-auto px-4 py-12">
          <CategoriesSection />
          <ProductListingsSection />
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-gray-800 py-8 px-4 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto text-center">
            <p className="text-gray-600 dark:text-gray-300">© {new Date().getFullYear()} Rewear. All rights reserved.</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Sustainable fashion through clothing exchange</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
