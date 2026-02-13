import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import http from '../api/http';
import endpoints from '../api/endpoints';
import { ShoppingCart, ArrowLeft, Star, Truck, ShieldCheck, Heart } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useShop();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // Try fetching from API
                const { data } = await http.get(endpoints.products.getById(id));
                setProduct(data);
            } catch (err) {
                console.error("Failed to fetch product details", err);
                // Fallback: This might be because we don't have a real backend responding yet
                // Logic to fallback to local dummy data could be added here if needed for demo
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Link to="/shop" className="text-indigo-600 hover:underline flex items-center gap-2">
                <ArrowLeft size={16} /> Back to Shop
            </Link>
        </div>
    );

    return (
        <div className="pt-24 pb-12 min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center text-sm text-gray-500 mb-8">
                    <Link to="/" className="hover:text-indigo-600">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/shop" className="hover:text-indigo-600">Shop</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                            <img
                                src={product.imageUrl || `https://placehold.co/600x800?text=${product.name}`}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div>
                        <div className="mb-2">
                            <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
                                {product.category || 'New Arrival'}
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-gray-900">${product.price?.toFixed(2)}</span>
                            <div className="flex items-center gap-1 text-yellow-400">
                                <Star fill="currentColor" size={18} />
                                <Star fill="currentColor" size={18} />
                                <Star fill="currentColor" size={18} />
                                <Star fill="currentColor" size={18} />
                                <Star fill="currentColor" size={18} />
                                <span className="text-gray-400 text-sm ml-2">(Customer Reviews)</span>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            {product.description || "Experience the ultimate quality with this premium product. Designed for comfort and style, it fits perfectly into your modern lifestyle."}
                        </p>

                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                            <div className="flex items-center border border-gray-200 rounded-xl">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                                >-</button>
                                <span className="w-12 text-center font-bold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                                >+</button>
                            </div>
                            <button
                                onClick={() => addToCart(product, quantity)}
                                className="flex-1 bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-[1.02] shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={20} /> Add to Cart
                            </button>
                            <button className="p-3 border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors">
                                <Heart size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <Truck className="text-indigo-600" />
                                <div>
                                    <h4 className="font-bold text-sm">Free Delivery</h4>
                                    <p className="text-xs text-gray-500">On orders over $50</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <ShieldCheck className="text-indigo-600" />
                                <div>
                                    <h4 className="font-bold text-sm">2 Year Warranty</h4>
                                    <p className="text-xs text-gray-500">Full protection</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
