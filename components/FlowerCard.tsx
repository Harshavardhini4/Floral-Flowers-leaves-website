import React from 'react';
import { Flower } from '../../types';
import { Star, Heart, Truck, Clock } from 'lucide-react';

interface FlowerCardProps {
  flower: Flower;
  onAddToCart: (flower: Flower) => void;
  onToggleWishlist: (flowerId: string) => void;
  isInWishlist: boolean;
}

const FlowerCard: React.FC<FlowerCardProps> = ({ 
  flower, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist 
}) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={flower.image}
          alt={flower.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => onToggleWishlist(flower.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isInWishlist 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-rose-500 hover:text-white'
            }`}
          >
            <Heart className="w-5 h-5" />
          </button>
          {flower.sameDay && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Truck className="w-3 h-3" />
              Same Day
            </div>
          )}
        </div>
        {!flower.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{flower.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{flower.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{flower.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{flower.price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-gray-500 ml-1">from {flower.origin}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {Math.random() > 0.66 ? '5-6 days' : Math.random() > 0.33 ? '3-4 days' : '2-3 days'}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2 mb-4">
          {flower.occasion.slice(0, 2).map((occasion) => (
            <span
              key={occasion}
              className="px-2 py-1 bg-rose-100 text-rose-700 text-xs rounded-full"
            >
              {occasion}
            </span>
          ))}
        </div>
        
        <button
          onClick={() => onAddToCart(flower)}
          disabled={!flower.inStock}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200"
        >
          {flower.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default FlowerCard;