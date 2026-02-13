import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, Package } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount, setIsCartOpen } = useShop();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-xl">
                            S
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                            SmartShop
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Home</Link>
                        <Link to="/shop" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Shop</Link>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                        {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
                                    </div>
                                </div>
                                <button
                                    onClick={logout}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-indigo-600 font-medium px-4 py-2"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden glass border-t border-gray-100 absolute w-full">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link to="/" className="block px-3 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg">Home</Link>
                        <Link to="/shop" className="block px-3 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg">Shop</Link>
                        <div className="border-t border-gray-100 my-2 pt-2">
                            {user ? (
                                <button onClick={logout} className="w-full text-left px-3 py-2 text-red-500 font-medium hover:bg-red-50 rounded-lg flex items-center gap-2">
                                    <LogOut size={18} /> Logout
                                </button>
                            ) : (
                                <>
                                    <Link to="/login" className="block px-3 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg">Login</Link>
                                    <Link to="/register" className="block px-3 py-2 text-indigo-600 font-bold hover:bg-indigo-50 rounded-lg">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export const Footer = () => (
    <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 p-1">
                        SmartShop
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">Premium shopping experience for everyone.</p>
                </div>
                <div className="flex gap-6 text-gray-400">
                    <a href="#" className="hover:text-indigo-600 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
                    <a href="#" className="hover:text-indigo-600 transition-colors">LinkedIn</a>
                </div>
            </div>
            <div className="mt-8 text-center text-gray-400 text-sm">
                © {new Date().getFullYear()} SmartShop Global. All rights reserved.
            </div>
        </div>
    </footer>
);
