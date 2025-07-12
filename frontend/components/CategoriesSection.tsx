import { Shirt, Shirt as ShirtDark, Shirt as ShirtLight, Watch, Footprints as Shoe, Sparkles } from 'lucide-react';

const categories = [
  { 
    id: 1, 
    name: 'Men', 
    description: 'Trendy and comfortable men\'s fashion',
    icon: <Shirt className="w-8 h-8 mb-2" />,
    bgColor: 'from-blue-500 to-blue-600',
    darkBgColor: 'from-blue-600 to-blue-700'
  },
  { 
    id: 2, 
    name: 'Women', 
    description: 'Elegant and stylish women\'s wear',
    icon: <ShirtDark className="w-8 h-8 mb-2" />,
    bgColor: 'from-pink-500 to-pink-600',
    darkBgColor: 'from-pink-600 to-pink-700'
  },
  { 
    id: 3, 
    name: 'Kids', 
    description: 'Cute and comfortable kids\' clothing',
    icon: <ShirtLight className="w-8 h-8 mb-2" />,
    bgColor: 'from-green-500 to-green-600',
    darkBgColor: 'from-green-600 to-green-700'
  },
  { 
    id: 4, 
    name: 'Accessories', 
    description: 'Complete your look with our accessories',
    icon: <Watch className="w-8 h-8 mb-2" />,
    bgColor: 'from-purple-500 to-purple-600',
    darkBgColor: 'from-purple-600 to-purple-700'
  },
  { 
    id: 5, 
    name: 'Footwear', 
    description: 'Step out in style',
    icon: <Shoe className="w-8 h-8 mb-2" />,
    bgColor: 'from-yellow-500 to-yellow-600',
    darkBgColor: 'from-yellow-600 to-yellow-700'
  },
  { 
    id: 6, 
    name: 'Vintage', 
    description: 'Retro styles making a comeback',
    icon: <Sparkles className="w-8 h-8 mb-2" />,
    bgColor: 'from-amber-500 to-amber-600',
    darkBgColor: 'from-amber-600 to-amber-700'
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Shop by Category</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our wide range of sustainable fashion categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            // Create dynamic class names based on the current theme
            const cardClasses = [
              'group',
              'relative',
              'overflow-hidden',
              'rounded-2xl',
              'bg-gradient-to-br',
              category.bgColor,
              `dark:${category.darkBgColor}`,
              'p-6',
              'text-white',
              'transition-all',
              'duration-300',
              'hover:shadow-lg',
              'hover:-translate-y-1'
            ].join(' ');
            
            return (
              <div 
                key={category.id}
                className={cardClasses}
              >
              <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/90 text-sm">{category.description}</p>
                <button className="mt-4 text-sm font-medium inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop now
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
