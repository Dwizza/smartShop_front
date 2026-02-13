import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';

const Home = () => {
    // Mock data for display until real API is hooked up completely
    // In reality, we might fetch "featured" products from API
    const featuredProducts = [
        { id: 101, name: 'Premium Leather Jacket', price: 199.99, category: 'Men', imageUrl: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', isNew: true },
        { id: 102, name: 'Wireless Headphones', price: 149.00, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 103, name: 'Smart Watch Series 7', price: 399.00, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 104, name: 'Minimalist Sneakers', price: 89.50, category: 'Footwear', imageUrl: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', isNew: true },
    ];

    return (
        <div className="pb-20">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center bg-gray-900 overflow-hidden">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/40 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Content */}
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl animate-slide-up">
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-sm font-bold tracking-wider mb-6">
                            NEW COLLECTION 2026
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Future</span> of Shopping.
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Explore our curated collection of premium products designed to elevate your lifestyle. Uncompromised quality, stunning design.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to="/shop"
                                className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                            >
                                Shop Now <ArrowRight size={20} />
                            </Link>
                            <Link
                                to="/register"
                                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
                            >
                                Join Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Now</h2>
                            <p className="text-gray-500">Handpicked favorites just for you.</p>
                        </div>
                        <Link to="/shop" className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1 group">
                            View All <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-12 border-t border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-4">
                                <Star />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Premium Quality</h3>
                            <p className="text-gray-500 text-sm">We ensure every product meets our high standards.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-4">
                                {/* <ShoppingBag /> */}
                            </div>
                            <h3 className="text-lg font-bold mb-2">Secure Shipping</h3>
                            <p className="text-gray-500 text-sm">Fast and fully tracked delivery to your door.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-4">
                                <ArrowRight />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Easy Returns</h3>
                            <p className="text-gray-500 text-sm">30-day return policy for your peace of mind.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
