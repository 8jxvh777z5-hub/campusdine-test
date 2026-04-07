import { useAppStore } from "@/lib/store";
import { Package, Clock, ChefHat, CheckCircle, ShoppingBag } from "lucide-react";
import { useLocation } from "wouter";
import { CATEGORY_LABELS } from "@/lib/data";

const STATUS_CONFIG = {
  placed: {
    label: "Order Placed",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    icon: Package,
    step: 1,
  },
  preparing: {
    label: "Preparing",
    color: "text-orange-600",
    bg: "bg-orange-50 border-orange-200",
    icon: ChefHat,
    step: 2,
  },
  ready: {
    label: "Ready to Pick Up",
    color: "text-green-600",
    bg: "bg-green-50 border-green-200",
    icon: CheckCircle,
    step: 3,
  },
  delivered: {
    label: "Delivered",
    color: "text-gray-600",
    bg: "bg-gray-50 border-gray-200",
    icon: CheckCircle,
    step: 4,
  },
};

const PAYMENT_LABELS = {
  cod: "Cash on Delivery",
  upi: "UPI Payment",
  razorpay: "Online Payment",
};

export function OrdersPage() {
  const { currentUser, orders } = useAppStore();
  const [_, navigate] = useLocation();

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-muted rounded-full mb-4">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Login Required</h2>
        <p className="text-muted-foreground mb-6">
          Please login to view your orders
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const userOrders = orders
    .filter((o) => o.userId === currentUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (userOrders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-muted rounded-full mb-4">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">No Orders Yet</h2>
        <p className="text-muted-foreground mb-6">
          You haven't placed any orders yet. Browse our menu and order your first meal!
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {userOrders.length} order{userOrders.length !== 1 ? "s" : ""} placed
        </p>
      </div>

      <div className="space-y-4">
        {userOrders.map((order) => {
          const config = STATUS_CONFIG[order.status];
          const StatusIcon = config.icon;
          const date = new Date(order.createdAt);

          return (
            <div key={order.id} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              {/* Order header */}
              <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Order ID
                    </span>
                  </div>
                  <p className="font-bold text-primary text-base">{order.id}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {date.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    at{" "}
                    {date.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.color}`}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    {config.label}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="px-5 py-4 border-b border-border bg-muted/20">
                <div className="flex items-center gap-0">
                  {["placed", "preparing", "ready", "delivered"].map((s, idx) => {
                    const sc = STATUS_CONFIG[s as keyof typeof STATUS_CONFIG];
                    const isActive = sc.step <= config.step;
                    const isCurrent = s === order.status;
                    return (
                      <div key={s} className="flex items-center flex-1 last:flex-none">
                        <div className={`flex flex-col items-center gap-1`}>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                              isActive
                                ? isCurrent
                                  ? "border-primary bg-primary text-white"
                                  : "border-primary/40 bg-primary/10 text-primary"
                                : "border-border bg-muted text-muted-foreground"
                            }`}
                          >
                            {idx + 1}
                          </div>
                          <span className={`text-[10px] font-medium text-center leading-tight ${
                            isActive ? "text-foreground" : "text-muted-foreground"
                          }`}>
                            {sc.label}
                          </span>
                        </div>
                        {idx < 3 && (
                          <div
                            className={`flex-1 h-0.5 mx-1 mb-5 ${
                              sc.step < config.step ? "bg-primary" : "bg-border"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order items */}
              <div className="px-5 py-4">
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <span className="text-foreground">{item.name}</span>
                        {item.size && (
                          <span className="text-xs text-muted-foreground">({item.size})</span>
                        )}
                      </div>
                      <span className="text-muted-foreground">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-3 bg-muted/30 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm text-muted-foreground">
                  {PAYMENT_LABELS[order.paymentMethod]}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {order.items.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="font-bold text-primary">₹{order.total}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
