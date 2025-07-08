import React from 'react';
import { Filter, X } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    category: string;
    color: string;
    occasion: string;
    priceRange: [number, number];
    origin: string;
    sameDay: boolean;
  };
  onFilterChange: (filterType: string, value: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}) => {
  const categories = [
    'roses', 'marigolds', 'jasmine', 'hibiscus', 'lotus', 'sunflowers', 
    'tuberose', 'chrysanthemums', 'daisies', 'bougainvillea', 'orchids', 
    'gerberas', 'lilies', 'gladiolus', 'tulips', 'hyacinths', 'daffodils', 
    'crocuses', 'amaryllis', 'freesias', 'irises', 'peonies', 'ranunculus', 
    'calla-lilies', 'delphiniums', 'carnations', 'proteas', 'lavender',
    'crossandra', 'crown-flower', 'butterfly-pea', 'magnolia', 'leaves', 'tulasi',
    'ashwagandha', 'boswellia', 'brahma-kamal', 'cumin', 'maruvam', 'betel',
    'bilva', 'cassia', 'pinwheel', 'crepe-jasmine', 'neelakurinji', 'kadamba',
    'shami', 'cannonball', 'krishna-banthi', 'hydrangeas', 'oleander'
  ];
  
  const colors = [
    'red', 'pink', 'white', 'yellow', 'orange', 'purple', 'blue', 
    'mixed', 'peach', 'lavender', 'green', 'cream', 'black'
  ];
  
  const occasions = [
    'anniversary', 'valentine', 'romantic', 'birthday', 'appreciation', 
    'mother-day', 'wedding', 'sympathy', 'new-beginning', 'festival', 
    'diwali', 'decoration', 'religious', 'puja', 'hair-decoration', 
    'meditation', 'spiritual', 'get-well', 'congratulations', 'spring', 
    'love', 'classic', 'cheerfulness', 'friendship', 'affection', 
    'caring', 'royalty', 'elegance', 'rebirth', 'fragrance', 'constancy', 
    'playfulness', 'sport', 'hope', 'delicate', 'first-love', 'dramatic', 
    'pride', 'determination', 'beauty', 'innocence', 'wisdom', 'valor', 
    'faith', 'honor', 'wealth', 'romance', 'charm', 'attractiveness', 
    'radiance', 'magnificence', 'big-hearted', 'fun', 'lightness', 
    'luxury', 'premium', 'special-occasions', 'fascination', 'distinction', 
    'sustainable', 'eco-friendly', 'exotic', 'unique', 'artistic', 
    'relaxation', 'provence', 'cultural', 'garland-making', 'medicinal', 
    'ayurveda', 'pest-control', 'wellness', 'beauty', 'perfumery', 
    'aromatherapy', 'traditional', 'auspicious', 'stress-relief', 
    'respiratory-health', 'digestive-health', 'oral-hygiene', 'lord-shiva',
    'bathukamma', 'fever-treatment', 'skin-care', 'sacred-ceremonies',
    'therapeutic', 'health-benefits', 'natural-fragrance', 'ecosystem',
    'rare-bloom', 'ornamental', 'passion', 'grace', 'arrangements',
    'vibrant', 'decorative', 'joy', 'happiness', 'herbal-tea', 'natural-dyes',
    'sleep-aid', 'anxiety-relief', 'ceremonies', 'garden', 'landscaping',
    'enthusiasm', 'energy', 'zest-for-life', 'purity', 'innocence', 
    'forgiveness', 'new-beginnings', 'aesthetic', 'dramatic', 'culinary',
    'wrapping', 'serving', 'traditional-medicine', 'traditional-treatment'
  ];
  
  const origins = [
    'India', 'Southern India', 'Netherlands', 'Ecuador', 'Colombia', 'Kenya', 
    'Australia', 'France', 'Thailand', 'California', 'Local', 'Burma', 
    'Southeast Asia', 'South Asia', 'Myanmar', 'Eastern Mediterranean',
    'Mediterranean', 'Middle East', 'Western Ghats', 'Karnataka', 'South America',
    'East Asia', 'Hawaiian Islands', 'Tropical Asia', 'Afghanistan', 'North Africa',
    'Central Asia', 'Kerala', 'Mexico', 'Southwest Asia', 'Japan'
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:transform-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={filters.category === category}
                      onChange={(e) => onFilterChange('category', e.target.value)}
                      className="mr-2 text-rose-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{category.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
              <div className="space-y-2">
                {colors.map((color) => (
                  <label key={color} className="flex items-center">
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      checked={filters.color === color}
                      onChange={(e) => onFilterChange('color', e.target.value)}
                      className="mr-2 text-rose-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Origin Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Origin</h3>
              <div className="space-y-2">
                {origins.map((origin) => (
                  <label key={origin} className="flex items-center">
                    <input
                      type="radio"
                      name="origin"
                      value={origin}
                      checked={filters.origin === origin}
                      onChange={(e) => onFilterChange('origin', e.target.value)}
                      className="mr-2 text-rose-500"
                    />
                    <span className="text-sm text-gray-700">{origin}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Occasion</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {occasions.map((occasion) => (
                  <label key={occasion} className="flex items-center">
                    <input
                      type="radio"
                      name="occasion"
                      value={occasion}
                      checked={filters.occasion === occasion}
                      onChange={(e) => onFilterChange('occasion', e.target.value)}
                      className="mr-2 text-rose-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{occasion.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="15000"
                  step="500"
                  value={filters.priceRange[1]}
                  onChange={(e) => onFilterChange('priceRange', [0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹0</span>
                  <span>₹{filters.priceRange[1].toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Same Day Delivery */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.sameDay}
                  onChange={(e) => onFilterChange('sameDay', e.target.checked)}
                  className="mr-2 text-rose-500"
                />
                <span className="text-sm text-gray-700">Same Day Delivery</span>
              </label>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                onFilterChange('category', '');
                onFilterChange('color', '');
                onFilterChange('occasion', '');
                onFilterChange('priceRange', [0, 15000]);
                onFilterChange('origin', '');
                onFilterChange('sameDay', false);
              }}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;