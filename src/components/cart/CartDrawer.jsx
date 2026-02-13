import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useShop();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[60]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col">
                {/* Header */}
                <div className="p-5 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag className="text-indigo-600" />
                        Your Cart
                        <span className="text-sm font-normal text-gray-500 ml-2">({cart.length} items)</span>
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                            <ShoppingBag size={64} className="mb-4 opacity-20" />
                            <p className="text-lg font-medium">Your cart is empty</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:border-indigo-100 transition-colors">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={item.imageUrl || `https://placehold.co/100?text=${item.name}`}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                                        <p className="text-sm text-gray-500">${item.price?.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="p-1 hover:text-indigo-600 disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="px-2 text-sm font-medium w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="p-1 hover:text-indigo-600"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                            title="Remove"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link
                            to="/checkout"
                            onClick={() => setIsCartOpen(false)}
                            className="block w-full bg-gray-900 text-white text-center py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg transform hover:scale-[1.02]"
                        >
                            Checkout Now
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
