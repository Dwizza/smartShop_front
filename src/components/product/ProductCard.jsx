import { ShoppingCart, Eye } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { addToCart } = useShop();

    return (
        <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
            {/* Image Area */}
            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                {/* Mock image if none provided, or use product.imageUrl */}
                <img
                    src={product.imageUrl || `https://placehold.co/400x500?text=${product.name}`}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                        onClick={() => addToCart(product)}
                        className="p-3 bg-white text-gray-900 rounded-full hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                        title="Add to Cart"
                    >
                        <ShoppingCart size={20} />
                    </button>
                    <Link
                        to={`/product/${product.id}`}
                        className="p-3 bg-white text-gray-900 rounded-full hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                        title="View Details"
                    >
                        <Eye size={20} />
                    </Link>
                </div>

                {/* Badges (e.g. New, Sale) */}
                {product.isNew && (
                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        NEW
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wider">{product.category || 'Collection'}</p>
                <h3 className="font-bold text-gray-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">
                    <Link to={`/product/${product.id}`}>
                        {product.name}
                    </Link>
                </h3>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${product.price?.toFixed(2)}</span>
                    {/* Optional: Rating stars */}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
