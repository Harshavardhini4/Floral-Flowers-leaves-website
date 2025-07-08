import React from 'react';
import { Flower } from '../../types';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import FlowerCard from '../flowers/FlowerCard';

interface WishlistPageProps {
  wishlistItems: Flower[];
  onToggleWishlist: (flowerId: string) => void;
  onAddToCart: (flower: Flower) => void;
  onBackToShopping: () => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({
  wishlistItems,
  onToggleWishlist,
  onAddToCart,
  onBackToShopping,
}) => {
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save your favorite flowers to your wishlist and shop them later.</p>
            <button
              onClick={onBackToShopping}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-200"
            >
              Discover Flowers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToShopping}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </button>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-500" />
              My Wishlist ({wishlistItems.length} items)
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((flower) => (
            <FlowerCard
              key={flower.id}
              flower={flower}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={true}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onBackToShopping}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;