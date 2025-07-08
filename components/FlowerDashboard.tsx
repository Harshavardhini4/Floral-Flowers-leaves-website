import React, { useState, useMemo } from 'react';
import { flowers } from '../../data/flowers';
import { Flower, CartItem } from '../../types';
import FlowerCard from './FlowerCard';
import FilterSidebar from './FilterSidebar';
import Header from '../layout/Header';
import CartPage from '../cart/CartPage';
import WishlistPage from '../wishlist/WishlistPage';
import { Filter, Grid, List } from 'lucide-react';

type ViewMode = 'dashboard' | 'cart' | 'wishlist';

const FlowerDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [filters, setFilters] = useState({
    category: '',
    color: '',
    occasion: '',
    priceRange: [0, 15000] as [number, number],
    origin: '',
    sameDay: false
  });

  const filteredFlowers = useMemo(() => {
    return flowers.filter(flower => {
      const matchesSearch = searchQuery === '' || 
        flower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flower.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flower.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flower.occasion.some(occ => occ.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = filters.category === '' || flower.category === filters.category;
      const matchesColor = filters.color === '' || flower.color === filters.color;
      const matchesOccasion = filters.occasion === '' || flower.occasion.includes(filters.occasion);
      const matchesPrice = flower.price >= filters.priceRange[0] && flower.price <= filters.priceRange[1];
      const matchesOrigin = filters.origin === '' || flower.origin === filters.origin;
      const matchesSameDay = !filters.sameDay || flower.sameDay;

      return matchesSearch && matchesCategory && matchesColor && matchesOccasion && 
             matchesPrice && matchesOrigin && matchesSameDay;
    });
  }, [searchQuery, filters]);

  const wishlistItems = useMemo(() => {
    return flowers.filter(flower => wishlist.includes(flower.id));
  }, [wishlist]);

  const handleAddToCart = (flower: Flower) => {
    const existingItem = cart.find(item => item.id === flower.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === flower.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { 
        id: flower.id, 
        flower, 
        quantity: 1, 
        size: flower.sizes[0] 
      }]);
    }
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleToggleWishlist = (flowerId: string) => {
    if (wishlist.includes(flowerId)) {
      setWishlist(wishlist.filter(id => id !== flowerId));
    } else {
      setWishlist([...wishlist, flowerId]);
    }
  };

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (currentView === 'cart') {
    return (
      <CartPage
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onBackToShopping={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'wishlist') {
    return (
      <WishlistPage
        wishlistItems={wishlistItems}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBackToShopping={() => setCurrentView('dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={setSearchQuery} 
        cartItemCount={cartItemCount}
        wishlistCount={wishlist.length}
        onCartClick={() => setCurrentView('cart')}
        onWishlistClick={() => setCurrentView('wishlist')}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-80">
            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  Premium Flowers ({filteredFlowers.length})
                </h1>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-rose-500 text-white' : 'bg-white text-gray-600 border border-gray-300'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-rose-500 text-white' : 'bg-white text-gray-600 border border-gray-300'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Flowers Grid */}
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-4'
            }`}>
              {filteredFlowers.map((flower) => (
                <FlowerCard
                  key={flower.id}
                  flower={flower}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isInWishlist={wishlist.includes(flower.id)}
                />
              ))}
            </div>

            {filteredFlowers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No flowers found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      category: '',
                      color: '',
                      occasion: '',
                      priceRange: [0, 15000],
                      origin: '',
                      sameDay: false
                    });
                  }}
                  className="mt-4 px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowerDashboard;