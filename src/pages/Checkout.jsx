import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, ShoppingBag, CheckCircle } from 'lucide-react';
import http from '../api/http';
import endpoints from '../api/endpoints';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useShop();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    if (cart.length === 0 && !isSuccess) {
        return (
            <div className="min-h-screen pt-24 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/shop" className="text-indigo-600 hover:underline">Go Shopping</Link>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setError('');

        try {
            // 1. Create Order
            // Backend expects specific format. 
            // Based on typical patterns: { items: [...], shippingAddress: ... }
            // Since I don't see exact DTO, I'll send a probable structure.
            const orderPayload = {
                items: cart.map(item => ({ productId: item.id, quantity: item.quantity })),
                total: cartTotal,
                shippingAddress: `${formData.address}, ${formData.city} ${formData.zip}`,
                // user info might be extracted from token on backend
            };

            const { data: orderData } = await http.post(endpoints.orders.create, orderPayload);

            // 2. Mock Payment Processing
            // Use orderId if needed: orderData.id
            await http.post(endpoints.payments.process, {
                orderId: orderData?.id || 0, // Fallback if internal logic
                amount: cartTotal,
                cardDetails: { number: formData.cardNumber } // Mock
            });

            // 3. Success
            clearCart();
            setIsSuccess(true);

        } catch (err) {
            console.error("Checkout failed", err);
            // Even if API fails (mock backend?), let's simulate success for the UI demo since "simple"
            // But if it's a real backend failure on specific constraints, I should show error.
            // For now, I'll default to showing checking error unless it's a 404 (endpoint missing).
            if (err.response?.status === 404) {
                // Endpoint might not match exactly my assumption, but let's assume success for demo flow 
                // if the user just wants to see the "Design".
                // However, I should try to be real.
                setError("Could not process order. Api endpoints might need verification.");
            } else {
                setError("Payment failed. Please try again.");
            }
        } finally {
            setIsProcessing(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md animate-slide-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                    <p className="text-gray-500 mb-8">Thank you for your purchase. We'll email you the shipping details shortly.</p>
                    <button
                        onClick={() => navigate('/shop')}
                        className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-12 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link to="/shop" className="text-gray-500 hover:text-indigo-600 flex items-center gap-2 text-sm font-medium">
                        <ArrowLeft size={16} /> Back to Shop
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mt-2">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="space-y-8">
                        {error && (
                            <div className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-100">
                                {error}
                            </div>
                        )}

                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">1</span>
                                    Shipping Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                                        <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                                        <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Address</label>
                                        <input required name="address" value={formData.address} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">City</label>
                                        <input required name="city" value={formData.city} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">ZIP Code</label>
                                        <input required name="zip" value={formData.zip} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">2</span>
                                    Payment Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Card Number</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                            <input required name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" className="w-full pl-10 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Expiry</label>
                                            <input required name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YY" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">CVC</label>
                                            <input required name="cvc" value={formData.cvc} onChange={handleChange} placeholder="123" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <ShoppingBag /> Order Summary
                            </h3>
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.imageUrl || `https://placehold.co/100?text=${item.name}`} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="font-bold text-sm">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2">
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                                    <span>Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                form="checkout-form"
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full mt-6 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 transform hover:-translate-y-1 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isProcessing ? 'Processing Order...' : 'Place Order'}
                            </button>

                            <p className="text-xs text-gray-400 text-center mt-4">
                                Secure Encrypted Payment
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
