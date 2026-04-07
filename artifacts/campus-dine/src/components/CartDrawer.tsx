import { useState } from "react";
import { X, Minus, Plus, ShoppingCart, Trash2, CreditCard, Smartphone } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useLocation } from "wouter";

interface CartDrawerProps {
  onClose: () => void;
  onAuthRequired: () => void;
}

export function CartDrawer({ onClose, onAuthRequired }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart, getTotal, placeOrder, currentUser } = useAppStore();
  const [step, setStep] = useState<"cart" | "payment" | "success">("cart");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi" | "razorpay">("cod");
  const [upiId, setUpiId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [_, navigate] = useLocation();

  const total = getTotal();

  const handleCheckout = () => {
    if (!currentUser) {
      onClose();
      onAuthRequired();
      return;
    }
    if (items.length === 0) return;
    setStep("payment");
  };

  const handlePayment = () => {
    if (paymentMethod === "upi" && !upiId) {
      return;
    }
    if (!currentUser) return;
    const order = placeOrder(currentUser.id, items, paymentMethod);
    setOrderId(order.id);
    clearCart();
    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-md bg-white flex flex-col h-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              {step === "cart" ? "My Cart" : step === "payment" ? "Payment" : "Order Placed!"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart step */}
        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-foreground">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground mt-1">Browse the menu and add some delicious items!</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {items.map((item) => {
                    const key = item.menuItemId + (item.size || "");
                    return (
                      <div
                        key={key}
                        className="flex items-start gap-3 bg-muted/30 rounded-xl p-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                          {item.size && (
                            <p className="text-xs text-muted-foreground">{item.size}</p>
                          )}
                          <p className="text-sm font-semibold text-primary mt-0.5">
                            ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.menuItemId, item.quantity - 1, item.size)
                            }
                            className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.menuItemId, item.quantity + 1, item.size)
                            }
                            className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.menuItemId, item.size)}
                            className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center hover:bg-red-100 transition-colors ml-1"
                          >
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    {items.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-sm text-destructive hover:underline"
                  >
                    Clear cart
                  </button>
                </div>
                <div className="bg-muted/40 rounded-xl p-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-base border-t border-border pt-2 mt-2">
                    <span>Total</span>
                    <span className="text-primary">₹{total}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {/* Payment step */}
        {step === "payment" && (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div className="bg-muted/40 rounded-xl p-4">
                <p className="text-sm font-medium text-muted-foreground mb-1">Order Total</p>
                <p className="text-2xl font-bold text-primary">₹{total}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {items.reduce((s, i) => s + i.quantity, 0)} items
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Choose Payment Method</p>
                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      paymentMethod === "cod"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-primary"
                    />
                    <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center text-lg">
                      💵
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Cash on Delivery</p>
                      <p className="text-xs text-muted-foreground">Pay when you pick up your order</p>
                    </div>
                  </label>

                  {/* UPI */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      paymentMethod === "upi"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="accent-primary"
                    />
                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">UPI Payment</p>
                      <p className="text-xs text-muted-foreground">Pay via UPI (GPay, PhonePe, Paytm)</p>
                    </div>
                  </label>

                  {paymentMethod === "upi" && (
                    <input
                      type="text"
                      placeholder="Enter UPI ID (e.g. name@upi)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-3 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  )}

                  {/* Razorpay */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      paymentMethod === "razorpay"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                      className="accent-primary"
                    />
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Online Payment</p>
                      <p className="text-xs text-muted-foreground">Credit/Debit card via Razorpay</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t border-border p-5 flex gap-3">
              <button
                onClick={() => setStep("cart")}
                className="flex-1 py-3 border border-border rounded-xl font-medium text-sm hover:bg-muted transition-colors"
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                disabled={paymentMethod === "upi" && !upiId}
                className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Place Order
              </button>
            </div>
          </>
        )}

        {/* Success step */}
        {step === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-5">
              <span className="text-5xl">🎉</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Order Placed!</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Your food is being prepared
            </p>
            <div className="bg-muted/40 rounded-xl px-6 py-4 mb-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order ID</p>
              <p className="font-bold text-primary text-lg">{orderId}</p>
            </div>
            <div className="space-y-2 w-full">
              <button
                onClick={() => {
                  onClose();
                  navigate("/orders");
                }}
                className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                Track My Order
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 border border-border rounded-xl font-medium hover:bg-muted transition-colors"
              >
                Continue Ordering
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
