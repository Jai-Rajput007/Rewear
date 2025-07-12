import { Heart, Star, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const products = [
  { 
    id: 1, 
    name: 'Vintage Denim Jacket',
    price: 45.99,
    condition: 'Excellent',
    category: 'Men',
    rating: 4.8,
    image: '/placeholder-jacket.jpg'
  },
  { 
    id: 2, 
    name: 'Floral Summer Dress',
    price: 32.50,
    condition: 'Like New',
    category: 'Women',
    rating: 4.9,
    image: '/placeholder-dress.jpg'
  },
  { 
    id: 3, 
    name: 'Leather Crossbody Bag',
    price: 58.75,
    condition: 'Good',
    category: 'Accessories',
    rating: 4.7,
    image: '/placeholder-bag.jpg'
  },
  { 
    id: 4, 
    name: 'Classic White Sneakers',
    price: 42.00,
    condition: 'Good',
    category: 'Footwear',
    rating: 4.6,
    image: '/placeholder-sneakers.jpg'
  },
];

export default function ProductListingsSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Listings</h2>
            <p className="text-gray-600 dark:text-gray-300">Discover unique pre-loved fashion finds</p>
          </div>
          <Button variant="outline" className="border-gray-300 dark:border-gray-600">
            View All Listings
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="relative aspect-[3/4] bg-gray-100 dark:bg-gray-700">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                  <span className="text-sm">Product Image</span>
                </div>
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                  <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    {product.condition} Condition
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{product.name}</h3>
                  <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500 text-xs font-medium px-2 py-0.5 rounded">
                    <Star className="w-3 h-3 mr-1 text-yellow-500 dark:text-yellow-400" />
                    {product.rating}
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                  <Button size="sm" className="text-sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
